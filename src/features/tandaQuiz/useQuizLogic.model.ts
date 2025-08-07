import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionsData } from "~entities/tandaQuestion";
import { SkillScore } from "~entities/tandaQuestion";
import { pathKeys } from "~shared/lib";

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Обновленный список навыков
  const [results, setResults] = useState<SkillScore>({
    "Визуальное мышление": 0,
    Креативность: 0,
    Логика: 0,
    Аналитика: 0,
    Организация: 0,
    Структурирование: 0,
  });

  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;

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

    if (currentQuestionIndex < questionsData[0].questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsTestFinished(true);
      localStorage.setItem("quizResults", JSON.stringify(results));
      navigate('/login');
    }

    setSelectedOption("");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return {
    currentQuestionIndex,
    selectedOption,
    handleOptionChange,
    handleNextQuestion,
    results,
    isTestFinished,
    handlePreviousQuestion,
  };
};
