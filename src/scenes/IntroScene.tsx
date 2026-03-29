import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../colors";
import { fontFamily } from "../font";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const wordP = spring({ frame, fps, config: { damping: 200 }, delay: 16 });
  const tagP = spring({ frame, fps, config: { damping: 200 }, delay: 40 });
  const urlP = spring({ frame, fps, config: { damping: 200 }, delay: 60 });

  const glowFade = interpolate(frame, [20, 100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Very faint brand glow behind wordmark */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(217,248,52,${glowFade * 0.14}) 0%, transparent 70%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill className="flex flex-col items-center justify-center">
        {/* Overline badge */}
        <div
          style={{
            opacity: interpolate(badgeP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(badgeP, [0, 1], [4, 0])}px)`,
          }}
          className="flex items-center gap-2.5 mb-10"
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: COLORS.brand }}
          />
          <span
            className="text-xl font-medium uppercase tracking-[0.22em]"
            style={{ color: COLORS.brand }}
          >
            Introducing
          </span>
        </div>

        {/* Wordmark — masked line reveal */}
        <div
          style={{
            overflow: "hidden",
            paddingBottom: "0.04em",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(wordP, [0, 1], [106, 0])}%)`,
            }}
          >
            <span
              className="font-extralight leading-none tracking-[-0.05em]"
              style={{
                fontSize: 176,
                background:
                  "linear-gradient(150deg, #FFFFFF 30%, rgba(217,248,52,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Parallel
            </span>
          </div>
        </div>

        {/* Thin divider line that draws in */}
        <div
          style={{
            width: interpolate(tagP, [0, 1], [0, 48]),
            height: 1,
            background: `rgba(217,248,52,0.8)`,
            marginBottom: 28,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(tagP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(tagP, [0, 1], [5, 0])}px)`,
          }}
          className="text-center mb-14"
        >
          <div
            className="tracking-[-0.01em] font-light text-4xl"
            style={{ color: COLORS.text }}
          >
            Scope creep ends here.
          </div>
        </div>

        {/* URL chip */}
        <div
          style={{
            opacity: interpolate(urlP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(urlP, [0, 1], [4, 0])}px)`,
          }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full"
            style={{
              border: `1px solid ${COLORS.border}`,
              background: COLORS.bgCard,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: COLORS.green,
                boxShadow: `0 0 6px ${COLORS.green}`,
              }}
            />
            <span
              className="text-lg font-normal tracking-[0.02em]"
              style={{ color: COLORS.textSecondary, fontFamily: "monospace" }}
            >
              runparallel.sh
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
