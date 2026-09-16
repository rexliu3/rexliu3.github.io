import React, { useState } from "react";

const ASSET_ORIGIN = "https://rexliu3.github.io";

export default function SiteImage({ src, alt, ...props }) {
  const [failedSource, setFailedSource] = useState(null);
  const isBundled = typeof src === "string" && src.startsWith("/assets/");
  // Some preview hosts serve the app but cannot serve its public asset directory.
  const resolvedSource =
    isBundled && failedSource === src ? `${ASSET_ORIGIN}${src}` : src || undefined;

  return (
    <img
      {...props}
      decoding="async"
      src={resolvedSource}
      alt={alt}
      onError={isBundled && failedSource !== src ? () => setFailedSource(src) : undefined}
    />
  );
}
