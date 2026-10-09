import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig 
} from "remotion";
import { SPEC_TOKENS } from "./specTokens";

interface SpecCardProps {
  label: string;
  value: number;
  unit: string;
  caption: string;
  percentage: number;
  index: number;
}

export const SpecCard: React.FC<SpecCardProps> = ({ label, value, unit, caption, percentage, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance
  const entranceFrame = frame - (index * 10);
  const scale = spring({
    frame: entranceFrame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const opacity = interpolate(entranceFrame, [0, 15], [0, 1], { extrapolateLeft: "clamp" });

  // Count-up animation with ease-out
  const countValue = interpolate(
    entranceFrame, 
    [0, 40], 
    [0, value], 
    { 
      extrapolateLeft: "clamp", 
      extrapolateRight: "clamp" 
    }
  );

  // Progress bar fill
  const progress = interpolate(entranceFrame, [0, 60], [0, percentage], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ 
      width: 500, 
      padding: "32px", 
      borderRadius: 24, 
      backgroundColor: SPEC_TOKENS.colors.cardBg, 
      border: `1px solid ${SPEC_TOKENS.colors.cardBorder}`,
      opacity, 
      transform: `scale(${scale})`,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    }}>
      <div style={{ 
        color: SPEC_TOKENS.colors.textSecondary, 
        fontSize: SPEC_TOKENS.typography.sizes.caption,
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 2
      }}>
        {label}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span style={{ 
          fontSize: SPEC_TOKENS.typography.sizes.number, 
          fontWeight: "bold", 
          color: SPEC_TOKENS.colors.textPrimary,
          fontFamily: SPEC_TOKENS.typography.fontNumbers,
          fontVariantNumeric: "tabular-nums"
        }}>
          {Math.round(countValue).toLocaleString()}
        </span>
        <span style={{ 
          fontSize: SPEC_TOKENS.typography.sizes.unit, 
          color: SPEC_TOKENS.colors.accent,
          fontWeight: "600"
        }}>
          {unit}
        </span>
      </div>

      <div style={{ 
        color: SPEC_TOKENS.colors.textSecondary, 
        fontSize: SPEC_TOKENS.typography.sizes.caption,
        marginBottom: "16px"
      }}>
        {caption}
      </div>

      <div style={{ 
        height: 4, 
        width: "100%", 
        backgroundColor: "rgba(255,255,255,0.1)", 
        borderRadius: 2, 
        overflow: "hidden" 
      }}>
        <div style={{ 
          height: "100%", 
          width: `${progress * 100}%`, 
          backgroundColor: SPEC_TOKENS.colors.accent,
          boxShadow: `0 0 10px ${SPEC_TOKENS.colors.accent}`,
        }} />
      </div>
    </div>
  );
};
