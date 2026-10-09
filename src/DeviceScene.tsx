import React from "react";
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig 
} from "remotion";
import { DEVICE_TOKENS } from "./deviceTokens";

interface CalloutProps {
  x: number;
  y: number;
  title: string;
  description: string;
  index: number;
}

const Callout: React.FC<CalloutProps> = ({ x, y, title, description, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceFrame = frame - (index * 20);
  const opacity = interpolate(entranceFrame, [0, 15], [0, 1], { extrapolateLeft: "clamp" });
  const scale = spring({
    frame: entranceFrame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  return (
    <div style={{ 
      position: "absolute", 
      left: `${x}%`, 
      top: `${y}%`, 
      opacity, 
      transform: `scale(${scale})`,
      display: "flex",
      flexDirection: "column",
      pointerEvents: "none"
    }}>
      {/* Connector Line */}
      <div style={{ 
        position: "absolute", 
        width: 2, 
        height: 40, 
        backgroundColor: DEVICE_TOKENS.colors.accent, 
        top: -40, 
        left: -1,
        transform: "rotate(45deg)",
        transformOrigin: "bottom"
      }} />
      
      <div style={{ 
        backgroundColor: "rgba(15, 23, 42, 0.8)", 
        backdropFilter: "blur(8px)", 
        border: `1px solid ${DEVICE_TOKENS.colors.deviceBorder}`,
        padding: "12px 16px", 
        borderRadius: 12, 
        color: "white",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
        minWidth: 200
      }}>
        <div style={{ 
          fontSize: DEVICE_TOKENS.typography.sizes.label, 
          fontWeight: "bold", 
          color: DEVICE_TOKENS.colors.accent 
        }}>
          {title}
        </div>
        <div style={{ 
          fontSize: DEVICE_TOKENS.typography.sizes.description, 
          color: DEVICE_TOKENS.colors.textSecondary 
        }}>
          {description}
        </div>
      </div>
    </div>
  );
};

export const DeviceScene: React.FC<{ 
  screenshot: string; 
  deviceType: "phone" | "laptop"; 
  callouts: any[] 
}> = ({ screenshot, deviceType, callouts }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Entrance
  const rotateX = spring({
    frame,
    fps,
    config: { stiffness: 50, damping: 20 },
  });
  const rotateY = spring({
    frame,
    fps,
    config: { stiffness: 50, damping: 20 },
  });
  const translateZ = interpolate(frame, [0, 30], [-500, 0], { extrapolateRight: "clamp" });

  // Subtle drift
  const driftX = interpolate(frame, [0, fps * 5], [0, 20], { extrapolateRight: "clamp" });
  const driftY = interpolate(frame, [0, fps * 5], [0, -20], { extrapolateRight: "clamp" });

  const isPhone = deviceType === "phone";
  const deviceWidth = isPhone ? 400 : 1000;
  const deviceHeight = isPhone ? 800 : 600;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: DEVICE_TOKENS.colors.background, 
      fontFamily: DEVICE_TOKENS.typography.fontMain,
      perspective: 2000 
    }}>
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        transform: `translate(${driftX}px, ${driftY}px)`
      }}>
        {/* Reflection & Shadow */}
        <div style={{ 
          position: "absolute", 
          bottom: -100, 
          width: deviceWidth * 0.8, 
          height: 60, 
          backgroundColor: "rgba(0,0,0,0.4)", 
          borderRadius: "50%", 
          filter: "blur(30px)",
          zIndex: -1
        }} />
        <div style={{ 
          position: "absolute", 
          bottom: -50, 
          width: deviceWidth * 0.6, 
          height: 30, 
          backgroundColor: DEVICE_TOKENS.colors.reflection, 
          borderRadius: "50%", 
          filter: "blur(20px)",
          zIndex: -1
        }} />

        {/* Device Mockup */}
        <div style={{ 
          width: deviceWidth, 
          height: deviceHeight, 
          backgroundColor: DEVICE_TOKENS.colors.deviceBorder, 
          borderRadius: isPhone ? 40 : 20, 
          padding: isPhone ? 12 : 20, 
          boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
          transform: `rotateX(${rotateX * 20}deg) rotateY(${rotateY * -20}deg) translateZ(${translateZ}px)`,
          transition: "none"
        }}>
          <div style={{ 
            width: "100%", 
            height: "100%", 
            borderRadius: isPhone ? 30 : 10, 
            overflow: "hidden", 
            backgroundColor: "black" 
          }}>
            <img src={screenshot} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Callouts */}
        <div style={{ 
          position: "absolute", 
          width: deviceWidth, 
          height: deviceHeight, 
          pointerEvents: "none" 
        }}>
          {callouts.map((c, i) => (
            <Callout key={i} index={i} {...c} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
