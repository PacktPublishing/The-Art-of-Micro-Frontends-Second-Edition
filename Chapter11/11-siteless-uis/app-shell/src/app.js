const appContentContainer = document.querySelector("#app-content");
const feedUrl = "http://localhost:9000/modules";
const registry = {};
const handlers = [];

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
  window.dispatchEvent(new CustomEvent("shell:url-changed"));
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
    renderComponent(name, componentName, target);
  } else if (!shouldBeActive && currentContainer) {
    destroyComponent(name, componentName, currentContainer);
    appContentContainer.removeChild(currentContainer);
    appContentContainer.removeAttribute("data-id");
  }
}

function registerComponent(name, componentName, lifecycle) {
  const id = makeId(name, componentName);
  registry[id] = {
    id,
    name,
    componentName,
    lifecycle,
    wait: Promise.resolve(),
    bootstrapped: false,
    used: [],
  };
}

function destroyComponent(name, componentName, target) {
  const id = makeId(name, componentName);
  const info = registry[id];
  const user = info && info.used.filter((u) => u.target === target).pop();

  if (user) {
    info.wait = unmountComponent(info, user).then(() => {
      const index = info.used.indexOf(user);
      info.used.splice(index, 1);
    });
  }
}

function renderComponent(name, componentName, target, props = {}) {
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
}

function activateOnUrlChange(name, componentName, handler) {
  window.addEventListener("shell:url-changed", () => {
    checkHandler(name, componentName, handler);
  });

  setTimeout(() => {
    // enqueue to defer execution
    checkHandler(name, componentName, handler);
  }, 0);
}

function createApi(nsName) {
  return {
    registerPage(route, lifecycle) {
      registerComponent(nsName, route, lifecycle);
      activateOnUrlChange(
        nsName,
        route,
        (location) => location.pathname === route
      );
    },
    registerExtension(id, lifecycle) {
      registerComponent(nsName, id, lifecycle);
    },
    on(eventName, handler) {
      const wrappedHandler = (ev) => handler(ev.details || {});
      window.addEventListener(`shell:${eventName}`, wrappedHandler);
      handlers.push([handler, eventName, wrappedHandler]);
    },
    off(eventName, handler) {
      const handlerPair = handlers.find(
        (p) => p[0] === handler && p[1] === eventName
      );

      if (handlerPair) {
        const wrappedHandler = handlerPair[2];
        window.removeEventListener(`shell:${eventName}`, wrappedHandler);
        handlers.splice(handlers.indexOf(handlerPair), 1);
      }
    },
    renderExtension(container, id, props) {
      const disposers = [];
      const components = Object.keys(registry)
        .map((n) => registry[n])
        .filter((m) => m.componentName === id);

      if (components.length === 1) {
        const nsName = components[0].name;
        renderComponent(nsName, id, container, props);
        disposers.push(() => destroyComponent(nsName, id, container));
      } else if (components.length > 1) {
        components.forEach((c) => {
          const childContainer = container.appendChild(
            document.createElement("slot")
          );
          const nsName = c.name;
          renderComponent(nsName, id, childContainer, props);
          disposers.push(() => destroyComponent(nsName, id, childContainer));
        });
      }

      return () => {
        disposers.forEach((disposer) => disposer());
      };
    },
  };
}

fetch(feedUrl)
  .then((res) => res.json())
  .then((modules) =>
    modules.forEach((moduleData) => {
      const script = document.createElement("script");
      script.src = moduleData.link;
      script.onload = () => {
        const nsName = moduleData.name;
        const { setup } = window[nsName] || {};

        if (typeof setup === "function") {
          const api = createApi(nsName);
          setup(api);
        }
      };
      document.body.appendChild(script);
    })
  );

document.body.addEventListener("click", followLink);

window.addEventListener("hashchange", urlChanged);

window.addEventListener("popstate", urlChanged);

navigateTo(location.pathname);
