import { motion } from "framer-motion";
import { ArrowBackIosNew } from "@mui/icons-material";

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isSubmitting: boolean;
  onPrevious: () => void;
  isCompact?: boolean;
}

export const QuizNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  isSubmitting,
  onPrevious,
  isCompact = false,
}: QuizNavigationProps) => {
  return (
    <div
      className={`bg-gray-50 border-t border-gray-200 ${
        isCompact ? "px-4 py-3" : "px-6 py-4"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Кнопка Назад */}
        <button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className={`flex items-center text-gray-600 hover:text-[#0c7d70] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 ${
            isCompact ? "px-3 py-1.5 text-sm" : "px-4 py-2"
          }`}
        >
          <ArrowBackIosNew
            className={isCompact ? "mr-1 text-[16px]" : "mr-1"}
            fontSize="small"
          />
          {isCompact ? "Назад" : "Предыдущий"}
        </button>

        {/* Индикатор прогресса - компактный */}
        <div className={`text-gray-500 ${isCompact ? "text-xs" : "text-sm"}`}>
          {currentQuestionIndex + 1}/{totalQuestions}
        </div>

        {/* Статус загрузки */}
        <div className="flex items-center space-x-2">
          {selectedOption && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center text-emerald-600"
            >
              <div
                className={`${
                  isCompact ? "w-1.5 h-1.5 mr-1.5" : "w-2 h-2 mr-2"
                } bg-emerald-500 rounded-full animate-pulse`}
              />
              <span
                className={
                  isCompact ? "text-xs font-medium" : "text-sm font-medium"
                }
              >
                {isCompact ? "Далее..." : "Переходим далее..."}
              </span>
            </motion.div>
          )}

          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-[#0c7d70]"
            >
              <div
                className={`${
                  isCompact ? "w-3 h-3 mr-1.5" : "w-4 h-4 mr-2"
                } border-2 border-[#0c7d70] border-t-transparent rounded-full animate-spin`}
              />
              <span className={isCompact ? "text-xs" : "text-sm"}>
                {isCompact ? "Сохранение..." : "Сохраняем ответ..."}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
