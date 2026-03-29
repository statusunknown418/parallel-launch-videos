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

const PORTAL_FEATURES = [
  {
    icon: "🎨",
    label: "Your Brand",
    detail: "Logo, colors, and custom domain",
    color: COLORS.brand,
  },
  {
    icon: "⚙️",
    label: "No-code Setup",
    detail: "Configured directly inside the app",
    color: COLORS.cyanLight,
  },
  {
    icon: "📋",
    label: "Client Workspace",
    detail: "Sign SOWs & track project progress",
    color: COLORS.amber,
  },
  {
    icon: "🔒",
    label: "Private by Default",
    detail: "Secure, zero Parallel branding",
    color: COLORS.green,
  },
];

const NAV_ITEMS = ["Dashboard", "Projects", "Documents", "Invoices"];

const PROJECTS = [
  {
    name: "Brand Rebrand 2025",
    status: "In Progress",
    progress: 65,
    color: COLORS.brand,
  },
  {
    name: "Website Redesign",
    status: "Awaiting Signature",
    progress: 30,
    color: COLORS.amber,
  },
  {
    name: "Social Media Kit",
    status: "Completed",
    progress: 100,
    color: COLORS.green,
  },
];

export const PortalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps — all delays doubled
  const badgeP = spring({ frame, fps, config: { damping: 200 }, delay: 0 });
  const h1P = spring({ frame, fps, config: { damping: 200 }, delay: 8 });
  const h2P = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const subP = spring({ frame, fps, config: { damping: 200 }, delay: 32 });
  const cardP = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 110 },
    delay: 16,
  });

  const borderGlow = interpolate(
    frame,
    [80, 150, 220, 290],
    [0.08, 0.16, 0.08, 0.16],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  // Continuous float on right card
  const cardArrived = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 70,
  });
  const cardFloatY = cardArrived * Math.sin(frame * 0.033) * 6;
  const cardFloatX = cardArrived * Math.sin(frame * 0.019 + 2.0) * 2;

  // Shimmer on first project progress bar (most prominent)
  const shimmerX = ((frame * 1.4) % 200) - 40;

  const portalData = useLottie("portal");
  const portalOpacity = interpolate(badgeP, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Portal Lottie — ambient top-left glow element */}
      {portalData && (
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            opacity: portalOpacity * 0.14,
            pointerEvents: "none",
            filter: "blur(2px)",
          }}
        >
          <Lottie
            animationData={portalData}
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
              Client Portal
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
                  White-labeled
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
                  style={{ color: COLORS.textSecondary, fontSize: 64 }}
                >
                  client portal.
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
            className="mb-8"
          >
            <p
              className="font-light leading-relaxed"
              style={{ fontSize: 24, color: COLORS.textSecondary }}
            >
              Your brand. Your clients.
              <br />
              Zero Parallel branding.
            </p>
          </div>

          {/* Feature cards — 2×2 staggered grid */}
          <div className="grid grid-cols-2 gap-3">
            {PORTAL_FEATURES.map((f, i) => {
              const p = spring({
                frame,
                fps,
                config: { damping: 18, stiffness: 120 },
                delay: 44 + i * 20,
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: interpolate(p, [0, 1], [0, 1]),
                    filter: `blur(${interpolate(p, [0, 1], [6, 0])}px)`,
                    transform: `translateY(${interpolate(p, [0, 1], [20, 0])}px) scale(${interpolate(p, [0, 1], [0.95, 1])})`,
                    background: COLORS.bgCard,
                    border: `1px solid ${f.color}22`,
                    borderRadius: 12,
                    padding: "16px 18px",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-3"
                    style={{
                      background: `${f.color}14`,
                      border: `1px solid ${f.color}30`,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div
                    className="text-xl font-light mb-0.5"
                    style={{ color: COLORS.textBright }}
                  >
                    {f.label}
                  </div>
                  <div
                    className="text-xl font-light leading-snug"
                    style={{ color: COLORS.textMuted }}
                  >
                    {f.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Portal mockup ── */}
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
          {/* Topbar */}
          <div
            className="flex items-center justify-between px-5"
            style={{
              height: 54,
              borderBottom: `1px solid ${COLORS.border}`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium"
                style={{ background: COLORS.brand, color: COLORS.bg }}
              >
                A
              </div>
              <span
                className="text-sm font-light"
                style={{ color: COLORS.textBright }}
              >
                Acme Studio
              </span>
            </div>
            <div className="flex gap-5">
              {NAV_ITEMS.map((item, i) => (
                <span
                  key={i}
                  className="text-[14px]"
                  style={{
                    fontWeight: i === 0 ? 500 : 300,
                    color: i === 0 ? COLORS.brand : COLORS.textMuted,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="mb-5">
              <div
                className="text-lg font-light mb-0.5"
                style={{ color: COLORS.textBright }}
              >
                Welcome back, Jane
              </div>
              <div
                className="text-[15px] font-light"
                style={{ color: COLORS.textMuted }}
              >
                Your active projects
              </div>
            </div>

            {/* Project cards */}
            <div className="flex flex-col gap-2.5">
              {PROJECTS.map((project, i) => {
                const p = spring({
                  frame,
                  fps,
                  config: { damping: 200 },
                  delay: 40 + i * 18,
                });
                const barWidth = interpolate(p, [0, 1], [0, project.progress]);

                return (
                  <div
                    key={i}
                    style={{
                      opacity: interpolate(p, [0, 1], [0, 1]),
                      filter: `blur(${interpolate(p, [0, 1], [3, 0])}px)`,
                      transform: `translateX(${interpolate(p, [0, 1], [-10, 0])}px)`,
                      border: `1px solid ${COLORS.border}`,
                      background: COLORS.bgCardAlt,
                      borderRadius: 10,
                      padding: "12px 16px",
                    }}
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <span
                        className="text-[16px] font-light"
                        style={{ color: COLORS.textBright }}
                      >
                        {project.name}
                      </span>
                      <span
                        className="text-[13px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{
                          color: project.color,
                          background: `${project.color}15`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div
                      className="h-px rounded-full overflow-hidden"
                      style={{ background: COLORS.border }}
                    >
                      <div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                          width: `${barWidth}%`,
                          background: project.color,
                        }}
                      >
                        {/* Shimmer on "In Progress" bar */}
                        {i === 0 && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                              width: 40,
                              left: shimmerX,
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            {(() => {
              const footerP = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 96,
              });
              return (
                <div
                  style={{
                    opacity: interpolate(footerP, [0, 1], [0, 1]),
                    filter: `blur(${interpolate(footerP, [0, 1], [3, 0])}px)`,
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: `1px solid ${COLORS.border}`,
                  }}
                  className="flex justify-between items-center"
                >
                  <span
                    className="text-[13px] font-light"
                    style={{ color: COLORS.textMuted }}
                  >
                    3 active projects
                  </span>
                  <span
                    className="text-[13px] font-light tracking-[0.02em]"
                    style={{ color: COLORS.brandDim }}
                  >
                    View all →
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
