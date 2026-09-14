import React from "react";
import { cleanup, render } from "@testing-library/react";
import useCollection from "./useCollection";
import { useSanityContent } from "../sanity/ContentContext";

jest.mock("../sanity/ContentContext", () => ({ useSanityContent: jest.fn() }));

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

function Collection({ name }) {
  const { items, loading, error } = useCollection(name);
  return <output>{JSON.stringify({ items, loading, error })}</output>;
}

test.each(["experiences", "projects", "courseGroups", "extracurriculars"])(
  "reads the canonical %s collection",
  (name) => {
    const items = [{ _id: "example" }];
    useSanityContent.mockReturnValue({ content: { [name]: items }, loading: false, error: null });
    const view = render(<Collection name={name} />);
    expect(JSON.parse(view.container.textContent)).toEqual({ items, loading: false, error: false });
  }
);

test("exposes loading and failure states before content is available", () => {
  useSanityContent.mockReturnValue({ content: null, loading: true, error: null });
  const view = render(<Collection name="projects" />);
  expect(JSON.parse(view.container.textContent)).toEqual({
    items: [],
    loading: true,
    error: false,
  });
  useSanityContent.mockReturnValue({
    content: null,
    loading: false,
    error: new Error("Unavailable"),
  });
  view.rerender(<Collection name="projects" />);
  expect(JSON.parse(view.container.textContent)).toEqual({
    items: [],
    loading: false,
    error: true,
  });
});
