import { Eye, Zap, Brain, BarChart3, Settings, Target } from "lucide-react";

export const SKILL_COLORS = [
  {
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
  },
  {
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
  },
  {
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
  },
  {
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  },
  {
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  },
  {
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
  },
];

export const SKILLS_MAP = [
  { name: "Визуальное мышление", icon: <Eye size={20} /> },
  { name: "Креативность", icon: <Zap size={20} /> },
  { name: "Логика", icon: <Brain size={20} /> },
  { name: "Аналитика", icon: <BarChart3 size={20} /> },
  { name: "Организация", icon: <Settings size={20} /> },
  { name: "Структурирование", icon: <Target size={20} /> },
];
