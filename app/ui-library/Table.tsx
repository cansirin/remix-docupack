import { styled } from "~/stitches.config";

export const Table = styled("table", {
  minWidth: "100%",
  tableLayout: "fixed",
});

export const TableHeader = styled("thead", {});

export const TableBody = styled("tbody", {
  borderBottom: "1px solid $purple6",
  borderTop: "1px solid $purple6",
});

export const TableRow = styled("tr", {
  borderTop: "1px solid $gray6",
});

export const TableCell = styled("td", {
  width: "%42",
  whiteSpace: "nowrap",
  padding: "0.75rem 1.5rem",
  fontWeight: 500,
  color: "$gray11",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
});

export const TableBall = styled("div", {
  height: "0.625rem",
  width: "0.625rem",
  borderRadius: "9999px",
  backgroundColor: "$purple6",
});

export const TableHeaderCell = styled("th", {
  borderBottom: "1px solid $gray6",
  padding: "0.75rem 1.5rem",
  textAlign: "left",
  width: "%42",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "$gray11",
});
