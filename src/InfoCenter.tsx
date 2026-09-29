import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { InfoBox } from "./InfoBox";

export const InfoCenter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxes = [
    {
      title: "OpenAI",
      description: "Leading the way with GPT-4 and DALL-E, OpenAI is redefining human-AI interaction.",
    },
    {
      title: "Claude",
      description: "Developed by Anthropic, Claude focuses on constitutional AI for safe and helpful responses.",
    },
    {
      title: "Gemini",
      description: "Google's most capable AI model, seamlessly integrating across the Google ecosystem.",
    },
  ];

  const boxDuration = 120; // Duration each box stays on screen
  const transitionDuration = 30; // Duration of the slide animation
  const exitDuration = 20; // Faster exit speed
  const pauseDuration = 30; // Pause between boxes

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#080a12", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <h1 style={{ 
        color: "#f8f8ff", 
        fontSize: 90, 
        position: "absolute", 
        top: 120, 
        fontFamily: "Arial, Helvetica, sans-serif",
        zIndex: 10,
        fontWeight: 900,
        letterSpacing: -4,
        textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
        background: "linear-gradient(to bottom, #ffffff, #a8aec7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Top AI providers
      </h1>
      
      {boxes.map((box, index) => {
        const startFrame = index * (boxDuration + transitionDuration + pauseDuration);
        
        const translateX = interpolate(
          frame,
          [startFrame, startFrame + transitionDuration, startFrame + boxDuration, startFrame + boxDuration + exitDuration],
          [1200, 0, 0, -1200],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const opacity = interpolate(
          frame,
          [startFrame, startFrame + transitionDuration, startFrame + boxDuration, startFrame + boxDuration + exitDuration],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div key={index} style={{ 
            position: "absolute",
            transform: `translateX(${translateX}px)`,
            opacity: opacity,
          }}>
            <InfoBox 
              offsetFrame={startFrame}
              title={box.title} 
              description={box.description} 
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};


