import { z } from "zod";

export const KINETIC_TOKENS = {
  palette: [
    { bg: "#0f172a", accent: "#38bdf8", text: "#f8fafc" }, // Slate-900 / Sky-400 / Slate-50
    { bg: "#1e1b4b", accent: "#c084fc", text: "#f8fafc" }, // Indigo-950 / Purple-400 / Slate-50
    { bg: "#020617", accent: "#22d3ee", text: "#f8fafc" }, // Slate-950 / Cyan-400 / Slate-50
  ],
  typography: {
    font: "Inter", // Heavy sans-serif
    fontSize: 140,
    fontWeight: "900",
  }
} as const;

export const KineticPropsSchema = z.object({
  lines: z.array(z.string()).length(3),
});

export type KineticProps = z.infer<typeof KineticPropsSchema>;
