/** Content destinations exclude ambient controls and other scene-only interactions. */
export function getContentRooms(rooms) {
  return rooms.filter((room) => room.content !== false);
}
