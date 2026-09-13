export const jazzTracks = [
  { id: "bossa-antigua", title: "Bossa Antigua", mood: "A sunny little bossa nova", duration: "4:43", color: "#b96743" },
  { id: "jazz-brunch", title: "Jazz Brunch", mood: "Easy Sunday café grooves", duration: "5:23", color: "#859574" },
  { id: "george-street-shuffle", title: "George Street Shuffle", mood: "Light swing & mellow vibraphone", duration: "4:28", color: "#b59a5f" },
  { id: "local-forecast-slower", title: "Local Forecast - Slower", mood: "Laid-back lounge for a slow afternoon", duration: "3:19", color: "#738e8a" },
  { id: "apero-hour", title: "Apero Hour", mood: "Cool jazz for the golden hour", duration: "4:43", color: "#9a7c88" },
].map(track => ({ ...track, src: `/audio/${track.id}.mp3` }));
