import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../colors";
import { fontFamily } from "../font";

export const ColdOpenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "20%" — big stat appears first
  const statP = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  // "of your work" slides in below
  const line2P = spring({ frame, fps, config: { damping: 200 }, delay: 28 });
  // pause, then "is free." slams in
  const line3P = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
    delay: 70,
  });
  // "free." emphasis glow
  const glowP = interpolate(frame, [80, 120], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle center radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(245, 158, 11, ${glowP * 0.08}) 0%, transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 0 }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(statP, [0, 1], [106, 0])}%)`,
          }}
        >
          <p className="text-4xl mb-2 text-neutral-500 font-light">
            Did you know
          </p>

          <p className="text-4xl text-neutral-500 mb-4 font-light">
            you may be giving
          </p>
        </div>

        <div
          style={{
            width: interpolate(line3P, [0, 1], [0, 80]),
            height: 1,
            background: `rgba(245, 158, 11, 0.9)`,
            margin: "28px 0",
          }}
        />

        {/* "20%" — massive */}
        <div style={{ overflow: "hidden", paddingBottom: "0.4em" }}>
          <div
            style={{
              transform: `translateY(${interpolate(statP, [0, 1], [106, 0])}%)`,
            }}
          >
            <span
              className="font-extralight leading-none tracking-[-0.06em]"
              style={{ fontSize: 220, color: COLORS.textBright }}
            >
              ~20%
            </span>
          </div>
        </div>

        {/* "of your work" */}
        <div
          style={{ overflow: "hidden", paddingBottom: "0.05em", marginTop: 8 }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(line2P, [0, 1], [106, 0])}%)`,
            }}
          >
            <span className="tracking-[-0.02em] leading-none text-5xl text-white font-light">
              of your work
            </span>
          </div>
        </div>

        {/* Thin separator */}
        <div
          style={{
            width: interpolate(line3P, [0, 1], [0, 80]),
            height: 1,
            background: `rgba(245, 158, 11, 0.9)`,
            margin: "28px 0",
          }}
        />

        {/* "is free." — with amber emphasis on "free." */}
        <div
          style={{
            opacity: interpolate(line3P, [0, 1], [0, 1]),
            filter: `blur(${interpolate(line3P, [0, 1], [6, 0])}px)`,
          }}
          className="flex items-baseline gap-4"
        >
          <span className="font-light tracking-[-0.02em] text-5xl text-neutral-500">
            probably for
          </span>
          <span
            className="font-extralight text-5xl"
            style={{
              color: COLORS.amber,
              textShadow: `0 0 40px rgba(245, 158, 11, ${glowP * 0.6})`,
            }}
          >
            free?
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
