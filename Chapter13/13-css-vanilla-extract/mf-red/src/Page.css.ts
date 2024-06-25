import { globalStyle, style } from "@vanilla-extract/css";

export const page = style({});

globalStyle(`${page} > h2`, {
  color: "red",
});
