// pages/tandaResultPage/tandaResult.ui.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ResultChart } from "~features/tandaResults";
import { StrongSection } from "~widgets/tandaStrongSection";
import { SalaryInfo } from "~features/tandaSalaryInfo";
import { CardMentor } from "~features/tandaMentor";
import { ScrollTop } from "~shared/lib/react-router/scroll-top";
import { Preloader } from "~shared/ui/preloader";
import { TechStackCard } from "~features/tech-stack";
import { LearningPathCard } from "~features/learning-path";
import { CareerForecastDashboard } from "~widgets/career-forecast";
import { ScrollToTopButton } from "~shared/ui/scroll-to-top-button";

export const TandaResult: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState({
    "Визуальное мышление": 0,
    "Креативность": 0,
    "Логика": 0,
    "Аналитика": 0,
    "Организация": 0,
    "Структурирование": 0,
  });

  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const resultsFromState = location.state?.quizResults;
        const savedResults = JSON.parse(
          localStorage.getItem("quizResults") || "null"
        );

        const finalResults = resultsFromState || savedResults;

        if (finalResults) {
          const validatedResults = { ...results };
          Object.keys(finalResults).forEach(key => {
            if (key in validatedResults) {
              validatedResults[key as keyof typeof validatedResults] = finalResults[key];
            }
          });
          setResults(validatedResults);

          if (resultsFromState) {
            localStorage.setItem("quizResults", JSON.stringify(validatedResults));
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