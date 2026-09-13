/** Retire the optional service worker used by earlier deployments. */
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => console.error("Could not unregister the service worker:", error));
  }
}
