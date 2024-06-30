import { setup } from "./loader";

(async () => {
  await setup();
  await import("./bootstrap");
})();
