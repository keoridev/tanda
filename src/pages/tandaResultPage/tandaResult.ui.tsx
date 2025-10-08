import React, { useState, useEffect } from "react";
import { ResultChart } from "~features/tandaResults";
import { StrongSection } from "~widgets/tandaStrongSection";
import { SalaryInfo } from "~features/tandaSalaryInfo";
import { CardMentor } from "~features/tandaMentor";
import { ScrollTop } from "~shared/lib/react-router/scroll-top";
import { Preloader } from "~shared/ui/preloader";
import { TechStackCard } from "~features/tech-stack";
import { LearningPathCard } from "~features/learning-path";
import { useLocation } from "react-router-dom";
import { CareerForecastDashboard } from "~widgets/career-forecast";
// Импортируем новый компонент
import { ScrollToTopButton } from "~shared/ui/scroll-to-top-button"; // Проверьте путь!

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

  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Проверяем результаты из state навигации
        const resultsFromState = location.state?.quizResults;

        // 2. Проверяем результаты из localStorage
        const savedResults = JSON.parse(
          localStorage.getItem("quizResults") || "null"
        );

        // 3. Приоритет у state, потом у localStorage
        const finalResults = resultsFromState || savedResults;

        if (finalResults) {
          setResults(finalResults);
          setIsTestCompleted(true);

          // Сохраняем в localStorage на будущее
          if (resultsFromState) {
            localStorage.setItem(
              "quizResults",
              JSON.stringify(resultsFromState)
            );
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки результатов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [location.state]);

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
      <CareerForecastDashboard />
      <CardMentor />
      <ScrollToTopButton />
    </div>
  );
};
