import { z } from "zod";

export const DESIGN_TOKENS = {
  colors: {
    background: "#020617", // Deep Navy
    accentCyan: "#22d3ee",
    accentViolet: "#8b5cf6",
    glass: "rgba(255, 255, 255, 0.05)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
  },
  typography: {
    fontMain: "Inter",
    fontMono: "JetBrains Mono",
    sizes: {
      h1: 110,
      h2: 48,
      body: 28,
      badge: 20,
    },
  },
  timing: {
    fps: 30,
    duration: 15,
  },
} as const;

export const IntroPropsSchema = z.object({
  headline: z.string().default("AI AGENT 2.0"),
  version: z.string().default("v2.4.0-beta"),
  features: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      benefit: z.string(),
    })
  ).default([
    { icon: "⚡", title: "Autonomous Reasoning", benefit: "Solves complex tasks without supervision" },
    { icon: "🌐", title: "Real-time Integration", benefit: "Connects to your entire digital ecosystem" },
    { icon: "🛡️", title: "Enterprise Security", benefit: "Privacy-first architecture with end-to-end encryption" },
  ]),
});

export type IntroProps = z.infer<typeof IntroPropsSchema>;
