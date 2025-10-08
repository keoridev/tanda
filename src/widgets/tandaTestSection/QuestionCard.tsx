import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  showHint: boolean;
  onHintToggle: () => void;
  children: React.ReactNode;
  isCompact?: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  showHint,
  onHintToggle,
  children,
  isCompact = false,
}: QuestionCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${
        isCompact ? "p-4" : "p-6"
      }`}
    >
      {/* Заголовок вопроса */}
      <div className={`flex items-start gap-3 ${isCompact ? "mb-3" : "mb-4"}`}>
        <div
          className={`flex-shrink-0 bg-blue-100 text-blue-600 rounded-lg font-bold ${
            isCompact ? "p-2 text-sm" : "p-3 text-base"
          }`}
        >
          {questionNumber}
        </div>

        <div className="flex-1 min-w-0">
          <h2
            className={`text-gray-900 font-medium ${
              isCompact ? "text-base leading-tight" : "text-lg"
            }`}
          >
            {question}
          </h2>

          {/* Подсказка */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`bg-yellow-50 border border-yellow-200 rounded-lg ${
                isCompact ? "p-2 mt-2 text-xs" : "p-3 mt-3 text-sm"
              }`}
            >
              <p className="text-yellow-800">
                Выберите наиболее подходящий вариант ответа
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Дети (OptionsList) */}
      {children}
    </div>
  );
};
