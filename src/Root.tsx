/*

Remotion - Root Page

__author__ = "vci"
__copyright__ = "Copyright 2026, vci"
__license__ = "MIT"
__version__ = "1.0.0.10"
__maintainer__ = "vci"
__email__ = "modernui.app@gmail.com"
__status__ = "development"
__reference__ = "vci"

__description__ = This file is the root page of the Remotion project. 
It defines the main composition and its properties, including duration, frame rate, and dimensions.

Notes: 
- to preview it, run: npx remotion studio
- to render to MP4, run: npx remotion render MyVideo out/video.mp4  // where MyVideo is the name of the composition

*/

import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Intro } from "./Intro";
import { AttentionExplainer } from "./AttentionExplainer";
import { EVGrowth } from "./EVGrowth";
import { InfoBox } from "./InfoBox";
import { InfoCenter } from "./InfoCenter";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Infobox"
        component={InfoBox}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="InfoCenter"
        component={InfoCenter}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EVGrowth"
        component={EVGrowth}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AttentionExplainer"
        component={AttentionExplainer}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PersonalIntro"
        component={Intro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyVideo"
        component={MyComposition}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello from Remotion",
        }}
      />
    </>
  );

  // return (
  //   <>
  //     <MyComposition />
  //   </>
  // );
};
