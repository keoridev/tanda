// QuestionCard.tsx
import { AnimatePresence, motion } from "framer-motion";
import { HelpOutline } from "@mui/icons-material";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  showHint: boolean;
  onHintToggle: () => void;
  children: React.ReactNode;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  showHint,
  onHintToggle,
  children,
}: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* Верхняя часть с номером и кнопкой подсказки */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 font-medium">
            Вопрос {questionNumber}
          </span>
        </div>
        <button
          onClick={onHintToggle}
          className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showHint ? "Скрыть подсказку" : "Показать подсказку"}
        >
          <HelpOutline fontSize="small" />
        </button>
      </div>

      {/* Текст вопроса */}
      <h2 className="text-lg text-gray-900 font-medium mb-4 leading-tight">
        {question}
      </h2>

      {/* Индикатор прогресса */}
      <div className="w-full h-1 bg-gray-100 rounded-full mb-4">
        <div
          className="h-full bg-gray-400 rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Подсказка */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                Выберите наиболее подходящий вариант ответа.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Список вариантов */}
      {children}
    </div>
  );
};