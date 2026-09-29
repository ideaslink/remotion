/*

Remotion Composition Page

__author__ = "vci"
__copyright__ = "Copyright 2026, vci"
__license__ = "MIT"
__version__ = "1.0.0.10"
__maintainer__ = "vci"
__email__ = "modernui.app@gmail.com"
__status__ = "development"
__reference__ = "vci"

__description__ = This file is a part of the Remotion project and defines a composition that can be rendered as a video.
It includes animations, transitions, and dynamic styling based on the current frame of the video. 
The composition takes a title as a prop and displays it with scaling and fading effects.

Notes: 
- to preview it, run: npx remotion studio
- to render to MP4, run: npx remotion render MyVideo out/video.mp4  // where MyVideo is the name of the composition

*/

import React from "react";
import { 
  // CalculateMetadataFunction, 
  // Composition,
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring } from "remotion";

type Props = {
  title: string;
};

// const calculateMetadata: CalculateMetadataFunction<Props> = () => {
//   return {};
// };

export const MyComposition: React.FC<Props> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Spring-based scale-in animation
  const scale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Fade out near the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background color shifts over time
  const hue = interpolate(frame, [0, durationInFrames], [0, 20]);
  // const hue = interpolate(frame, [0, durationInFrames], [200, 320]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(${hue}, 70%, 20%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          fontSize: 100,
          fontWeight: "bold",
          color: "white",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );


  // return (
  //   <Composition
  //     id="MyComp"
  //     component={MyComponent}
  //     durationInFrames={60}
  //     fps={30}
  //     width={1280}
  //     height={720}
  //     calculateMetadata={calculateMetadata}
  //   />
  // );
};

// export const MyComponent: React.FC<Props> = () => {
//   return null;
// };
