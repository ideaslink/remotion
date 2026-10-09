import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  useCurrentFrame, 
  useVideoConfig,
} from "remotion";
import { SPEC_TOKENS, SpecProps } from "./specTokens";
import { SpecCard } from "./SpecCard";

export const SpecScene: React.FC<SpecProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle parallax drift
  const driftX = interpolate(frame, [0, fps * 5], [0, 30], { extrapolateRight: "clamp" });
  const driftY = interpolate(frame, [0, fps * 5], [0, -20], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: SPEC_TOKENS.colors.background, 
      color: SPEC_TOKENS.colors.textPrimary, 
      fontFamily: SPEC_TOKENS.typography.fontMain 
    }}>
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        transform: `translate(${driftX}px, ${driftY}px)`,
        transition: "none"
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: "40px",
          padding: "60px"
        }}>
          {props.specs.map((spec, i) => (
            <SpecCard key={i} index={i} {...spec} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
