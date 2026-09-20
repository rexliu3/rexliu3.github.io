import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import CardinalLocationInput from "../../studio/components/CardinalLocationInput";

vi.mock("../../studio/node_modules/react/index.js", async () => import("react"));

vi.mock("../../studio/node_modules/@sanity/ui/dist/index.js", async () => {
  const React = await import("react");
  return {
    Flex: ({ children }) => React.createElement("div", null, children),
    Stack: ({ children }) => React.createElement("div", null, children),
    Text: ({ as = "span", children, htmlFor }) => React.createElement(as, { htmlFor }, children),
    TextInput: (props) => React.createElement("input", props),
    Select: (props) => React.createElement("select", props),
  };
});
vi.mock("../../studio/node_modules/sanity/lib/index.js", () => ({
  PatchEvent: { from: (...patches) => ({ patches }) },
  set: (value, path) => ({ type: "set", value, path }),
  setIfMissing: (value) => ({ type: "setIfMissing", value }),
  unset: (path) => ({ type: "unset", path }),
}));

afterEach(cleanup);

test("direction edits stay selected while Sanity saves signed coordinates", () => {
  const onChange = vi.fn();
  const value = { lat: 49.28, lng: 123.12 };
  const view = render(<CardinalLocationInput value={value} onChange={onChange} />);
  const latitude = view.getByLabelText("Latitude direction");
  const longitude = view.getByLabelText("Longitude direction");
  fireEvent.change(latitude, { target: { value: "S" } });
  expect(latitude.value).toBe("S");
  expect(onChange.mock.lastCall[0].patches).toContainEqual({
    type: "set",
    value: { _type: "geopoint", lat: -49.28, lng: 123.12 },
  });
  fireEvent.change(longitude, { target: { value: "W" } });
  expect(longitude.value).toBe("W");
  expect(onChange.mock.lastCall[0].patches).toContainEqual({
    type: "set",
    value: { _type: "geopoint", lat: 49.28, lng: -123.12 },
  });
  view.rerender(<CardinalLocationInput value={{ ...value }} onChange={onChange} />);
  expect(latitude.value).toBe("S");
  expect(longitude.value).toBe("W");
  fireEvent.change(view.getByLabelText("Longitude (degrees)"), { target: { value: "122.5" } });
  expect(onChange.mock.lastCall[0].patches).toContainEqual({
    type: "set",
    value: { _type: "geopoint", lat: 49.28, lng: -122.5 },
  });
  view.rerender(<CardinalLocationInput value={{ lat: -49.28, lng: 123.12 }} onChange={onChange} />);
  expect(longitude.value).toBe("W");
  view.rerender(
    <CardinalLocationInput value={{ lat: -49.28, lng: -123.12 }} onChange={onChange} />
  );
  expect(latitude.value).toBe("S");
  expect(longitude.value).toBe("W");
});

test("directions can be selected before entering coordinates", () => {
  const onChange = vi.fn();
  const view = render(<CardinalLocationInput onChange={onChange} />);
  fireEvent.change(view.getByLabelText("Longitude direction"), { target: { value: "W" } });
  fireEvent.change(view.getByLabelText("Longitude (degrees)"), { target: { value: "123.12" } });
  expect(onChange.mock.lastCall[0].patches).toContainEqual({
    type: "set",
    value: { _type: "geopoint", lng: -123.12 },
  });
});
