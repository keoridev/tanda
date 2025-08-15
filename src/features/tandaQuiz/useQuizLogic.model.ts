import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleOptionChange = (value: string) => {
    if (isSubmitting) return;
    setSelectedOption(value);
  };

  const submitAnswer = () => {
    if (!selectedOption || isSubmitting) return;

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
        return updatedResults;
      });
    }

    setTimeout(() => {
      goToNextQuestion();
      setIsSubmitting(false);
    }, 300);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData[0].questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption("");
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsTestFinished(true);
    localStorage.setItem("quizResults", JSON.stringify(results));
    navigate("/login");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !isSubmitting) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption("");
    }
  };

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
