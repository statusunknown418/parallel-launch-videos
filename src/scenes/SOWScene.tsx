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
import { DocuSign } from "../components/svgl/docusign";
import { Dropbox } from "../components/svgl/dropbox";
import { SignNow } from "../components/svgl/signnow";

const SOW_ROWS = [
  { label: "Scope", value: "Custom website design & development" },
  { label: "Deliverables", value: "5 pages + CMS + mobile responsive" },
  { label: "Timeline", value: "6 weeks from kickoff" },
  { label: "Payment", value: "$4,800 — 50% upfront, 50% on delivery" },
];

const FEATURES = [
  { icon: "✍️", text: "Legally binding e-signatures" },
  { icon: "⚡", text: "Live, editable SOW" },
];

const ICON_H = 38;

const REPLACES = [
  { name: "DocuSign", icon: <DocuSign />, aspectRatio: 121 / 26, label: null },
  {
    name: "Dropbox Sign",
    icon: <Dropbox width={ICON_H} height={ICON_H} />,
    aspectRatio: 1,
    label: "Dropbox Sign",
  },
  { name: "SignNow", icon: <SignNow />, aspectRatio: 124 / 42, label: null },
];

interface SOWRowProps {
  label: string;
  value: string;
  delay: number;
}

const SOWRow: React.FC<SOWRowProps> = ({ label, value, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 }, delay });

  return (
    <div
      style={{
        opacity: interpolate(p, [0, 1], [0, 1]),
        filter: `blur(${interpolate(p, [0, 1], [3, 0])}px)`,
        borderBottom: `1px solid ${COLORS.border}`,
        fontFamily,
      }}
      className="flex flex-col gap-1 py-3"
    >
      <span
        className="text-[13px] font-medium uppercase tracking-[0.14em]"
        style={{ color: COLORS.textMuted }}
      >
        {label}
      </span>
      <span
        className="text-[16px] font-light"
        style={{ color: COLORS.textBright }}
      >
        {value}
      </span>
    </div>
  );
};

export const SOWScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps — all delays doubled from 30fps originals
  const badgeP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const h1P = spring({ frame, fps, config: { damping: 200 }, delay: 8 });
  const h2P = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const subP = spring({ frame, fps, config: { damping: 200 }, delay: 32 });
  const cardP = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 110 },
    delay: 12,
  });

  // Continuous float after card settles
  const cardArrived = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 60,
  });
  const cardFloatY = cardArrived * Math.sin(frame * 0.038) * 6;
  const cardFloatX = cardArrived * Math.sin(frame * 0.022 + 1.2) * 2;

  const borderGlow = interpolate(
    frame,
    [100, 160, 220, 280],
    [0.08, 0.18, 0.08, 0.18],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const contractData = useLottie("automation_contract");
  const contractOpacity = interpolate(cardP, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Automation contract Lottie — bottom-right corner accent */}
      {contractData && (
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 340,
            height: 340,
            opacity: contractOpacity * 0.18,
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
        >
          <Lottie
            animationData={contractData}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      <div
        className="absolute inset-0 grid grid-cols-2 items-center"
        style={{ columnGap: 80, padding: "50px 110px" }}
      >
        {/* ── LEFT: heading + features ── */}
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
              Statement of Work
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
                  Create a live SOW
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
                  style={{ fontSize: 64, color: COLORS.textSecondary }}
                >
                  in minutes.
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
              style={{ fontSize: 22, color: COLORS.textSecondary }}
            >
              Define scope, set expectations,
              <br />
              and get it signed — all in one place.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((f, i) => {
              const p = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 48 + i * 20,
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
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="text-xl font-light tracking-[-0.01em]"
                    style={{ color: COLORS.text }}
                  >
                    {f.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Replaces section */}
          {(() => {
            const replacesP = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: 96,
            });
            return (
              <div
                style={{
                  opacity: interpolate(replacesP, [0, 1], [0, 1]),
                  filter: `blur(${interpolate(replacesP, [0, 1], [4, 0])}px)`,
                  marginTop: 28,
                  paddingTop: 24,
                  borderTop: `1px solid ${COLORS.border}`,
                }}
              >
                <span className="text-lg font-medium uppercase block mb-3 text-neutral-500">
                  Replaces
                </span>
                <div className="flex items-center gap-6">
                  {REPLACES.map((r, i) => {
                    const chipP = spring({
                      frame,
                      fps,
                      config: { damping: 200 },
                      delay: 104 + i * 14,
                    });
                    return (
                      <div
                        key={i}
                        style={{
                          opacity: interpolate(chipP, [0, 1], [0, 0.65]),
                          filter: `blur(${interpolate(chipP, [0, 1], [3, 0])}px)`,
                          transform: `translateY(${interpolate(chipP, [0, 1], [8, 0])}px)`,
                          flexShrink: 0,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: Math.round(ICON_H * r.aspectRatio),
                            height: ICON_H,
                            flexShrink: 0,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {r.icon}
                        </div>
                        {r.label && (
                          <span
                            className="font-light tracking-[-0.01em]"
                            style={{
                              fontSize: 16,
                              color: "rgba(255,255,255,0.85)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {r.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── RIGHT: Document mockup ── */}
        <div
          style={{
            opacity: interpolate(cardP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardP, [0, 1], [32, 0]) + cardFloatY}px) translateX(${cardFloatX}px) scale(${interpolate(cardP, [0, 1], [0.96, 1])})`,
            borderRadius: 16,
            border: `1px solid rgba(217, 248, 52, ${borderGlow})`,
            background: COLORS.bgCard,
            overflow: "hidden",
            boxShadow: `0 24px 64px rgba(0,0,0,0.45)`,
          }}
        >
          {/* Doc header */}
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{
              borderBottom: `1px solid ${COLORS.border}`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div>
              <div
                className="text-[12px] font-medium uppercase tracking-[0.18em] mb-1.5"
                style={{ color: COLORS.brand }}
              >
                Statement of Work
              </div>
              <div
                className="text-[22px] font-light"
                style={{ color: COLORS.textBright }}
              >
                Acme Corp Rebrand
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                color: COLORS.greenLight,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: COLORS.green,
                  boxShadow: `0 0 6px ${COLORS.green}`,
                }}
              />
              Active
            </div>
          </div>

          {/* Rows */}
          <div className="px-6 pt-1 pb-4">
            {SOW_ROWS.map((row, i) => (
              <SOWRow
                key={i}
                label={row.label}
                value={row.value}
                delay={24 + i * 14}
              />
            ))}
          </div>

          {/* Signature */}
          {(() => {
            const sigP = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: 92,
            });
            return (
              <div
                className="mx-6 mb-6 flex items-center justify-between rounded-xl px-5 py-4"
                style={{
                  opacity: interpolate(sigP, [0, 1], [0, 1]),
                  filter: `blur(${interpolate(sigP, [0, 1], [4, 0])}px)`,
                  border: `1px solid rgba(217, 248, 52, 0.15)`,
                  background: "rgba(217, 248, 52, 0.04)",
                }}
              >
                <div>
                  <div
                    className="text-[12px] font-medium uppercase tracking-[0.14em] mb-2"
                    style={{ color: COLORS.textMuted }}
                  >
                    Signed by client
                  </div>
                  <div
                    className="text-2xl font-light italic"
                    style={{
                      color: COLORS.brandDim,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    Jane Smith
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium"
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    color: COLORS.greenLight,
                  }}
                >
                  Verified
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};
