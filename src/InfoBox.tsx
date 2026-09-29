import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const AnimatedText: React.FC<{
  frame: number;
  children: React.ReactNode;
  index: number;
  delay: number;
}> = ({frame, children, index, delay}) => {
  const {fps} = useVideoConfig();
  const startFrame = index * delay;
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 12,
    },
  });

  return (
    <span
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

export const InfoBox: React.FC<{
  eyebrow?: string;
  title: string | React.ReactNode;
  description: string;
  status?: string;
  buttonText?: string;
  offsetFrame?: number;
}> = ({
  eyebrow = "FEATURED MODULE",
  title,
  description,
  status = "Available now",
  buttonText = "Explore",
  offsetFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - offsetFrame;
  const {fps} = useVideoConfig();

  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  const opacity = interpolate(adjustedFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [70, 0]);
  const scale = interpolate(entrance, [0, 1], [0.88, 1]);

  const glowStrength = interpolate(
    adjustedFrame % 150,
    [0, 75, 150],
    [0.18, 0.42, 0.18],
  );

  const borderAngle = interpolate(adjustedFrame, [0, 300], [0, 360]);

  const flashOpacity = interpolate(
    adjustedFrame,
    [60, 65, 70],
    [0, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const buttonFlash = interpolate(
    adjustedFrame,
    [80, 85, 90],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const finalButtonOpacity = interpolate(
    adjustedFrame,
    [0, 70, 80, 90],
    [0, 0, buttonFlash, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={styles.scene}>
      <div
        style={{
          ...styles.ambientGlow,
          opacity: glowStrength,
        }}
      />

      <div
        style={{
          ...styles.cardWrapper,
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          background: `conic-gradient(
            from ${borderAngle}deg,
            #8b5cf6,
            #22d3ee,
            rgba(255, 255, 255, 0.45),
            #8b5cf6
          )`,
          boxShadow: `0 35px 100px rgba(0, 0, 0, .65), 0 0 ${interpolate(flashOpacity, [0, 0.3], [75, 150])}px rgba(139, 92, 246, ${interpolate(flashOpacity, [0, 0.3], [0.28, 0.6])})`,
        }}
      >
        <div style={styles.card}>
          <div style={styles.highlight} />

            <div style={styles.content}>
              <div style={styles.eyebrow}>{eyebrow}</div>

              <h1 style={styles.title}>
                {typeof title === "string" ? (
                  <AnimatedText frame={adjustedFrame} index={0} delay={10}>
                    {title}
                  </AnimatedText>
                ) : (
                  title
                )}
              </h1>

              <p style={styles.description}>
                <AnimatedText frame={adjustedFrame} index={2} delay={10}>
                  {description}
                </AnimatedText>
              </p>

              <div style={styles.footer}>
                <div style={styles.status}>
                  <span style={styles.statusDot} />
                  <AnimatedText frame={adjustedFrame} index={3} delay={10}>
                    {status}
                  </AnimatedText>
                </div>

                <div 
                  style={{ 
                    ...styles.button, 
                    opacity: finalButtonOpacity 
                  }}
                >
                  {buttonText}
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  scene: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#080a12",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  ambientGlow: {
    position: "absolute",
    width: 760,
    height: 480,
    borderRadius: "50%",
    background:
      "linear-gradient(90deg, rgba(139, 92, 246, .8), rgba(34, 211, 238, .7))",
    filter: "blur(100px)",
  },

  cardWrapper: {
    position: "relative",
    width: 920,
    minHeight: 510,
    padding: 2,
    borderRadius: 34,
    boxShadow:
      "0 35px 100px rgba(0, 0, 0, .65), 0 0 75px rgba(139, 92, 246, .28)",
  },

  card: {
    position: "relative",
    minHeight: 506,
    overflow: "hidden",
    borderRadius: 32,
    background:
      "linear-gradient(145deg, rgba(27, 30, 53, .97), rgba(12, 15, 28, .94))",
  },

  highlight: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(115deg, rgba(255,255,255,.13), transparent 30%)",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    padding: "74px 78px",
  },

  eyebrow: {
    marginBottom: 20,
    color: "#b9a7ff",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: 5,
  },

  title: {
    margin: 0,
    color: "#f8f8ff",
    fontSize: 68,
    lineHeight: 1.05,
    letterSpacing: -2,
  },

  description: {
    width: 650,
    marginTop: 28,
    color: "#a8aec7",
    fontSize: 25,
    lineHeight: 1.45,
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 42,
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#dce0f3",
    fontSize: 21,
  },

  statusDot: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    backgroundColor: "#34d399",
    boxShadow: "0 0 20px #34d399",
  },

  button: {
    padding: "16px 25px",
    borderRadius: 14,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    boxShadow: "0 12px 32px rgba(99, 102, 241, .42)",
    marginLeft: "auto",
  },
};
