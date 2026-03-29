import "./index.css";
import { Composition } from "remotion";
import { ParallelLaunch, TOTAL_FRAMES } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ParallelLaunch"
      component={ParallelLaunch}
      durationInFrames={TOTAL_FRAMES}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};
