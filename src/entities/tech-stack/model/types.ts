import { ReactNode } from "react";

export interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "design" | "management" | "database";
  importance: number;
  icon: ReactNode;
}

export interface TechStackByProfession {
  profession: string;
  stack: TechItem[];
}
