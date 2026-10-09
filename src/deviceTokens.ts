import { z } from "zod";

export const DEVICE_TOKENS = {
  colors: {
    background: "#0f172a",
    accent: "#38bdf8",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    deviceBorder: "#334155",
    reflection: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontMain: "Inter",
    sizes: {
      label: 24,
      description: 18,
    },
  },
} as const;

export const DeviceScenePropsSchema = z.object({
  screenshot: z.string(),
  deviceType: z.enum(["phone", "laptop"]).default("phone"),
  callouts: z.array(
    z.object({
      x: z.number(), // percentage 0-100
      y: z.number(), // percentage 0-100
      title: z.string(),
      description: z.string(),
    })
  ).length(3),
});

export type DeviceSceneProps = z.infer<typeof DeviceScenePropsSchema>;
