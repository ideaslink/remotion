import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig, 
  Sequence,
} from "remotion";
import { DESIGN_TOKENS, IntroProps } from "./tokens";
import { FeatureCard } from "./FeatureCard";

const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.2], { extrapolateRight: "clamp" });
  const movement = (frame * 0.5) % 50;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: DESIGN_TOKENS.colors.background,
      backgroundImage: `linear-gradient(${DESIGN_TOKENS.colors.glassBorder} 1px, transparent 1px), 
                        linear-gradient(90deg, ${DESIGN_TOKENS.colors.glassBorder} 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
      backgroundPosition: `${movement}px ${movement}px`,
      opacity,
    }} />
  );
};

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter effect
  const charCount = text.length;
  const visibleChars = Math.floor(interpolate(frame, [0, 40], [0, charCount], {
    extrapolateRight: "clamp",
  }));

  // Glitch effect
  const glitchAmount = frame > 40 && frame < 60 
    ? Math.sin(frame * 0.5) * 3 
    : 0;

  // Dissolve effect: scale up and fade out
  const dissolveScale = interpolate(frame, [fps * 2, fps * 2.5], [1, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dissolveOpacity = interpolate(frame, [fps * 2, fps * 2.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ 
      fontFamily: DESIGN_TOKENS.typography.fontMono,
      fontSize: DESIGN_TOKENS.typography.sizes.h1,
      fontWeight: "bold",
      color: DESIGN_TOKENS.colors.textPrimary,
      textAlign: "center",
      position: "relative",
      textTransform: "uppercase",
      letterSpacing: 10,
      transform: `translateX(${glitchAmount}px) scale(${dissolveScale})`,
      opacity: dissolveOpacity,
      textShadow: glitchAmount ? `2px 0 ${DESIGN_TOKENS.colors.accentCyan}, -2px 0 ${DESIGN_TOKENS.colors.accentViolet}` : "none"
    }}>
      {text.substring(0, visibleChars)}
      <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
    </div>
  );
};

const VersionBadge: React.FC<{ version: string }> = ({ version }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { stiffness: 100 } });

  return (
    <div style={{ 
      position: "absolute",
      top: 60,
      right: 60,
      padding: "8px 16px",
      borderRadius: 100,
      backgroundColor: DESIGN_TOKENS.colors.accentViolet,
      color: "white",
      fontSize: DESIGN_TOKENS.typography.sizes.badge,
      fontWeight: "bold",
      transform: `scale(${scale})`,
      boxShadow: `0 0 20px ${DESIGN_TOKENS.colors.accentViolet}`,
    }}>
      {version}
    </div>
  );
};

export const AIAgentIntro: React.FC<IntroProps> = (props) => {
  const { headline, version, features } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: DESIGN_TOKENS.colors.background, color: DESIGN_TOKENS.colors.textPrimary, fontFamily: DESIGN_TOKENS.typography.fontMain }}>
      <GridBackground />
      <VersionBadge version={version} />

      <Sequence durationInFrames={fps * 3}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <GlitchText text={headline} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={fps * 3} durationInFrames={fps * 6}>
        <AbsoluteFill style={{ 
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "row", 
          gap: 40 
        }}>
          {features.map((f, i) => (
            <FeatureCard key={i} index={i} {...f} />
          ))}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
