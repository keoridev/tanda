import { motion } from "framer-motion";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  gradient,
}: StatsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer"
    style={{ background: gradient }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90 mb-1">{title}</div>
      <div className="text-xs opacity-75">{subtitle}</div>
    </div>
  </motion.div>
);
