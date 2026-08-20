import { useEffect, useState } from "react";
import SceneBackdrop from "./SceneBackdrop";
import BusIllustration from "./BusIllustration";
import { heroScenes } from "./heroScenes";
import "./AnimatedRoadScene.css";

const SCENE_DURATION_MS = 101000;

export default function AnimatedRoadScene({ scenes = heroScenes }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (scenes.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % scenes.length);
    }, SCENE_DURATION_MS);
    return () => clearInterval(timer);
  }, [scenes.length]);

  return (
    <div className="hero-scene" aria-hidden="true">
      {/* Scenery layers -- crossfade as the "journey" progresses */}
      {scenes.map((scene, i) => (
        <SceneBackdrop key={scene.id} scene={scene} active={i === activeIndex} />
      ))}

      {/* Darkening scrim so headline text stays readable over any scene */}
      <div className="hero-scene__scrim" />

      {/* Road the bus travels on -- dashed markings scroll to fake motion */}
      <div className="hero-scene__road">
        <div className="hero-scene__road-lane" />
      </div>

      {/* Bus stays put; the world moves around it */}
      <div className="hero-scene__bus">
        <BusIllustration className="hero-scene__bus-svg" />
      </div>
    </div>
  );
}
