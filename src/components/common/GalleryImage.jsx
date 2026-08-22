import { useState } from "react";

/**
 * Google Drive occasionally blocks one hotlink URL format for a file while
 * another still works (e.g. `thumbnail_url` is a short-lived, session-bound
 * link that can 403 even on a public file). This tries `image.url` first,
 * and if it fails to load, automatically falls back to `image.thumbnail_url`
 * instead of leaving a permanently broken image on the page.
 */
export default function GalleryImage({ image, alt, className }) {
  const sources = [image.url, image.thumbnail_url].filter(Boolean);
  const [sourceIndex, setSourceIndex] = useState(0);

  if (sources.length === 0) return null;

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => {
        if (sourceIndex < sources.length - 1) setSourceIndex(sourceIndex + 1);
      }}
    />
  );
}