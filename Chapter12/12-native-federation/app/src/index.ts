import "./style.css";
import { setup } from "./loader";

(async () => {
  await setup({
    "red": "http://localhost:2001/remoteEntry.json",
    "blue": "http://localhost:2002/remoteEntry.json",
    "green": "http://localhost:2003/remoteEntry.json",
  });
  await import("./bootstrap");
})();
