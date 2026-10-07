import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring 
} from "remotion";
import { InfoBox } from "./InfoBox";

export const AIInAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Intro Splash Effect
  const splashScale = spring({
    frame,
    fps,
    config: { stiffness: 100 },
  });
  const splashOpacity = interpolate(
    frame,
    [0, 15, 60, 75],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 2. InfoBoxes Sequence
  const box1Opacity = interpolate(frame, [80, 100, 180, 200], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const box1TranslateX = interpolate(frame, [80, 100], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const box2Opacity = interpolate(frame, [200, 220, 280, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const box2TranslateX = interpolate(frame, [200, 220], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const box3Opacity = interpolate(frame, [300, 320, 380, 400], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const box3TranslateX = interpolate(frame, [300, 320], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 3. Final Text "AI in Action!"
  const finalTextTranslateY = interpolate(frame, [410, 440], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const finalTextOpacity = interpolate(frame, [410, 430, 480, 500], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#080a12", color: "white", fontFamily: "sans-serif" }}>
      {/* Intro Splash */}
      {splashOpacity > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
          <h1 style={{ 
            fontSize: 120, 
            transform: `scale(${splashScale})`, 
            opacity: splashOpacity,
            textAlign: "center" 
          }}>
            AI Powering the Future
          </h1>
        </AbsoluteFill>
      )}

      {/* Providers Sequence */}
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        zIndex: 5
      }}>
        <div style={{ 
          opacity: box1Opacity, 
          transform: `translateX(${box1TranslateX}px) scale(${box1Opacity})`,
          position: 'absolute'
        }}>
          <InfoBox 
            title="OpenAI" 
            description="Leading the way with GPT-4o and DALL-E 3" 
            eyebrow="LLM Leader"
          />
        </div>
        <div style={{ 
          opacity: box2Opacity, 
          transform: `translateX(${box2TranslateX}px) scale(${box2Opacity})`,
          position: 'absolute'
        }}>
          <InfoBox 
            title="Anthropic" 
            description="Focusing on safety and constitutional AI" 
            eyebrow="Safety First"
          />
        </div>
        <div style={{ 
          opacity: box3Opacity, 
          transform: `translateX(${box3TranslateX}px) scale(${box3Opacity})`,
          position: 'absolute'
        }}>
          <InfoBox 
            title="Google DeepMind" 
            description="Pushing boundaries with Gemini" 
            eyebrow="Research Giant"
          />
        </div>
      </AbsoluteFill>

      {/* Final Text */}
      {finalTextOpacity > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 20 }}>
          <h1 style={{ 
            fontSize: 160, 
            fontWeight: "900", 
            opacity: finalTextOpacity, 
            transform: `translateY(${finalTextTranslateY}px)`,
            textShadow: "0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(34, 211, 238, 0.8)",
            background: "linear-gradient(to right, #a78bfa, #67e8f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}>
            AI in Action!
          </h1>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
