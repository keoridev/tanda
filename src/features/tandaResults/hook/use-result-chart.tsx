import { useMemo, useState, useEffect } from "react";
import { SKILL_COLORS, SKILLS_MAP } from "~entities/result-chart";
import { ChartData } from "~entities/result-chart";

import { Award, TrendingUp, Star, Target } from "lucide-react";

export const useResultChart = (results: { [key: string]: number }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isEmpty, totalScore, averageScore } = useMemo(() => {
    const rawData: ChartData[] = SKILLS_MAP.map((skill, index) => ({
      name: skill.name,
      absoluteValue: results[skill.name] || 0,
      value: 0,
      icon: skill.icon,
      color: SKILL_COLORS[index % SKILL_COLORS.length].color,
      gradient: SKILL_COLORS[index % SKILL_COLORS.length].gradient,
    })).filter((item) => item.absoluteValue > 0);

    const total = rawData.reduce((acc, item) => acc + item.absoluteValue, 0);
    const average = total / rawData.length;

    const calculatedData = rawData
      .map((item) => ({
        ...item,
        value: total > 0 ? Math.round((item.absoluteValue / total) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return {
      data: calculatedData,
      isEmpty: calculatedData.length === 0,
      totalScore: total,
      averageScore: Math.round(average),
    };
  }, [results]);

  const getTopSkill = () => data[0];

  const getSkillLevel = (value: number) => {
    if (value >= 25)
      return {
        level: "Экспертный",
        icon: <Award size={16} />,
        color: "#10B981",
      };
    if (value >= 15)
      return {
        level: "Продвинутый",
        icon: <Star size={16} />,
        color: "#0D9488",
      };
    if (value >= 10)
      return {
        level: "Средний",
        icon: <TrendingUp size={16} />,
        color: "#F59E0B",
      };
    return { level: "Базовый", icon: <Target size={16} />, color: "#6B7280" };
  };

  return {
    data,
    isEmpty,
    totalScore,
    averageScore,
    isMobile,
    getTopSkill,
    getSkillLevel,
  };
};
