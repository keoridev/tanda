import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizLogic } from "~features/tandaQuiz";
import { questionsData } from "~entities/tandaQuestion";
import { AnimatePresence, motion } from "framer-motion";
import { PreloaderTest } from "~shared/ui/preloader";
import { QuizOutlined, StarBorder } from "@mui/icons-material";
import {
  QuizHeader,
  QuestionCard,
  OptionsList,
  QuizNavigation,
} from "~widgets/tandaTestSection";

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
  const [quizQuestions] = useState(questionsData[0].questions);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
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
    if (selectedOption && !isSubmitting) {
      const timer = setTimeout(() => {
        submitAnswer();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [selectedOption, isSubmitting, submitAnswer]);

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

  const currentProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const answeredQuestions = currentQuestionIndex;

  if (!quizQuestions.length)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <QuizOutlined className="text-6xl text-gray-400 mb-4" />
        <p className="text-gray-600">Нет доступных вопросов.</p>
      </div>
    );

  if (loading) {
    return <PreloaderTest />;
  }

  if (isTestFinished) {
    return <PreloaderTest message="Перенаправление на страницу входа..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 safe-area-padding">
      {/* Компактный хедер для мобильных */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
}: any) => (
  <motion.div
    key={`question-${currentQuestionIndex}`}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="h-full flex flex-col"
  >
    {/* Основной контент с прокруткой */}
    <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
      <QuestionCard
        question={quizQuestions[currentQuestionIndex].question}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        showHint={showHint}
        onHintToggle={onHintToggle}
        isCompact={true}
      >
        <OptionsList
          options={quizQuestions[currentQuestionIndex].options}
          selectedOption={selectedOption}
          isSubmitting={isSubmitting}
          onOptionSelect={onOptionSelect}
          isCompact={true}
        />
      </QuestionCard>

      {/* Индикатор оставшихся вопросов - компактный */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200">
          <StarBorder className="text-gray-400 mr-1.5" fontSize="small" />
          <span className="text-xs text-gray-600">
            Осталось: {totalQuestions - currentQuestionIndex - 1}
          </span>
        </div>
      </motion.div>
    </div>

    {/* Навигация - фиксированная внизу */}
    <div className="pt-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
      <QuizNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        selectedOption={selectedOption}
        isSubmitting={isSubmitting}
        onPrevious={onPrevious}
        isCompact={true}
      />
    </div>
  </motion.div>
);