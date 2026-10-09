import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig 
} from "remotion";
import { DESIGN_TOKENS } from "./tokens";

interface FeatureCardProps {
  icon: string;
  title: string;
  benefit: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, benefit, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance: each card starts 15 frames after the previous one
  const entranceFrame = frame - (index * 15);
  const scale = spring({
    frame: entranceFrame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const opacity = interpolate(entranceFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
  });

  const translateX = interpolate(entranceFrame, [0, 20], [50, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        width: 500,
        padding: "40px",
        borderRadius: 24,
        backgroundColor: DESIGN_TOKENS.colors.glass,
        backdropFilter: "blur(12px)",
        border: `1px solid ${DESIGN_TOKENS.colors.glassBorder}`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        color: DESIGN_TOKENS.colors.textPrimary,
      }}
    >
      <div style={{ fontSize: 60 }}>{icon}</div>
      <div>
        <div style={{ 
          fontSize: DESIGN_TOKENS.typography.sizes.h2, 
          fontWeight: "bold",
          color: DESIGN_TOKENS.colors.accentCyan 
        }}>
          {title}
        </div>
        <div style={{ 
          fontSize: DESIGN_TOKENS.typography.sizes.body, 
          color: DESIGN_TOKENS.colors.textSecondary,
          marginTop: 8
        }}>
          {benefit}
        </div>
      </div>
    </div>
  );
};
