import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring 
} from "remotion";

const EV_DATA = [
  { year: 2018, value: 2.1, label: "2.1M" },
  { year: 2019, value: 6.2, label: "6.2M" },
  { year: 2020, value: 10.3, label: "10.3M" },
  { year: 2021, value: 14.5, label: "14.5M" },
  { year: 2022, value: 20.1, label: "20.1M" },
  { year: 2023, value: 31.5, label: "31.5M" },
  { year: 2024, value: 45.0, label: "45.0M" },
  { year: 2025, value: 62.0, label: "62.0M" },
  { year: 2026, value: 85.0, label: "85.0M" },
];

const COUNTRY_DATA = [
  { country: "China", value: 45.0, label: "45.0M" },
  { country: "USA", value: 12.5, label: "12.5M" },
  { country: "Germany", value: 5.2, label: "5.2M" },
  { country: "UK", value: 3.1, label: "3.1M" },
  { country: "France", value: 2.8, label: "2.8M" },
  { country: "Norway", value: 1.2, label: "1.2M" },
  { country: "Sweden", value: 0.9, label: "0.9M" },
  { country: "Netherlands", value: 0.8, label: "0.8M" },
  { country: "Canada", value: 0.7, label: "0.7M" },
  { country: "South Korea", value: 0.6, label: "0.6M" },
];

const COLORS = {
  bg: "#0f172a", // Slate-900
  accent: "#10b981", // Emerald-500
  text: "#f8fafc", // Slate-50
  grid: "rgba(255, 255, 255, 0.1)",
};

export const EVGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 1350; // 45 seconds
  const chartDuration = 600; // Split duration: First chart 20s, Second 25s
  const padding = 200;
  const width = 1920 - padding * 2;
  const height = 1080 - padding * 2;

  const maxValue = Math.max(...EV_DATA.map(d => d.value));
  const maxCountryValue = Math.max(...COUNTRY_DATA.map(d => d.value));
  
  const showGlobal = frame < 600;
  const showCountries = frame >= 600;
  const transitionOpacity = interpolate(frame, [570, 630], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const countryOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        fontFamily: "sans-serif",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ 
        position: "absolute", 
        top: 100, 
        fontSize: 60, 
        fontWeight: "bold", 
        textAlign: "center", 
        width: "100%",
        opacity: showGlobal ? 1 : countryOpacity 
      }}>
        {showGlobal ? "Electric Vehicle Adoption Growth" : "Top 10 Countries by EV Adoption"}
      </div>

      {showGlobal && (
        <div style={{ 
          position: "relative", 
          width: width, 
          height: height, 
          borderLeft: `4px solid ${COLORS.text}`, 
          borderBottom: `4px solid ${COLORS.text}`,
          marginLeft: padding,
          marginTop: 200,
          opacity: transitionOpacity,
          transition: "opacity 0.3s",
        }}>
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <div key={i} style={{
              position: "absolute",
              bottom: `${pct * 100}%`,
              width: "100%",
              height: "1px",
              backgroundColor: COLORS.grid,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              color: COLORS.grid,
            }}>
              <span style={{ position: "absolute", left: -100, width: 80, textAlign: "right" }}>
                {Math.round(maxValue * pct)}M
              </span>
            </div>
          ))}

          {/* Data Bars */}
          {EV_DATA.map((data, i) => {
            const barWidth = width / EV_DATA.length;
            const barHeight = (data.value / maxValue) * height;
            const delay = i * 60;
            
            const scaleY = spring({
              frame: frame - delay,
              fps,
              config: { stiffness: 100 },
            });

            return (
              <div key={data.year} style={{
                position: "absolute",
                left: i * barWidth,
                bottom: 0,
                width: barWidth * 0.8,
                height: barHeight,
                backgroundColor: COLORS.accent,
                transform: `scaleY(${scaleY})`,
                transformOrigin: "bottom",
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 20px ${COLORS.accent}66`,
              }}>
                <div style={{
                  position: "absolute",
                  top: -60,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateLeft: "clamp" }),
                }}>
                  {data.label}
                </div>
                <div style={{
                  position: "absolute",
                  bottom: -60,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateLeft: "clamp" }),
                }}>
                  {data.year}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCountries && (
        <div style={{ 
          position: "relative", 
          width: width, 
          height: height, 
          borderLeft: `4px solid ${COLORS.text}`, 
          borderBottom: `4px solid ${COLORS.text}`,
          marginLeft: padding,
          marginTop: 200,
          opacity: countryOpacity,
        }}>
          {/* Country Bars */}
          {COUNTRY_DATA.map((data, i) => {
            const barHeight = 60;
            const barWidth = (data.value / maxCountryValue) * width;
            const delay = i * 40 + 600; // Offset by transition
            
            const scaleX = spring({
              frame: frame - delay,
              fps,
              config: { stiffness: 100 },
            });

            return (
              <div key={data.country} style={{
                position: "absolute",
                left: 0,
                top: i * (height / COUNTRY_DATA.length),
                width: barWidth,
                height: barHeight,
                backgroundColor: COLORS.accent,
                transform: `scaleX(${scaleX})`,
                transformOrigin: "left",
                borderRadius: "0 8px 8px 0",
                boxShadow: `0 0 20px ${COLORS.accent}66`,
              }}>
                <div style={{
                  position: "absolute",
                  left: -250,
                  width: 200,
                  textAlign: "right",
                  fontSize: 30,
                  fontWeight: "bold",
                  opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateLeft: "clamp" }),
                }}>
                  {data.country}
                </div>
                <div style={{
                  position: "absolute",
                  right: 20,
                  top: 10,
                  fontSize: 25,
                  fontWeight: "bold",
                  opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateLeft: "clamp" }),
                }}>
                  {data.label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
