// QuizNavigation.tsx
import { ArrowBack } from "@mui/icons-material";

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isSubmitting: boolean;
  onPrevious: () => void;
}

export const QuizNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  isSubmitting,
  onPrevious,
}: QuizNavigationProps) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Кнопка Назад */}
        <button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className="flex items-center text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          <ArrowBack className="text-lg mr-1" />
          <span>Назад</span>
        </button>

        {/* Статус */}
        <div className="flex items-center gap-4">
          {selectedOption && !isSubmitting && (
            <span className="text-sm text-gray-500">Переход к следующему...</span>
          )}
          {isSubmitting && (
            <span className="text-sm text-gray-500">Сохранение...</span>
          )}
        </div>

        {/* Номер вопроса */}
        <div className="text-sm text-gray-400 font-medium">
          {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      </div>
    </div>
  );
};