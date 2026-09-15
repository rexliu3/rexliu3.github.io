import React, { useState } from "react";
import { Icon } from "./Icon";

export default function ShareRoomButton() {
  const [status, setStatus] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copied");
    } catch {
      setStatus("Copy the link from your address bar.");
    }
  }

  return (
    <div className="share-room">
      <button type="button" onClick={copyLink}>
        <Icon name="link" size={15} /> Copy room link
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
