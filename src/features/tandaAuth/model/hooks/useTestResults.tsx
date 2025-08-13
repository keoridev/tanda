import { useState, useEffect } from "react";

export const useTestResults = () => {
  const [results, setResults] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  return { data: results };
};
