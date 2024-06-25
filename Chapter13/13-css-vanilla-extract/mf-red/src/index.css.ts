import { style } from "@vanilla-extract/css";

export const tile = style({
  background: "red",
  color: "white",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const output = style({
  border: "1px dashed red",
  padding: "1rem",
  fontWeight: "bold",
});
