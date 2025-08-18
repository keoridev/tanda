import { motion } from "framer-motion";
import React from "react";

export const Reveal = ({
  children,
  from = "bottom",
  delay = 0,
}: {
  children: React.ReactNode;
  from?: string;
  delay?: number;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: from === "bottom" ? 50 : from === "top" ? -50 : 0,
      x: from === "left" ? -50 : from === "right" ? 50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
