import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring 
} from "remotion";

const CIRCLES = [
  { size: 400, color: "rgba(56, 189, 248, 0.3)", top: "10%", left: "15%", delay: 0 },
  { size: 600, color: "rgba(139, 92, 246, 0.3)", top: "60%", left: "70%", delay: 30 },
  { size: 300, color: "rgba(236, 72, 153, 0.3)", top: "30%", left: "80%", delay: 60 },
  { size: 500, color: "rgba(34, 211, 238, 0.3)", top: "70%", left: "10%", delay: 90 },
];

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation for "Jack M"
  const nameScale = spring({
    frame,
    fps,
    config: { stiffness: 100 },
  });

  const nameOpacity = interpolate(
    frame,
    [0, 15, 270, 300],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation for "Full-stack Software Engineer"
  const subtitleScale = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 100 },
  });

  const subtitleOpacity = interpolate(
    frame,
    [20, 35, 270, 300],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation for Experience
  const expScale = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 100 },
  });

  const expOpacity = interpolate(
    frame,
    [40, 55, 270, 300],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation for Contact
  const contactScale = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 100 },
  });

  const contactOpacity = interpolate(
    frame,
    [60, 75, 270, 300],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a", // Slate-900
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        color: "white",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {CIRCLES.map((circle, i) => {
        const scale = spring({
          frame: frame - circle.delay,
          fps,
          config: { stiffness: 40 },
        });
        const opacity = interpolate(
          frame,
          [circle.delay, circle.delay + 20, 270, 300],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Flicker once (approx 10 frames)
        const flickerPeriod = 10;
        const flickerEnd = circle.delay + flickerPeriod;
        const flicker = frame < circle.delay || frame > flickerEnd 
          ? 1 
          : Math.sin((frame - circle.delay) * Math.PI / flickerPeriod) * 0.5 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: circle.size,
              height: circle.size,
              borderRadius: "50%",
              backgroundColor: circle.color,
              top: circle.top,
              left: circle.left,
              transform: `scale(${scale})`,
              opacity: opacity * flicker,
              zIndex: 1,
            }}
          />
        );
      })}
      <div
        style={{
          transform: `scale(${nameScale})`,
          opacity: nameOpacity,
          fontSize: 120,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Jack M
      </div>
      <div
        style={{
          transform: `scale(${subtitleScale})`,
          opacity: subtitleOpacity,
          fontSize: 60,
          fontWeight: "300",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Full-stack Software Engineer
      </div>
      <div
        style={{
          transform: `scale(${expScale})`,
          opacity: expOpacity,
          fontSize: 40,
          fontWeight: "400",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Experience: AI and automation
      </div>
      <div
        style={{
          transform: `scale(${contactScale})`,
          opacity: contactOpacity,
          fontSize: 40,
          fontWeight: "400",
          textAlign: "center",
          color: "#94a3b8", // Slate-400
        }}
      >
        jackm@hsharp.com
      </div>
    </AbsoluteFill>
  );
};
