import Vue from 'vue';

export function setup(api) {
  let SettingsPage = undefined;

  api.registerPage("/settings", {
    bootstrap: () =>
      import("./Settings.vue").then((content) => {
          SettingsPage = content.default;
      }),
    mount: (target) => new Vue({
      el: target.appendChild(document.createElement('div')),
      render(h) {
        return h(SettingsPage, {
          props: {},
        });
      },
    }),
    unmount: (_, instance) => instance.$destroy(),
  });
}
