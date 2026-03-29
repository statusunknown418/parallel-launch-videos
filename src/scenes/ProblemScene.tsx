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

const COMPLAINTS = [
  { text: "Can we just add one more thing?", time: "2 days after kickoff" },
  { text: "This wasn't what I envisioned.", time: "Week 3" },
  { text: "We never agreed on that price.", time: "Invoice day" },
];

interface ComplaintProps {
  text: string;
  time: string;
  delay: number;
}

const Complaint: React.FC<ComplaintProps> = ({ text, time, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 }, delay });

  return (
    <div
      style={{
        opacity: interpolate(p, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(p, [0, 1], [32, 0])}px)`,
        filter: `blur(${interpolate(p, [0, 1], [4, 0])}px)`,
        fontFamily,
        borderRadius: 12,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderLeft: `2px solid rgba(255,255,255,0.14)`,
        padding: "18px 24px",
      }}
      className="flex items-center gap-5"
    >
      <span
        className="text-3xl font-light shrink-0 leading-none"
        style={{
          color: "rgba(255,255,255,0.12)",
          fontFamily: "Georgia, serif",
          marginTop: -6,
        }}
      >
        "
      </span>
      <span
        className="text-[22px] font-light italic tracking-[-0.01em] flex-1"
        style={{ color: COLORS.text }}
      >
        {text}
      </span>
      <span
        className="text-[13px] font-medium uppercase tracking-[0.14em] shrink-0"
        style={{ color: COLORS.textMuted }}
      >
        {time}
      </span>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // doubled delays for 60fps
  const h1P = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const h2P = spring({ frame, fps, config: { damping: 200 }, delay: 8 });

  // Bouncy slam-in for the resolution line
  const subP = spring({ frame, fps, config: { damping: 9, stiffness: 300 }, delay: 124 });
  // Gates continuous effects to only start after the text has landed
  const subArrived = spring({ frame, fps, config: { damping: 200 }, delay: 158 });
  // Underline draws in after text arrives
  const underlineP = spring({ frame, fps, config: { damping: 200 }, delay: 168 });

  const subScale = interpolate(subP, [0, 1], [0.72, 1]);
  const subY = interpolate(subP, [0, 1], [28, 0]);
  const subOpacity = interpolate(subP, [0, 0.25], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Glow pulses after landing
  const glowSize = 14 + subArrived * (8 + Math.sin(frame * 0.1) * 6);
  const glowAlpha = subArrived * (0.45 + Math.sin(frame * 0.1) * 0.2);
  // Very subtle horizontal drift to keep it alive
  const driftX = subArrived * Math.sin(frame * 0.18) * 2.5;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      <AbsoluteFill
        className="flex flex-col items-center justify-center"
        style={{ padding: "0 180px" }}
      >
        {/* Heading — per-line masked reveal */}
        <div className="text-center mb-12">
          <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <div
              style={{
                transform: `translateY(${interpolate(h1P, [0, 1], [106, 0])}%)`,
              }}
            >
              <span
                className="font-extralight tracking-[-0.04em] leading-[1.1]"
                style={{ fontSize: 72, color: COLORS.textBright }}
              >
                You do great work.
              </span>
            </div>
          </div>
          <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <div
              style={{
                transform: `translateY(${interpolate(h2P, [0, 1], [106, 0])}%)`,
              }}
            >
              <span
                className="font-thin italic tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 64, color: COLORS.textSecondary }}
              >
                Then these starts to happen.
              </span>
            </div>
          </div>
        </div>

        {/* Complaint list */}
        <div
          className="flex flex-col gap-3 w-full mb-12"
          style={{ maxWidth: 920 }}
        >
          {COMPLAINTS.map((c, i) => (
            <Complaint
              key={i}
              text={c.text}
              time={c.time}
              delay={28 + i * 24}
            />
          ))}
        </div>

        {/* Resolution */}
        <div
          style={{
            opacity: interpolate(subP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(subP, [0, 1], [5, 0])}px)`,
          }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12" style={{ background: COLORS.border }} />
          <span
            className="text-2xl font-light underline underline-offset-4 tracking-[-0.01em]"
            style={{ color: COLORS.brand }}
          >
            It doesn't have to be this way.
          </span>
          <div className="h-px w-12" style={{ background: COLORS.border }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
