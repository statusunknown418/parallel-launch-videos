import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../colors";
import { fontFamily } from "../font";

interface BubbleProps {
  from: "user" | "agent";
  text: string;
  delay: number;
  tag?: string;
}

const ChatBubble: React.FC<BubbleProps> = ({ from, text, delay, tag }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 200 }, delay });
  const isAgent = from === "agent";

  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        filter: `blur(${interpolate(progress, [0, 1], [3, 0])}px)`,
        transform: `translateY(${interpolate(progress, [0, 1], [8, 0])}px)`,
        fontFamily,
      }}
      className={`flex gap-3 items-end ${isAgent ? "justify-start" : "justify-end"}`}
    >
      {isAgent && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, rgba(217,248,52,0.3), rgba(56,189,248,0.3))`,
            border: `1px solid rgba(217,248,52,0.2)`,
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: COLORS.brand }} />
        </div>
      )}
      <div
        className="max-w-[84%]"
        style={{
          padding: "12px 16px",
          borderRadius: isAgent ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isAgent ? "rgba(217, 248, 52, 0.06)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${isAgent ? "rgba(217, 248, 52, 0.15)" : COLORS.border}`,
        }}
      >
        {tag && (
          <div
            className="text-[10px] font-medium uppercase tracking-[0.14em] mb-1.5"
            style={{ color: isAgent ? COLORS.brand : COLORS.textMuted }}
          >
            {tag}
          </div>
        )}
        <div
          className="text-[15px] font-light leading-relaxed"
          style={{ color: isAgent ? COLORS.textBright : COLORS.text }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const TypingDots: React.FC<{ delay: number; hideAt: number }> = ({ delay, hideAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const showP = spring({ frame, fps, config: { damping: 200 }, delay });
  const hideP = spring({ frame, fps, config: { damping: 200 }, delay: hideAt });
  const opacity =
    interpolate(showP, [0, 1], [0, 1]) * interpolate(hideP, [0, 1], [1, 0]);

  const CYCLE = 22;
  const dot = (offset: number) =>
    interpolate((frame + offset) % CYCLE, [0, 5, 11, 16, CYCLE], [0, 1, 0, 0, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.inOut(Easing.quad),
    });

  return (
    <div style={{ opacity, fontFamily }} className="flex justify-start gap-2.5 items-end">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(217,248,52,0.08)",
          border: "1px solid rgba(217,248,52,0.15)",
        }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: COLORS.brand }} />
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{
          background: "rgba(217, 248, 52, 0.06)",
          border: "1px solid rgba(217, 248, 52, 0.15)",
          borderRadius: "4px 14px 14px 14px",
        }}
      >
        {[0, 7, 14].map((offset, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: COLORS.brand,
              transform: `scale(${1 + dot(offset) * 0.6})`,
              opacity: 0.4 + dot(offset) * 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CAPABILITIES = [
  "Writes your SOW from a brief",
  "Enforces scope on change orders",
  "Handles client objections automatically",
];

export const AgentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const h1P = spring({ frame, fps, config: { damping: 200 }, delay: 4 });
  const h2P = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const subP = spring({ frame, fps, config: { damping: 200 }, delay: 16 });
  const cardP = spring({ frame, fps, config: { damping: 20, stiffness: 120 }, delay: 6 });

  const borderGlow = interpolate(
    frame,
    [50, 80, 110, 140],
    [0.1, 0.22, 0.1, 0.22],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="cyan" />

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
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.brand }} />
            <span
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: COLORS.brand }}
            >
              AI Agent
            </span>
          </div>

          {/* Heading — per-line masked reveal */}
          <div className="mb-6">
            <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
              <div style={{ transform: `translateY(${interpolate(h1P, [0, 1], [106, 0])}%)` }}>
                <span
                  className="font-extralight leading-[1.1] tracking-[-0.04em]"
                  style={{ fontSize: 64, color: COLORS.textBright }}
                >
                  Your AI co-pilot
                </span>
              </div>
            </div>
            <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
              <div style={{ transform: `translateY(${interpolate(h2P, [0, 1], [106, 0])}%)` }}>
                <span
                  className="font-thin italic leading-[1.1] tracking-[-0.03em]"
                  style={{ fontSize: 44, color: COLORS.textSecondary }}
                >
                  for every project.
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
              style={{ fontSize: 20, color: COLORS.textSecondary }}
            >
              Not just a generator — an enforcer.
            </p>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col gap-4">
            {CAPABILITIES.map((cap, i) => {
              const p = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 22 + i * 10,
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
                      <path d="M1 4L3.5 6.5L9 1" stroke={COLORS.bg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

        {/* ── RIGHT: Chat mockup ── */}
        <div
          style={{
            opacity: interpolate(cardP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardP, [0, 1], [32, 0])}px) scale(${interpolate(cardP, [0, 1], [0.96, 1])})`,
            borderRadius: 16,
            border: `1px solid rgba(217, 248, 52, ${borderGlow})`,
            background: COLORS.bgCard,
            overflow: "hidden",
            boxShadow: `0 24px 64px rgba(0,0,0,0.45)`,
          }}
        >
          {/* Chat header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{
              borderBottom: `1px solid ${COLORS.border}`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "rgba(217,248,52,0.1)",
                border: `1px solid rgba(217,248,52,0.2)`,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: COLORS.brand, boxShadow: `0 0 6px ${COLORS.brand}` }} />
            </div>
            <div>
              <div className="text-sm font-light" style={{ color: COLORS.textBright }}>
                Parallel Agent
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.greenLight }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.green, boxShadow: `0 0 4px ${COLORS.green}` }} />
                Active
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3.5 p-5">
            <ChatBubble
              from="user"
              text="I'm building a website for a restaurant — 5 pages, CMS, 6 weeks."
              delay={10}
              tag="You"
            />
            <ChatBubble
              from="agent"
              text="SOW drafted: 5 pages, CMS setup, mobile-responsive. Payment: $4,800 split 50/50. Ready to send?"
              delay={22}
              tag="Parallel"
            />
            <ChatBubble
              from="user"
              text="Client wants to add online ordering."
              delay={50}
              tag="You"
            />
            <TypingDots delay={55} hideAt={64} />
            <ChatBubble
              from="agent"
              text="That's outside the agreed scope. Change order prepared for $1,200. Want me to send it?"
              delay={64}
              tag="Parallel — scope enforced"
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
