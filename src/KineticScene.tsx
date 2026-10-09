import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig,
  Sequence
} from "remotion";
import { KINETIC_TOKENS } from "./kineticTokens";

const HighlightedText: React.FC<{ 
  text: string; 
  accentColor: string; 
  highlightKeyword: string;
}> = ({ text, accentColor, highlightKeyword }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe effect for the background highlight
  const wipeWidth = interpolate(frame, [0, 15], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ 
        position: "absolute", 
        left: 0, 
        top: 0, 
        bottom: 0, 
        height: "100%", 
        backgroundColor: accentColor, 
        width: `${wipeWidth}%`,
        zIndex: -1,
        transition: "none"
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
    </div>
  );
};

export const KineticScene: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BPM 120 = 2 beats per second = 1 beat every 0.5s = 15 frames at 30fps
  const beat = 15; 
  const lineDuration = 1.66 * fps; // Approx 5s total / 3 lines

  return (
    <AbsoluteFill style={{ 
      fontFamily: KINETIC_TOKENS.typography.font,
      fontSize: KINETIC_TOKENS.typography.fontSize,
      fontWeight: KINETIC_TOKENS.typography.fontWeight,
      textAlign: "center",
      overflow: "hidden"
    }}>
      {lines.map((line, i) => {
        const startFrame = i * lineDuration;
        const theme = KINETIC_TOKENS.palette[i];
        
        return (
          <Sequence 
            key={i} 
            from={startFrame} 
            durationInFrames={lineDuration}
            style={{ backgroundColor: theme.bg }}
          >
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
              {i === 0 && (
                <div style={{ 
                  overflow: "hidden",
                  transform: `translateY(${interpolate(frame - startFrame, [0, 10], [100, 0], { extrapolateRight: "clamp" })}px)`
                }}>
                  <div style={{ color: theme.text }}>
                    <HighlightedText 
                      text={line} 
                      accentColor={theme.accent} 
                      highlightKeyword="blueprint"
                    />
                  </div>
                </div>
              )}

              {i === 1 && (
                <div style={{ 
                  color: theme.text,
                  transform: `scale(${spring({ 
                    frame: frame - startFrame, 
                    fps, 
                    config: { stiffness: 200, damping: 10 } 
                  })})`
                }}>
                  <HighlightedText 
                    text={line} 
                    accentColor={theme.accent} 
                    highlightKeyword="Cross-platform"
                  />
                </div>
              )}

              {i === 2 && (
                <div style={{ color: theme.text, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {line.split(" ").map((word, wi) => {
                    const charStagger = wi * 2;
                    const scale = spring({ 
                      frame: frame - startFrame - charStagger, 
                      fps, 
                      config: { stiffness: 150 } 
                    });
                    return (
                      <span key={wi} style={{ 
                        display: "inline-block", 
                        transform: `scale(${scale})`,
                        marginRight: 20
                      }}>
                        <HighlightedText 
                          text={word} 
                          accentColor={theme.accent} 
                          highlightKeyword={word === "game-changing" ? word : ""}
                        />
                      </span>
                    );
                  })}
                </div>
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
