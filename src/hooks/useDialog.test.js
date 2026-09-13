import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import useDialog from "./useDialog";

function Dialog({ onClose }) {
  const { panel, closeButton } = useDialog(onClose);
  return (
    <section role="dialog" tabIndex={-1} ref={panel}>
      <button ref={closeButton} onClick={onClose}>
        Close
      </button>
      <button>Last control</button>
    </section>
  );
}

afterEach(cleanup);

test("keeps focus through callback changes and uses the latest close callback", () => {
  const trigger = document.createElement("button");
  document.body.appendChild(trigger);
  trigger.focus();
  const originalClose = jest.fn();
  const latestClose = jest.fn();
  const view = render(<Dialog onClose={originalClose} />);
  const last = view.getByText("Last control");
  last.focus();

  view.rerender(<Dialog onClose={latestClose} />);
  expect(document.activeElement).toBe(last);
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(latestClose).toHaveBeenCalledTimes(1);
  expect(originalClose).not.toHaveBeenCalled();

  view.unmount();
  expect(document.activeElement).toBe(trigger);
  expect(document.body.style.overflow).toBe("");
  trigger.remove();
});

test("traps focus when tabbing from the panel itself or either end of its controls", () => {
  const view = render(<Dialog onClose={() => {}} />);
  const panel = view.getByRole("dialog");
  const first = view.getByText("Close");
  const last = view.getByText("Last control");

  panel.focus();
  fireEvent.keyDown(panel, { key: "Tab", shiftKey: true });
  expect(document.activeElement).toBe(last);
  fireEvent.keyDown(last, { key: "Tab" });
  expect(document.activeElement).toBe(first);
  fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
  expect(document.activeElement).toBe(last);
  panel.focus();
  fireEvent.keyDown(panel, { key: "Tab" });
  expect(document.activeElement).toBe(first);
});
