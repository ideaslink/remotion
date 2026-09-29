import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring 
} from "remotion";

const COLORS = {
  query: "#60a5fa", // Blue-400
  key: "#f472b6",   // Pink-400
  value: "#4ade80", // Green-400
  bg: "#0f172a",    // Slate-900
  text: "#f8fafc",  // Slate-50
};

export const AttentionExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline markers (frames)
  const introEnd = 90;      // 3s
  const qkvStart = 91;     // 3s
  const qkvEnd = 450;       // 15s
  const scoringStart = 451; // 15s
  const scoringEnd = 900;   // 30s
  const sumStart = 901;     // 30s
  const sumEnd = 1500;      // 50s
  const outroStart = 1501;  // 50s

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        fontFamily: "sans-serif",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. Intro */}
      {frame < qkvStart && (
        <div style={{ textAlign: "center", opacity: interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0]) }}>
          <h1 style={{ fontSize: 80, fontWeight: "bold" }}>How Transformer Attention Works</h1>
          <p style={{ fontSize: 40 }}>In 60 Seconds</p>
        </div>
      )}

      {/* 2. The QKV Vectors */}
      {frame >= qkvStart && frame < scoringStart && (
        <div style={{ textAlign: "center", width: "80%" }}>
          <h2 style={{ fontSize: 60, marginBottom: 60 }}>The Three Vectors</h2>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <VectorBox 
              label="Query (Q)" 
              color={COLORS.query} 
              desc="'What am I looking for?'" 
              frame={frame} 
              start={qkvStart} 
              delay={0} 
            />
            <VectorBox 
              label="Key (K)" 
              color={COLORS.key} 
              desc="'What information do I have?'" 
              frame={frame} 
              start={qkvStart} 
              delay={30} 
            />
            <VectorBox 
              label="Value (V)" 
              color={COLORS.value} 
              desc="'What is the actual content?'" 
              frame={frame} 
              start={qkvStart} 
              delay={60} 
            />
          </div>
        </div>
      )}

      {/* 3. Scoring & Softmax */}
      {frame >= scoringStart && frame < sumStart && (
        <div style={{ textAlign: "center", width: "80%" }}>
          <h2 style={{ fontSize: 60, marginBottom: 60 }}>Step 1: Scoring & Relevance</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
            <div style={{ padding: 20, border: `4px solid ${COLORS.query}`, borderRadius: 10 }}>Query</div>
            <div style={{ fontSize: 40 }}>×</div>
            <div style={{ padding: 20, border: `4px solid ${COLORS.key}`, borderRadius: 10 }}>Key</div>
            <div style={{ fontSize: 40 }}>=</div>
            <div style={{ padding: 20, backgroundColor: "white", color: "black", borderRadius: 10, fontWeight: "bold" }}>Score</div>
          </div>
          <p style={{ fontSize: 30, marginTop: 60, maxWidth: 800, margin: "60px auto 0" }}>
            Higher dot product = Higher relevance. <br />
            Softmax then turns these into percentages (weights).
          </p>
        </div>
      )}

      {/* 4. Weighted Sum */}
      {frame >= sumStart && frame < outroStart && (
        <div style={{ textAlign: "center", width: "80%" }}>
          <h2 style={{ fontSize: 60, marginBottom: 60 }}>Step 2: The Final Representation</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
            <div style={{ fontSize: 30 }}>Weight (%)</div>
            <div style={{ fontSize: 40 }}>×</div>
            <div style={{ padding: 20, border: `4px solid ${COLORS.value}`, borderRadius: 10 }}>Value</div>
            <div style={{ fontSize: 40 }}>=</div>
            <div style={{ padding: 20, backgroundColor: COLORS.value, color: "black", borderRadius: 10, fontWeight: "bold" }}>Contextual Word</div>
          </div>
          <p style={{ fontSize: 30, marginTop: 60, maxWidth: 800, margin: "60px auto 0" }}>
            We sum up all values based on their weights to get a <br />
            meaningful representation of the word in its current context.
          </p>
        </div>
      )}

      {/* 5. Outro */}
      {frame >= outroStart && (
        <div style={{ textAlign: "center", opacity: interpolate(frame, [outroStart, outroStart + 30], [0, 1]) }}>
          <h1 style={{ fontSize: 80, fontWeight: "bold" }}>Context is Everything.</h1>
          <p style={{ fontSize: 40 }}>That's Transformer Attention!</p>
        </div>
      )}
    </AbsoluteFill>
  );
};

const VectorBox: React.FC<{ label: string; color: string; desc: string; frame: number; start: number; delay: number }> = ({ label, color, desc, frame, start, delay }) => {
  const opacity = interpolate(frame, [start + delay, start + delay + 20], [0, 1], { extrapolateLeft: "clamp" });
  const scale = spring({ frame: frame - (start + delay), fps: 30, config: { stiffness: 100 } });

  return (
    <div style={{ 
      opacity, 
      transform: `scale(${scale})`, 
      backgroundColor: "rgba(255,255,255,0.05)", 
      padding: 40, 
      borderRadius: 20, 
      width: 300, 
      textAlign: "center",
      borderTop: `10px solid ${color}`
    }}>
      <div style={{ fontSize: 40, fontWeight: "bold", color, marginBottom: 20 }}>{label}</div>
      <div style={{ fontSize: 24, opacity: 0.8 }}>{desc}</div>
    </div>
  );
};
