// features/tandaStrongSides/model/lib/useStrongSides.ts
import { useState, useEffect } from "react";
import { fetchTopProfessions, Profession } from "~shared/lib/api/tandaApi";

export interface SkillWithProfession {
  skill: string;
  score: number;
  professionData: Profession;
}

export const useStrongSides = (results: Record<string, number>) => {
  const [topSkills, setTopSkills] = useState<SkillWithProfession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfessions = async () => {
      const hasResults = Object.values(results).some((score) => score > 0);

      if (!hasResults) {
        setTopSkills([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const professions = await fetchTopProfessions(results);

        const skillsWithProfessions = professions.map((prof) => ({
          skill: prof.skillDisplay,
          score: results[prof.skillDisplay as keyof typeof results] || 0,
          professionData: prof,
        }));

        setTopSkills(skillsWithProfessions);
      } catch (err) {
        console.error("Ошибка загрузки профессий:", err);
        setError("Не удалось загрузить рекомендации");
      } finally {
        setLoading(false);
      }
    };

    loadProfessions();
  }, [results]);

  const recommendedProfessions = topSkills.map(
    (skill) => skill.professionData.profession,
  );

  return { topSkills, recommendedProfessions, loading, error };
};
