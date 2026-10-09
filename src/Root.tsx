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
import { AIInAction } from "./AIInAction";
import { AIAgentIntro } from "./AIAgentIntro";
import { SpecScene } from "./SpecScene";
import { KineticScene } from "./KineticScene";
import { DeviceScene } from "./DeviceScene";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DeviceScene"
        component={DeviceScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          screenshot: "https://placehold.co/600x1200",
          deviceType: "phone",
          callouts: [
            { x: 20, y: 30, title: "Smart Dashboard", description: "Real-time analytics at a glance" },
            { x: 80, y: 50, title: "AI Chat", description: "Conversational interface" },
            { x: 40, y: 80, title: "Quick Actions", description: "One-tap task automation" },
          ],
        }}
      />
      <Composition
        id="KineticScene"
        component={KineticScene}
        durationInFrames={5 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          lines: [
            "The remotion blueprint",
            "Cross-platform mobile app",
            "Superchange your code"
          ],
        }}
      />
      <Composition
        id="SpecScene"
        component={SpecScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          specs: [
            { label: "Top Speed", value: 320, unit: "km/h", caption: "Industry leading velocity", percentage: 0.9 },
            { label: "Battery Range", value: 850, unit: "km", caption: "Single charge endurance", percentage: 0.85 },
            { label: "Curb Weight", value: 1850, unit: "kg", caption: "Optimized carbon chassis", percentage: 0.7 },
            { label: "Market Price", value: 75000, unit: "$", caption: "Premium tech positioning", percentage: 0.6 },
          ],
        }}
      />
      <Composition
        id="AIAgentIntro"
        component={AIAgentIntro}
        durationInFrames={10 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          headline: "AI AGENT 2.0",
          version: "v2.4.0-beta",
          features: [
            { icon: "⚡", title: "Autonomous Reasoning", benefit: "Solves complex tasks without supervision" },
            { icon: "🌐", title: "Real-time Integration", benefit: "Connects to your entire digital ecosystem" },
            { icon: "🛡️", title: "Enterprise Security", benefit: "Privacy-first architecture with end-to-end encryption" },
          ],
        }}
      />
      <Composition
        id="Infobox"
        component={InfoBox}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Default Title",
          description: "Default Description",
        }}
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
        id="AIInAction"
        component={AIInAction}
        durationInFrames={500}
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
