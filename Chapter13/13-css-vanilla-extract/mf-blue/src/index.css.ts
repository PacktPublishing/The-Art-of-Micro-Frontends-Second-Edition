import { style } from "@vanilla-extract/css";

export const tile = style({
  background: "blue",
  color: "yellow",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const output = style({
  border: "1px dashed blue",
  background: "#ccc",
  color: "#555",
  padding: "1rem",
  fontWeight: "bold",
});
