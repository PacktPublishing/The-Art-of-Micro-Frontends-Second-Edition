const appContentContainer = document.querySelector("#app-content");
const registry = {};

feather.replace();

function makeId(name, componentName) {
  return `${name}/${componentName}`;
}

function bootstrapComponent(info, user) {
  return info.wait.then(async () => {
    user.state = "bootstrapping";

    if (!info.bootstrapped) {
      const { bootstrap } = info.lifecycle;

      if (typeof bootstrap === "function") {
        await bootstrap();
      }

      info.bootstrapped = true;
    }

    user.state = "bootstrapped";
  });
}

function mountComponent(info, user) {
  return info.wait.then(async () => {
    const { mount } = info.lifecycle;
    user.state = "mounted";

    if (typeof mount === "function") {
      user.data = await mount(user.target, user.props);
      // we always want to replace feather icons implicitly
      feather.replace();
    }

    user.state = "mounted";
  });
}

function unmountComponent(info, user) {
  return info.wait.then(async () => {
    const { unmount } = info.lifecycle;
    user.state = "unmounting";

    if (typeof unmount === "function") {
      await unmount(user.target, user.data);
    }

    user.state = "unmounted";
  });
}

function navigateTo(path) {
  history.pushState({}, undefined, path);
  Array.prototype.forEach.call(
    document.querySelectorAll("nav .nav-link"),
    (item) => {
      if (item.getAttribute("href") === path) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  );
}

function followLink(e) {
  if (e.target instanceof HTMLAnchorElement) {
    const path = e.target.getAttribute("href");

    if (path.startsWith("/")) {
      e.preventDefault();
      navigateTo(path);
      urlChanged();
    }
  }
}

function urlChanged() {
  window.dispatchEvent(new CustomEvent("spa:url-changed"));
}

function checkHandler(name, componentName, handler) {
  const shouldBeActive = handler(location);
  const id = makeId(name, componentName);
  const currentContainer = appContentContainer.querySelector(
    `:scope > *[data-id="${id}"]`
  );

  if (shouldBeActive && !currentContainer) {
    const target = appContentContainer.appendChild(
      document.createElement("div")
    );
    target.setAttribute("data-id", id);
    window.renderComponent(name, componentName, target);
  } else if (!shouldBeActive && currentContainer) {
    window.destroyComponent(name, componentName, currentContainer);
    appContentContainer.removeChild(currentContainer);
    appContentContainer.removeAttribute("data-id");
  }
}

window.registerComponent = (name, componentName, lifecycle) => {
  const id = makeId(name, componentName);
  registry[id] = {
    id,
    lifecycle,
    wait: Promise.resolve(),
    bootstrapped: false,
    used: [],
  };
};

window.destroyComponent = (name, componentName, target) => {
  const id = makeId(name, componentName);
  const info = registry[id];
  const user = info && info.used.filter((u) => u.target === target).pop();

  if (user) {
    info.wait = unmountComponent(info, user).then(() => {
      const index = info.used.indexOf(user);
      info.used.splice(index, 1);
    });
  }
};

window.renderComponent = (name, componentName, target, props = {}) => {
  const id = makeId(name, componentName);
  const info = registry[id];

  if (info !== undefined) {
    const user = {
      target,
      props,
      data: undefined,
      state: "init",
    };
    info.used.push(user);
    info.wait = bootstrapComponent(info, user);
    info.wait = mountComponent(info, user);
  }
};

window.activateOnUrlChange = (name, componentName, handler) => {
  window.addEventListener("spa:url-changed", () => {
    checkHandler(name, componentName, handler);
  });

  setTimeout(() => {
    // enqueue to defer execution
    checkHandler(name, componentName, handler);
  }, 0);
};

document.body.addEventListener("click", followLink);

window.addEventListener("hashchange", urlChanged);

window.addEventListener("popstate", urlChanged);

import("./scripts.json").then((scripts) =>
  scripts.forEach((url) => {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  })
);

navigateTo(location.pathname);
