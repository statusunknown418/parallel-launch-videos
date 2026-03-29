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

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps — all delays doubled
  const eyebrowP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const wordmarkP = spring({ frame, fps, config: { damping: 200 }, delay: 16 });
  const dividerP = spring({ frame, fps, config: { damping: 200 }, delay: 36 });
  const urlP = spring({ frame, fps, config: { damping: 200 }, delay: 48 });
  const ctaP = spring({ frame, fps, config: { damping: 200 }, delay: 72 });
  const pillsP = spring({ frame, fps, config: { damping: 200 }, delay: 100 });

  const glowOpacity = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const pulse = interpolate(
    frame,
    [120, 170, 220, 270, 320],
    [1, 1.016, 1, 1.016, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const confettiData = useLottie("confetti");
  // Confetti bursts in after the CTA button appears
  const confettiOpacity = interpolate(
    frame,
    [90, 120, 180, 220],
    [0, 0.6, 0.7, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Confetti burst layer — plays behind content */}
      {confettiData && (
        <AbsoluteFill
          style={{
            opacity: confettiOpacity,
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        >
          <Lottie
            animationData={confettiData}
            style={{ width: "100%", height: "100%" }}
          />
        </AbsoluteFill>
      )}

      {/* Center brand glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(217, 248, 52, ${glowOpacity * 0.1}) 0%, transparent 65%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill className="flex flex-col items-center justify-center">
        {/* Eyebrow — masked line reveal */}
        <div
          style={{
            overflow: "hidden",
            paddingBottom: "0.05em",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(eyebrowP, [0, 1], [106, 0])}%)`,
            }}
          >
            <span
              className="font-light tracking-[-0.01em]"
              style={{ fontSize: 32, color: COLORS.textSecondary }}
            >
              Stop losing money to scope creep.
            </span>
          </div>
        </div>

        {/* Wordmark — masked line reveal */}
        <div
          style={{
            overflow: "hidden",
            paddingBottom: "0.04em",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(wordmarkP, [0, 1], [106, 0])}%)`,
            }}
          >
            <span
              className="font-extralight leading-none tracking-[-0.05em]"
              style={{
                fontSize: 160,
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

        {/* Thin divider */}
        <div
          style={{
            width: interpolate(dividerP, [0, 1], [0, 56]),
            height: 1,
            background: "rgba(217,248,52,0.9)",
            marginBottom: 40,
          }}
        />

        {/* URL chip */}
        <div
          style={{
            opacity: interpolate(urlP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(urlP, [0, 1], [4, 0])}px)`,
          }}
          className="mb-16"
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
              className="font-light"
              style={{
                color: COLORS.textSecondary,
                fontFamily: "monospace",
                fontWeight: 300,
                fontSize: 28,
              }}
            >
              https://runparallel.sh
            </span>
          </div>
        </div>

        {/* CTA Button with ripple rings */}
        <div
          style={{
            opacity: interpolate(ctaP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ctaP, [0, 1], [16, 0])}px)`,
          }}
          className="relative flex items-center justify-center mb-8"
        >
          {/* Expanding ripple rings — looping */}
          {[0, 30, 60].map((offset, i) => {
            const RIPPLE_CYCLE = 90; // 1.5s at 60fps
            const ctaVisible = interpolate(ctaP, [0, 1], [0, 1]);
            const elapsed = frame - 72 + offset;
            const t = elapsed < 0 ? 0 : (elapsed % RIPPLE_CYCLE) / RIPPLE_CYCLE;
            const scale = 0.8 + t * 1.6;
            const ringOpacity =
              ctaVisible *
              (t < 0.3 ? (t / 0.3) * 0.28 : ((1 - t) / 0.7) * 0.28);
            return (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 248,
                  height: 70,
                  border: `1px solid ${COLORS.brand}`,
                  transform: `scale(${scale}) translateZ(0)`,
                  opacity: ringOpacity,
                }}
              />
            );
          })}

          {/* Button */}
          <div
            className="relative flex items-center gap-3 rounded-full"
            style={{
              padding: "18px 48px",
              background: COLORS.brand,
              boxShadow: `0 0 36px rgba(217, 248, 52, 0.35), 0 0 72px rgba(217, 248, 52, 0.12)`,
              transform: `scale(${pulse})`,
            }}
          >
            <span
              className="text-3xl font-medium tracking-[-0.02em]"
              style={{ color: COLORS.bg }}
            >
              Start now
            </span>
            <span className="text-xl font-light" style={{ color: COLORS.bg }}>
              →
            </span>
          </div>
        </div>

        {/* Feature pills */}
        <div
          style={{
            opacity: interpolate(pillsP, [0, 1], [0, 1]),
            filter: `blur(${interpolate(pillsP, [0, 1], [4, 0])}px)`,
          }}
          className="flex items-center gap-3"
        >
          {["SOW", "e-Signatures", "AI Agent", "Client Portal"].map(
            (tag, i) => (
              <div
                key={i}
                className="px-4 py-1.5 rounded-full text-xl font-light"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textMuted,
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
