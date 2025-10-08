import {
  TimerOutlined,
  CheckCircleOutline,
  QuizOutlined,
} from "@mui/icons-material";

interface QuizHeaderProps {
  timeSpent: number;
  answeredQuestions: number;
  totalQuestions: number;
  currentProgress: number;
}

export const QuizHeader = ({
  timeSpent,
  answeredQuestions,
  totalQuestions,
}: QuizHeaderProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl">
      {/* Основной контент */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Левая часть - Информация о тесте */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl flex items-center justify-center shadow-inner border border-emerald-100 flex-shrink-0">
              <QuizOutlined className="text-emerald-600 text-2xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">
                Профессиональный тест
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Определите свои сильные стороны
              </p>
            </div>
          </div>
        </div>

        {/* Правая часть - Статистика */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 w-full lg:w-auto">
          {/* Время */}
          <div className="flex items-center justify-between sm:justify-start gap-4 bg-gray-50 rounded-xl p-4 sm:p-3 flex-1 sm:flex-none">
            <div className="flex items-center gap-2 text-blue-600">
              <TimerOutlined fontSize="small" />
              <span className="text-sm font-medium whitespace-nowrap">
                Время
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900 font-mono">
              {formatTime(timeSpent)}
            </div>
          </div>

          {/* Прогресс ответов */}
          <div className="flex items-center justify-between sm:justify-start gap-4 bg-emerald-50 rounded-xl p-4 sm:p-3 flex-1 sm:flex-none">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircleOutline fontSize="small" />
              <span className="text-sm font-medium whitespace-nowrap">
                Отвечено
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {answeredQuestions}
              <span className="text-gray-500">/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            Прогресс теста
          </span>
          <span className="text-sm font-bold text-emerald-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-500 ease-out shadow-inner"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Мини-индикаторы вопросов */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < answeredQuestions
                  ? "bg-emerald-500 shadow-sm"
                  : index === answeredQuestions
                  ? "bg-emerald-300 animate-pulse"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Мобильная статистика (альтернативный вариант для очень маленьких экранов) */}
      <div className="lg:hidden mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <TimerOutlined fontSize="small" />
              <span className="text-xs font-medium">Время</span>
            </div>
            <div className="text-base font-bold text-gray-900 font-mono">
              {formatTime(timeSpent)}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
              <CheckCircleOutline fontSize="small" />
              <span className="text-xs font-medium">Прогресс</span>
            </div>
            <div className="text-base font-bold text-gray-900">
              {answeredQuestions}
              <span className="text-gray-500">/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
