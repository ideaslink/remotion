import { z } from "zod";

export const SPEC_TOKENS = {
  colors: {
    background: "#020617",
    accent: "#22d3ee",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    cardBg: "rgba(15, 23, 42, 0.6)",
    cardBorder: "rgba(34, 211, 238, 0.2)",
  },
  typography: {
    fontMain: "Inter",
    fontNumbers: "JetBrains Mono",
    sizes: {
      number: 80,
      unit: 32,
      caption: 24,
    },
  },
} as const;

export const SpecPropsSchema = z.object({
  specs: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      unit: z.string(),
      caption: z.string(),
      percentage: z.number().min(0).max(1),
    })
  ).length(4),
});

export type SpecProps = z.infer<typeof SpecPropsSchema>;
