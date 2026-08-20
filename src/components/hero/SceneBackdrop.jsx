/**
 * Renders one scenery layer. The image (or CSS fallback) is duplicated
 * side-by-side inside a track that slides left continuously -- because
 * both copies are identical, the seam where they meet is invisible, so
 * it loops forever with no jump. That's what makes the background pan
 * right-to-left, giving the bus the illusion of driving forward.
 */
export default function SceneBackdrop({ scene, active }) {
  const style = scene.image
    ? {
        backgroundImage: `url(${scene.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { background: `linear-gradient(180deg, ${scene.skyFrom} 0%, ${scene.skyTo} 100%)` };

  const renderCopy = (key) => (
    <div className="hero-scene__pan-copy" style={style} key={key}>
      {!scene.image && (
        <svg
          className="hero-scene__silhouette"
          viewBox="0 0 1280 140"
          preserveAspectRatio="none"
        >
          <path d={scene.silhouettePath} fill={scene.silhouetteColor} opacity="0.85" />
        </svg>
      )}
    </div>
  );

  return (
    <div className={`hero-scene__backdrop ${active ? "is-active" : ""}`}>
      <div className="hero-scene__pan-track">
        {renderCopy("copy-a")}
        {renderCopy("copy-b")}
      </div>
    </div>
  );
}