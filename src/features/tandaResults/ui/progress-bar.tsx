import { motion } from "framer-motion";

export const ProgressBar = ({
  value,
  gradient,
  className = "",
}: {
  value: number;
  gradient: string;
  className?: string;
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, delay: 0.5 }}
      className="h-full rounded-full"
      style={{ background: gradient }}
    />
  </div>
);
