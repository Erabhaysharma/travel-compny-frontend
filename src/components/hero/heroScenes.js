/**
 * The hero shows the bus "driving through" a sequence of views. Each entry
 * is one view. Right now they're built from CSS gradients + a mountain
 * silhouette so the hero works with zero external images out of the box.
 *
 * To use real photography instead: drop files into
 * /public/images/hero-scenes/ and set `image: "/images/hero-scenes/your-file.jpg"`
 * on any entry below -- the crossfade/road/bus animation needs no changes.
 */
export const heroScenes = [
  {
    id: "hills",
    image: "/images/hero-scenes/hill-city.jpg",
    skyFrom: "#bcd9f2",
    skyTo: "#fef3e2",
    silhouetteColor: "#0d3565",
    silhouettePath:
      "M0,140 L0,90 Q80,40 160,85 T320,70 T480,95 T640,60 T800,90 T960,75 T1120,100 T1280,80 L1280,140 Z",
  },
  {
    id: "mountains",
    image: "/images/hero-scenes/velly.jpg",
    skyFrom: "#a9c9ef",
    skyTo: "#ffe9d6",
    silhouetteColor: "#08264d",
    silhouettePath:
      "M0,140 L0,110 L120,40 L220,100 L300,55 L420,115 L520,30 L620,105 L760,50 L880,110 L1000,45 L1120,100 L1280,60 L1280,140 Z",
  },
  
];
