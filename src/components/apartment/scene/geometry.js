// One world unit is approximately a centimetre. Every wall, floor plane and
// piece of furniture uses this same oblique projection and vertical scale.
export const project = (x, y, z = 0) => [130 + x + y * 0.5, 400 - x * 0.1 + y * 0.5 - z];
export const points = (vertices) =>
  vertices.map((vertex) => project(...vertex).join(",")).join(" ");
export const front = (x, y, z) => `matrix(1 -.1 0 1 ${project(x, y, z).join(" ")})`;
export const floor = (x, y, z = 0) => `matrix(1 -.1 .5 .5 ${project(x, y, z).join(" ")})`;
