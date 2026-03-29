import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ColdOpenScene } from "./scenes/ColdOpenScene";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SOWScene } from "./scenes/SOWScene";
import { GovernorScene } from "./scenes/GovernorScene";
import { PortalScene } from "./scenes/PortalScene";
import { CTAScene } from "./scenes/CTAScene";

// Scene durations in frames at 60fps
// (roughly double the 30fps originals to maintain same wall-clock duration)
const TRANSITION_FRAMES = 12;
const t = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const ParallelLaunch: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Cold open: "20% of your work is free." — ~3s */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <ColdOpenScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Intro: Parallel wordmark reveal — ~3s */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Problem: scope creep complaints — ~4.5s */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <ProblemScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* SOW: live SOW creation — ~4.5s */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <SOWScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Governor: BLOCKED + scope enforcement flow — ~5s */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <GovernorScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Portal: white-labeled client portal — ~3.8s */}
      <TransitionSeries.Sequence durationInFrames={230}>
        <PortalScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* CTA: Start for free — ~3.8s */}
      <TransitionSeries.Sequence durationInFrames={230}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// 7 scenes, 6 transitions
// (180+180+270+270+300+230+230) - 6×12 = 1660 - 72 = 1588 frames ≈ 26.5s @ 60fps
export const TOTAL_FRAMES = 1660 - 6 * TRANSITION_FRAMES; // 1588
