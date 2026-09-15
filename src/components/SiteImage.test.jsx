import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import SiteImage from "./SiteImage";

afterEach(cleanup);

test("uses local assets and retries a missing bundled image only once", () => {
  const view = render(<SiteImage src="/assets/Profile-Picture.png" alt="Rex" />);
  const photo = view.getByAltText("Rex");
  expect(photo.getAttribute("src")).toBe("/assets/Profile-Picture.png");

  fireEvent.error(photo);
  expect(photo.getAttribute("src")).toBe("https://rexliu3.github.io/assets/Profile-Picture.png");
  fireEvent.error(photo);
  expect(photo.getAttribute("src")).toBe("https://rexliu3.github.io/assets/Profile-Picture.png");

  view.rerender(<SiteImage src="/assets/Minesweeper-Wall.png" alt="Minesweeper" />);
  expect(view.getByAltText("Minesweeper").getAttribute("src")).toBe("/assets/Minesweeper-Wall.png");
});

test("preserves remote CMS image URLs even when they fail", () => {
  const src = "https://cdn.sanity.io/images/example/photo.jpg";
  const view = render(<SiteImage src={src} alt="CMS photo" />);
  const photo = view.getByAltText("CMS photo");
  fireEvent.error(photo);
  expect(photo.getAttribute("src")).toBe(src);
});
