import { ReactNode } from "react";

export interface ResultChartProps {
  results: {
    [key: string]: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  absoluteValue: number;
  icon: ReactNode;
  color: string;
  gradient: string;
}

export interface SkillLevel {
  level: string;
  icon: ReactNode;
  color: string;
}
