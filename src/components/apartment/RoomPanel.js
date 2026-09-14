import React from "react";
import { Icon } from "./Icon";
import JazzPlayer from "./JazzPlayer";
import useDialog from "../../hooks/useDialog";
import BooksPanel from "./panels/BooksPanel";
import TravelPanel from "./panels/TravelPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import PhotosPanel from "./panels/PhotosPanel";
import EducationPanel from "./panels/EducationPanel";

const PANELS = {
  books: { Component: BooksPanel, contentKey: "books" },
  travel: { Component: TravelPanel, contentKey: "travel" },
  projects: { Component: ProjectsPanel, contentKey: "projects" },
  photos: { Component: PhotosPanel, contentKey: "photos" },
  berkeley: { Component: EducationPanel, contentKey: "education" },
};

export default function RoomPanel({
  active,
  onClose,
  onNavigate,
  player,
  rooms,
  cities,
  projects,
  instagramPosts,
  tracks,
  settings,
}) {
  const { panel, closeButton } = useDialog(onClose);
  const roomIndex = rooms.findIndex((item) => item.id === active);
  const room = rooms[roomIndex];
  if (!room) return null;

  const definition = PANELS[active];
  const PanelContent = definition?.Component;

  function navigateNext() {
    onNavigate(rooms[(roomIndex + 1) % rooms.length].id);
    panel.current.scrollTop = 0;
    closeButton.current.focus();
  }

  return (
    <div
      className="panel-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`room-panel panel-${active}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        tabIndex={-1}
        ref={panel}
      >
        <div className="panel-top">
          <span>
            <Icon name={room.icon} size={17} /> {room.name}
          </span>
          <button
            type="button"
            className="close-panel"
            onClick={onClose}
            ref={closeButton}
            aria-label="Back to the apartment"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="panel-content">
          <p className="eyebrow">{settings.panelEyebrow}</p>
          <h2 id="panel-title">{room.panelTitle}</h2>
          {PanelContent && (
            <PanelContent
              key={active}
              room={room}
              content={settings.panels[definition.contentKey]}
              cities={cities}
              projects={projects}
              posts={instagramPosts}
              settings={settings}
            />
          )}
          {active === "music" && (
            <JazzPlayer
              player={player}
              tracks={tracks}
              content={{ ...settings.panels.music, lede: room.lede }}
            />
          )}
        </div>
        <div className="panel-bottom">
          <button type="button" onClick={onClose}>
            ← Back to the apartment
          </button>
          <button type="button" aria-label="Explore the next object" onClick={navigateNext}>
            Next little corner <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
