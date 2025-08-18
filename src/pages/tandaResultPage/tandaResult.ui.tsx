import React, { useState, useEffect } from "react";
import { ResultChart } from "~features/tandaResults";
import { StrongSection } from "~widgets/tandaStrongSection";
import { SalaryInfo } from "~features/tandaSalaryInfo";
import { CardMentor } from "~features/tandaMentor";
import { ScrollTop } from "~shared/lib/react-router/scroll-top";
import { Preloader } from "~shared/ui/preloader";
import { TechStackCard } from "~features/tech-stack";
import { LearningPathCard } from "~features/learning-path";

export const TandaResult: React.FC = () => {
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState({
    Frontend: 0,
    Backend: 0,
    "UX/UI дизайнер": 0,
    "Проектный менеджер": 0,
    "Продуктовый менеджер": 0,
    "Базы данных": 0,
  });

  useEffect(() => {
    // Имитация загрузки данных
    const loadData = async () => {
      try {
        const savedResults = JSON.parse(localStorage.getItem("quizResults"));
        if (savedResults) {
          setResults(savedResults);
          setIsTestCompleted(true);
        }
      } catch (error) {
        console.error("Ошибка загрузки результатов:", error);
      } finally {
        setIsLoading(false); // Убираем прелоадер в любом случае
      }
    };

    const timer = setTimeout(() => {
      loadData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Preloader />
      </div>
    );
  }

  return (
    <div>
      <ScrollTop />
      <ResultChart results={results} />
      <StrongSection results={results} />
      <SalaryInfo />
      <TechStackCard />
      <LearningPathCard />
      <CardMentor />
    </div>
  );
};
