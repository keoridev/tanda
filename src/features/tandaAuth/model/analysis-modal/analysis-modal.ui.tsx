import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Psychology,
  TrendingUp,
  AutoAwesome,
  Analytics,
  CheckCircle,
} from "@mui/icons-material";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  const analysisSteps = [
    {
      icon: Psychology,
      text: "Анализируем ваши ответы",
      color: "text-blue-500",
    },
    {
      icon: Analytics,
      text: "Определяем сильные стороны",
      color: "text-purple-500",
    },
    {
      icon: TrendingUp,
      text: "Формируем рекомендации",
      color: "text-green-500",
    },
    {
      icon: AutoAwesome,
      text: "Создаем персональный план",
      color: "text-amber-500",
    },
  ];

  React.useEffect(() => {
    if (isOpen && progress >= 100) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, progress, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-700/50 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <AutoAwesome className="text-white text-3xl" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Анализируем ваши результаты
              </h2>
              <p className="text-gray-400">
                Это займет всего несколько секунд...
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>0%</span>
                <span>{progress}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Analysis steps */}
            <div className="space-y-4 mb-6">
              {analysisSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="flex items-center p-3 bg-gray-800/50 rounded-xl border border-gray-700/30"
                >
                  <step.icon className={`text-xl mr-3 ${step.color}`} />
                  <span className="text-gray-200 text-sm">{step.text}</span>

                  {/* Checkmark when step is "completed" */}
                  {progress >= (index + 1) * 25 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <CheckCircle className="text-green-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Loading animation */}
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"
              />
              <p className="text-gray-400 text-sm">
                {progress < 100 ? "Идет анализ..." : "Анализ завершен!"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
