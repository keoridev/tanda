import { useState, useCallback } from "react";
import { questionsData } from "~entities/tandaQuestion";

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [results, setResults] = useState({
    "Визуальное мышление": 0,
    Креативность: 0,
    Логика: 0,
    Аналитика: 0,
    Организация: 0,
    Структурирование: 0,
  });

  const [isTestFinished, setIsTestFinished] = useState(false);

  const handleOptionChange = useCallback(
    (value: string) => {
      if (isSubmitting) return;
      setSelectedOption(value);
    },
    [isSubmitting]
  );

  const submitAnswer = useCallback(() => {
    if (!selectedOption || isSubmitting) return;

    console.log("Submitting answer:", selectedOption); // Для отладки
    setIsSubmitting(true);

    const currentQuestion = questionsData[0].questions[currentQuestionIndex];
    const selectedOptionData = currentQuestion.options.find(
      (option) => option.value === selectedOption
    );

    if (selectedOptionData) {
      setResults((prevResults) => {
        const updatedResults = { ...prevResults };
        Object.entries(selectedOptionData.skills).forEach(([skill, score]) => {
          updatedResults[skill] = (updatedResults[skill] || 0) + score;
        });
        console.log("Updated results:", updatedResults); // Для отладки
        return updatedResults;
      });
    }

    setTimeout(() => {
      goToNextQuestion();
      setIsSubmitting(false);
    }, 300);
  }, [selectedOption, isSubmitting, currentQuestionIndex]);

  const goToNextQuestion = useCallback(() => {
    console.log("Current question index:", currentQuestionIndex); // Для отладки
    console.log("Total questions:", questionsData[0].questions.length); // Для отладки

    if (currentQuestionIndex < questionsData[0].questions.length - 1) {
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev + 1;
        console.log("Moving to question:", newIndex); // Для отладки
        return newIndex;
      });
      setSelectedOption("");
    } else {
      console.log("Finishing test"); // Для отладки
      finishTest();
    }
  }, [currentQuestionIndex]);

  const finishTest = useCallback(() => {
    setIsTestFinished(true);

    // СОХРАНЯЕМ РЕЗУЛЬТАТЫ В LOCALSTORAGE
    localStorage.setItem("quizResults", JSON.stringify(results));

    console.log("Test finished with results:", results);
  }, [results]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0 && !isSubmitting) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption("");
    }
  }, [currentQuestionIndex, isSubmitting]);

  return {
    currentQuestionIndex,
    selectedOption,
    handleOptionChange,
    submitAnswer,
    results,
    isTestFinished,
    isSubmitting,
    handlePreviousQuestion,
    totalQuestions: questionsData[0].questions.length,
  };
};
