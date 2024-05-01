let Info = undefined;

window.registerComponent("tax", "info", {
  bootstrap: () =>
    import("./Info.svelte").then((content) => {
      Info = content.default;
    }),
  mount: (target, props) => new Info({
      target,
      props,
  }),
  unmount: (_, info) => info.$destroy(),
});
