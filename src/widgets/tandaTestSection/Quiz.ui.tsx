import { useEffect, useState } from "react";
import { QuestionCard } from "~entities/tandaQuestion";
import { useQuizLogic } from "~features/tandaQuiz";
import { questionsData } from "~entities/tandaQuestion";
import { ResultChart } from "~features/tandaResults";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "~shared/ui/preloader";
export const Quiz = () => {
  const {
    currentQuestionIndex,
    selectedOption,
    handleOptionChange,
    submitAnswer,
    results,
    isTestFinished,
    isSubmitting,
    handlePreviousQuestion,
    totalQuestions,
  } = useQuizLogic();

  const [loading, setLoading] = useState(true);
  const [quizQuestions] = useState(questionsData[0].questions);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!quizQuestions.length)
    return (
      <div className="flex items-center justify-center h-screen">
        Нет доступных вопросов.
      </div>
    );

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="xl:w-3xl lg:w-2xl mx-auto ">
        <AnimatePresence mode="wait">
          {isTestFinished ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ResultChart results={results} />
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={quizQuestions[currentQuestionIndex]}
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
                onSubmit={submitAnswer}
                onPreviousQuestion={handlePreviousQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
