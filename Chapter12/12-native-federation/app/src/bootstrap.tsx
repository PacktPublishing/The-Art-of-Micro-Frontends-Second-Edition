import { loadRemoteModule } from "@softarc/native-federation";

loadRemoteModule({
  remoteName: "red",
  exposedModule: "./productPage",
}).then(({ renderProductPage }) => {
  const root = document.querySelector("#app");
  renderProductPage(root);
});
