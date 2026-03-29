import { Lottie } from "@remotion/lottie";
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
import { useLottie } from "../hooks/useLottie";

const CAPABILITIES = [
  "Auto-detects out-of-scope requests",
  "Prepares change orders instantly",
  "Zero accidental free work",
];

const FLOW_STEPS = [
  {
    label: "Classify",
    detail: "AI verdict: out of scope",
    color: COLORS.amber,
  },
  { label: "Quote", detail: "Change order: $1,200", color: COLORS.brand },
  { label: "Approved", detail: "Added to sprint", color: COLORS.green },
];

export const GovernorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps delays
  const badgeP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const h1P = spring({ frame, fps, config: { damping: 200 }, delay: 8 });
  const h2P = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const subP = spring({ frame, fps, config: { damping: 200 }, delay: 32 });
  const cardP = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120 },
    delay: 12,
  });

  // The incoming request notification slides in
  const requestP = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  // BLOCKED badge slides in cleanly
  const blockedP = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
    delay: 76,
  });
  // Flow steps stagger in after BLOCKED
  const flowP = [
    spring({ frame, fps, config: { damping: 200 }, delay: 110 }),
    spring({ frame, fps, config: { damping: 200 }, delay: 128 }),
    spring({ frame, fps, config: { damping: 200 }, delay: 146 }),
  ];

  const borderGlow = interpolate(
    frame,
    [100, 160, 220, 280],
    [0.1, 0.22, 0.1, 0.22],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  // Continuous float on right card
  const cardArrived = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 60,
  });
  const cardFloatY = cardArrived * Math.sin(frame * 0.036) * 6;
  const cardFloatX = cardArrived * Math.sin(frame * 0.021 + 0.8) * 2;

  // Subtle pulse after badge settles
  const blockedBreath =
    interpolate(blockedP, [0.85, 1], [0, 1]) *
    (1 + Math.sin(frame * 0.05) * 0.015);

  const aiLogoData = useLottie("ai_logo");
  const aiLogoOpacity = interpolate(badgeP, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="cyan" />

      {/* AI logo Lottie — top-right corner, ambient glow */}
      {aiLogoData && (
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            opacity: aiLogoOpacity * 0.12,
            pointerEvents: "none",
            filter: "blur(2px)",
          }}
        >
          <Lottie
            animationData={aiLogoData}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      <div
        className="absolute inset-0 grid grid-cols-2 items-center"
        style={{ columnGap: 80, padding: "50px 110px" }}
      >
        {/* ── LEFT: heading + capabilities ── */}
        <div className="flex flex-col">
          {/* Overline badge */}
          <div
            style={{
              opacity: interpolate(badgeP, [0, 1], [0, 1]),
              filter: `blur(${interpolate(badgeP, [0, 1], [4, 0])}px)`,
            }}
            className="flex items-center gap-2.5 mb-8"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: COLORS.brand }}
            />
            <span
              className="text-[13px] font-medium uppercase tracking-[0.22em]"
              style={{ color: COLORS.brand }}
            >
              Scope Enforcement
            </span>
          </div>

          {/* Heading — per-line masked reveal */}
          <div className="mb-6">
            <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
              <div
                style={{
                  transform: `translateY(${interpolate(h1P, [0, 1], [106, 0])}%)`,
                }}
              >
                <span
                  className="font-extralight leading-[1.1] tracking-[-0.04em]"
                  style={{ fontSize: 64, color: COLORS.textBright }}
                >
                  Unapproved work?
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
                  className="font-thin italic leading-[1.1] tracking-[-0.03em]"
                  style={{ fontSize: 58, color: COLORS.amber }}
                >
                  Blocked.
                </span>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              opacity: interpolate(subP, [0, 1], [0, 1]),
              filter: `blur(${interpolate(subP, [0, 1], [5, 0])}px)`,
            }}
            className="mb-10"
          >
            <p
              className="font-light leading-relaxed"
              style={{ fontSize: 24, color: COLORS.textSecondary }}
            >
              Your team only builds what's been paid for.
            </p>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col gap-4">
            {CAPABILITIES.map((cap, i) => {
              const p = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 44 + i * 18,
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: interpolate(p, [0, 1], [0, 1]),
                    filter: `blur(${interpolate(p, [0, 1], [4, 0])}px)`,
                    transform: `translateX(${interpolate(p, [0, 1], [16, 0])}px)`,
                  }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: COLORS.brand }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke={COLORS.bg}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-xl font-light tracking-[-0.01em]"
                    style={{ color: COLORS.text }}
                  >
                    {cap}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: BLOCKED flow ── */}
        <div
          style={{
            opacity: interpolate(cardP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardP, [0, 1], [32, 0]) + cardFloatY}px) translateX(${cardFloatX}px) scale(${interpolate(cardP, [0, 1], [0.96, 1])})`,
            borderRadius: 16,
            border: `1px solid rgba(217, 248, 52, ${borderGlow})`,
            background: COLORS.bgCard,
            overflow: "hidden",
            boxShadow: `0 24px 64px rgba(0,0,0,0.45)`,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Panel header */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: COLORS.amber,
                boxShadow: `0 0 6px ${COLORS.amber}`,
              }}
            />
            <span
              className="text-[13px] font-medium uppercase tracking-[0.18em]"
              style={{ color: COLORS.textMuted }}
            >
              Change Request
            </span>
          </div>

          {/* Incoming request card */}
          <div
            style={{
              opacity: interpolate(requestP, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(requestP, [0, 1], [24, 0])}px)`,
              filter: `blur(${interpolate(requestP, [0, 1], [4, 0])}px)`,
              position: "relative",
            }}
          >
            {/* Slack-style message card */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "16px 20px",
                filter:
                  interpolate(blockedP, [0, 1], [0, 1]) > 0.1
                    ? "brightness(0.5)"
                    : "none",
                transition: "filter 0.1s",
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: COLORS.textBright,
                  }}
                >
                  S
                </div>
                <div>
                  <span
                    className="text-sm font-light"
                    style={{ color: COLORS.textBright }}
                  >
                    Sarah Chen
                  </span>
                  <span
                    className="text-[13px] ml-2"
                    style={{ color: COLORS.textMuted }}
                  >
                    Client
                  </span>
                </div>
              </div>
              <p
                className="text-[15px] font-light leading-relaxed"
                style={{ color: COLORS.text }}
              >
                Hey, can we add an e-commerce dashboard to the project?
              </p>
            </div>

            {/* BLOCKED badge — springs in with overshoot */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${interpolate(blockedP, [0, 1], [0, 1]) * blockedBreath})`,
                opacity: interpolate(blockedP, [0, 0.15, 1], [0, 1, 1]),
                zIndex: 10,
              }}
            >
              <div
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg"
                style={{
                  background: "rgba(245, 158, 11, 0.08)",
                  border: `1px solid rgba(245, 158, 11, 0.45)`,
                  boxShadow: `0 0 14px rgba(245, 158, 11, 0.18)`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: COLORS.amber,
                    boxShadow: `0 0 5px ${COLORS.amber}`,
                  }}
                />
                <span
                  className="text-base font-medium tracking-[0.1em] uppercase"
                  style={{ color: COLORS.amber }}
                >
                  Out of Scope
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: COLORS.border }} />

          {/* Flow steps */}
          <div className="flex flex-col gap-3">
            <div
              className="text-[12px] font-medium uppercase tracking-[0.18em] mb-1"
              style={{ color: COLORS.textMuted }}
            >
              Parallel handles it automatically
            </div>
            {FLOW_STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: interpolate(flowP[i], [0, 1], [0, 1]),
                  filter: `blur(${interpolate(flowP[i], [0, 1], [4, 0])}px)`,
                  transform: `translateX(${interpolate(flowP[i], [0, 1], [16, 0])}px)`,
                }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                  style={{
                    background: `${step.color}20`,
                    border: `1px solid ${step.color}40`,
                    color: step.color,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-light"
                      style={{ color: COLORS.textBright }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="text-[13px] font-light"
                      style={{ color: step.color }}
                    >
                      {step.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
