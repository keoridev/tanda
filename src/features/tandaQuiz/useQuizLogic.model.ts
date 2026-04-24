import { ApiQuestion, fetchQuestions } from "~shared/lib/api/tandaApi";
import { TransformedQuestion } from "./../../entities/tandaQuestion/question.types";
import { useState, useEffect, useCallback } from "react";

// Функция трансформации API вопросов в формат TransformedQuestion
const transformApiQuestions = (
  apiQuestions: ApiQuestion[],
): TransformedQuestion[] => {
  return apiQuestions.map((q, idx) => ({
    id: idx + 1,
    question: q.text,
    options: q.options.map((opt) => ({
      value: opt.value,
      text: opt.text,
      skills: {
        "Визуальное мышление": opt.skill1,
        Креативность: opt.skill2,
        Логика: opt.skill3,
        Аналитика: opt.skill4,
        Организация: opt.skill5,
        Структурирование: opt.skill6,
      },
    })),
  }));
};

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<TransformedQuestion[]>([]);

  const [results, setResults] = useState({
    "Визуальное мышление": 0,
    Креативность: 0,
    Логика: 0,
    Аналитика: 0,
    Организация: 0,
    Структурирование: 0,
  });

  // Загрузка вопросов из API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiQuestions = await fetchQuestions();
        const transformed = transformApiQuestions(apiQuestions);
        setQuizQuestions(transformed);
      } catch (err) {
        console.error("Ошибка загрузки вопросов:", err);
        setError(
          "Не удалось загрузить вопросы. Пожалуйста, обновите страницу.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleOptionChange = useCallback(
    (value: string) => {
      if (isSubmitting) return;
      setSelectedOption(value);
    },
    [isSubmitting],
  );

  const submitAnswer = useCallback(() => {
    if (!selectedOption || isSubmitting || quizQuestions.length === 0) return;

    setIsSubmitting(true);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedOptionData = currentQuestion.options.find(
      (option) => option.value === selectedOption,
    );

    if (selectedOptionData) {
      setResults((prevResults) => {
        const updatedResults = { ...prevResults };
        Object.entries(selectedOptionData.skills).forEach(([skill, score]) => {
          updatedResults[skill as keyof typeof updatedResults] += score;
        });
        return updatedResults;
      });
    }

    setTimeout(() => {
      goToNextQuestion();
      setIsSubmitting(false);
    }, 800);
  }, [selectedOption, isSubmitting, currentQuestionIndex, quizQuestions]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      finishTest();
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  const finishTest = useCallback(() => {
    // Сохраняем результаты в localStorage
    localStorage.setItem("quizResults", JSON.stringify(results));
    setIsTestFinished(true);
  }, [results]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0 && !isSubmitting) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(null);
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
    totalQuestions: quizQuestions.length,
    loading,
    error,
    quizQuestions,
  };
};
