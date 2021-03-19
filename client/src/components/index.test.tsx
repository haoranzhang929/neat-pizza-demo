import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./";

test("renders correct header", () => {
  render(<App />);
  const header = screen.getByText("Full Stack App Template");
  expect(header).toBeInTheDocument();
});
