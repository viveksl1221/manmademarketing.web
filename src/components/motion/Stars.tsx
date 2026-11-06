import Galaxy from "@/components/motion/Galaxy";

/**
 * Starfield backdrop for dark sections. Place inside a section that has
 * `relative isolate` and a black background; it sits behind the content.
 */
export default function Stars() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <Galaxy
        className="!min-h-0"
        density={2.45}
        glowIntensity={0.29}
        flareIntensity={1}
        starSpeed={0.35}
        mouseRepulsion
        clickWarp
        starColors={["#ffffff", "#ffd9a3", "#a8c8ff"]}
        hueShift={142}
        starSize={0.55}
        twinkleIntensity={0.14}
        speed={0.2}
        rotationSpeed={0.05}
        layers={3}
        direction="forward"
        repulsionStrength={0}
        mouseInteraction
        intro
      />
    </div>
  );
}
