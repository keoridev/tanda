import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizLogic } from "~features/tandaQuiz";
import { AnimatePresence, motion } from "framer-motion";
import { PreloaderTest } from "~shared/ui/preloader";
import { QuizOutlined } from "@mui/icons-material";
import {
  QuizHeader,
  QuestionCard,
  OptionsList,
  QuizNavigation,
} from "~widgets/tandaTestSection";
import { tandaApi } from "~entities/tandaQuestion";
import { TransformedQuestion } from "~entities/tandaQuestion";

export const QuizPage = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    selectedOption,
    handleOptionChange,
    submitAnswer,
    isTestFinished,
    isSubmitting,
    handlePreviousQuestion,
    totalQuestions,
  } = useQuizLogic();

  const [loading, setLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<TransformedQuestion[]>([]);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка вопросов с бэкенда
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const questions = await tandaApi.getQuestions();
        setQuizQuestions(questions);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError("Не удалось загрузить вопросы. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!isTestFinished && !loading) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTestFinished, loading, startTime]);

  useEffect(() => {
    if (selectedOption && !isSubmitting && quizQuestions.length > 0) {
      const timer = setTimeout(() => {
        submitAnswer();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [selectedOption, isSubmitting, submitAnswer, quizQuestions]);

  useEffect(() => {
    if (isTestFinished) {
      navigate("/login");
    }
  }, [isTestFinished, navigate]);

  const handleOptionSelect = (value: string) => {
    if (!isSubmitting && selectedOption !== value) {
      handleOptionChange(value);
    }
  };

  const currentProgress =
    quizQuestions.length > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  const answeredQuestions = currentQuestionIndex;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <QuizOutlined className="text-6xl text-gray-300 mb-4" />
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!loading && quizQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <QuizOutlined className="text-6xl text-gray-300 mb-4" />
        <p className="text-gray-500">Нет доступных вопросов.</p>
      </div>
    );
  }

  if (loading) {
    return <PreloaderTest message="Загружаем вопросы..." />;
  }

  if (isTestFinished) {
    return <PreloaderTest message="Перенаправление на страницу входа..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 safe-area-padding">
      {/* Компактный хедер для мобильных */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto mb-4"
      >
        <QuizHeader
          timeSpent={timeSpent}
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
          currentProgress={currentProgress}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] min-h-[500px]">
        <AnimatePresence mode="wait">
          <QuizSection
            key={currentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            quizQuestions={quizQuestions}
            selectedOption={selectedOption}
            isSubmitting={isSubmitting}
            showHint={showHint}
            onHintToggle={() => setShowHint(!showHint)}
            onOptionSelect={handleOptionSelect}
            onPrevious={handlePreviousQuestion}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuizSection = ({
  currentQuestionIndex,
  totalQuestions,
  quizQuestions,
  selectedOption,
  isSubmitting,
  showHint,
  onHintToggle,
  onOptionSelect,
  onPrevious,
}: {
  currentQuestionIndex: number;
  totalQuestions: number;
  quizQuestions: TransformedQuestion[];
  selectedOption: string | null;
  isSubmitting: boolean;
  showHint: boolean;
  onHintToggle: () => void;
  onOptionSelect: (value: string) => void;
  onPrevious: () => void;
}) => {
  if (quizQuestions.length === 0 || !quizQuestions[currentQuestionIndex]) {
    return null;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <motion.div
      key={`question-${currentQuestionIndex}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      {/* Основной контент с прокруткой */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
        <QuestionCard
          question={currentQuestion.question}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          showHint={showHint}
          onHintToggle={onHintToggle}
        >
          <OptionsList
            options={currentQuestion.options}
            selectedOption={selectedOption}
            isSubmitting={isSubmitting}
            onOptionSelect={onOptionSelect}
          />
        </QuestionCard>
      </div>

      {/* Навигация - фиксированная внизу */}
      <div className="pt-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
        <QuizNavigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          selectedOption={selectedOption}
          isSubmitting={isSubmitting}
          onPrevious={onPrevious}
        />
      </div>
    </motion.div>
  );
};