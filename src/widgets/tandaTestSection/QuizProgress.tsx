import { motion } from "framer-motion";

interface QuizProgressProps {
  currentProgress: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const QuizProgress = ({
  currentProgress,
  currentQuestionIndex,
  totalQuestions,
}: QuizProgressProps) => {
  return (
    <div className="relative">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Прогресс теста</span>
        <span>{Math.round(currentProgress)}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#0c7d70] rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>

      <div className="flex justify-between mt-3">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < currentQuestionIndex
                ? "bg-[#0c7d70] scale-110"
                : i === currentQuestionIndex
                ? "bg-[#0c7d70] scale-125 ring-2 ring-[#e6f4f2]"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
