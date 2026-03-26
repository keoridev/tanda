interface QuizHeaderProps {
  timeSpent: number;
  answeredQuestions: number;
  totalQuestions: number;
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

  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-4">
        {/* Основная информация */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg font-medium text-gray-900">Профориентационный тест</h1>
            <p className="text-sm text-gray-600 mt-1">
              Вопрос {answeredQuestions + 1} из {totalQuestions}
            </p>
          </div>
          
          {/* Статистика */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-600">Время</div>
              <div className="text-lg font-medium text-gray-900 font-mono">
                {formatTime(timeSpent)}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Прогресс</div>
              <div className="text-lg font-medium text-gray-900">
                {answeredQuestions}<span className="text-gray-500">/{totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Прогресс-бар */}
        <div className="mb-1">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span className="font-medium text-green-600">{Math.round(progress)}%</span>
            <span>{answeredQuestions} ответов</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};