import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../colors";

// Particles — sparse stars drifting upward
const PARTICLES = [
  { x: 8,  size: 1,   speed: 0.125, offset: 0 },
  { x: 24, size: 1.5, speed: 0.09,  offset: 500 },
  { x: 41, size: 1,   speed: 0.15,  offset: 180 },
  { x: 58, size: 1.5, speed: 0.11,  offset: 800 },
  { x: 73, size: 1,   speed: 0.14,  offset: 340 },
  { x: 89, size: 1.5, speed: 0.10,  offset: 640 },
  { x: 15, size: 1,   speed: 0.08,  offset: 260 },
  { x: 32, size: 1,   speed: 0.13,  offset: 950 },
  { x: 64, size: 1.5, speed: 0.09,  offset: 420 },
  { x: 80, size: 1,   speed: 0.12,  offset: 710 },
];

interface BackgroundProps {
  variant?: "default" | "cyan";
}

export const Background: React.FC<BackgroundProps> = ({
  variant = "default",
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const isCyan = variant === "cyan";

  // Continuously looping orb drift using sin waves
  const orb1X = Math.sin(frame * 0.008) * 30;
  const orb1Y = Math.sin(frame * 0.011 + 1.0) * 20;
  const orb2X = Math.sin(frame * 0.009 + 2.5) * 25;
  const orb2Y = Math.sin(frame * 0.007 + 0.5) * 22;

  // Third roaming orb (center-ish, slow)
  const orb3X = Math.sin(frame * 0.006 + 1.8) * 120;
  const orb3Y = Math.sin(frame * 0.005 + 0.3) * 80;

  // Slowly panning grid
  const gridX = (frame * 0.09) % 80;
  const gridY = (frame * 0.06) % 80;

  // Subtle scan line — horizontal bar drifting top to bottom
  const scanY = ((frame * 0.8) % 1200) - 80;
  const scanOpacity = fadeIn * 0.018;

  // Center glow breathing
  const centerBreath = 0.06 + Math.sin(frame * 0.04) * 0.025;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.bg,
        overflow: "hidden",
      }}
    >
      {/* Panning grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: `${gridX}px ${gridY}px`,
        }}
      />

      {/* Top-left atmospheric orb */}
      <div
        style={{
          position: "absolute",
          top: -280 + orb1Y,
          left: -160 + orb1X,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: isCyan
            ? "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(217, 248, 52, 0.22) 0%, transparent 65%)",
          filter: "blur(80px)",
          opacity: fadeIn,
        }}
      />

      {/* Bottom-right atmospheric orb */}
      <div
        style={{
          position: "absolute",
          bottom: -280 + orb2Y,
          right: -160 + orb2X,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: isCyan
            ? "radial-gradient(circle, rgba(217, 248, 52, 0.15) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(56, 189, 248, 0.13) 0%, transparent 65%)",
          filter: "blur(90px)",
          opacity: fadeIn,
        }}
      />

      {/* Roaming center orb */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          marginTop: -300 + orb3Y,
          marginLeft: -300 + orb3X,
          borderRadius: "50%",
          background: isCyan
            ? `radial-gradient(circle, rgba(56, 189, 248, ${centerBreath}) 0%, transparent 60%)`
            : `radial-gradient(circle, rgba(217, 248, 52, ${centerBreath}) 0%, transparent 60%)`,
          filter: "blur(100px)",
          opacity: fadeIn,
        }}
      />

      {/* Scan line — slow horizontal sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 80,
          background: isCyan
            ? "linear-gradient(180deg, transparent, rgba(56,189,248,0.06), transparent)"
            : "linear-gradient(180deg, transparent, rgba(217,248,52,0.05), transparent)",
          opacity: scanOpacity * 2,
          pointerEvents: "none",
        }}
      />

      {/* Sparse star-like particles */}
      {PARTICLES.map((p, i) => {
        const travel = 1400;
        const y = travel - ((frame * p.speed + p.offset) % travel);
        const yFrac = y / travel;
        const fade =
          yFrac < 0.06 ? yFrac / 0.06 : yFrac > 0.9 ? (1 - (yFrac - 0.9) / 0.1) : 1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 2 === 0 ? COLORS.brand : COLORS.cyanLight,
              opacity: Math.max(0, fade) * 0.5 * fadeIn,
            }}
          />
        );
      })}

      {/* Bottom vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
