// widgets/tandaStrongSection/ui/StrongSection.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, AlertCircle } from "lucide-react";
import { ProfessionCard } from "~features/tandaStrongSides";
import { ResultChartProps } from "~features/tandaResults";
import { fetchTopProfessions, Profession } from "~shared/lib/api/tandaApi";

interface SkillWithProfession {
  skill: string;
  score: number;
  professionData: Profession;
}

const EmptyState: FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-white/80 overflow-hidden relative"
  >
    <div className="absolute top-0 left-0 w-32 h-32 bg-amber-100/30 rounded-full filter blur-3xl -z-10"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100/30 rounded-full filter blur-3xl -z-10"></div>

    <div className="relative z-10">
      <div className="mb-8 flex justify-center">
        <div className="p-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg inline-flex">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      <h3 className="text-3xl font-bold text-gray-800 mb-5 tracking-tight">
        Результаты пока недоступны
      </h3>

      <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
        Пройдите тест, чтобы открыть свои уникальные таланты и найти идеальную
        профессию
      </p>

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="px-8 py-3.5 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Попробовать снова
        </motion.button>
      )}
    </div>
  </motion.div>
);

const getBackgroundColor = (index: number): string => {
  const colors = [
    "bg-[#8dddce]",
    "bg-[#98eff7]",
    "bg-[#e3f1f8]",
    "bg-[#5ce4f4]",
    "bg-[#bce1e1]",
    "bg-[#f7e1b3]",
  ];
  return colors[index % colors.length];
};

export const StrongSection: FC<ResultChartProps> = ({ results }) => {
  const [topSkills, setTopSkills] = useState<SkillWithProfession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfessions = async () => {
      console.log("=== StrongSection загрузка ===");
      console.log("Получены результаты теста:", results);

      const hasResults = Object.values(results).some((score) => score > 0);

      if (!hasResults) {
        console.warn("Нет результатов теста");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Получаем профессии от бэкенда
        const professionsFromBackend = await fetchTopProfessions(results);

        console.log("Профессии от бэкенда:", professionsFromBackend);

        if (!professionsFromBackend || professionsFromBackend.length === 0) {
          console.warn("Бэкенд не вернул профессии");
          setError("Не найдено подходящих профессий");
          setLoading(false);
          return;
        }

        // Детальный лог каждой профессии
        professionsFromBackend.forEach((prof, idx) => {
          console.log(`[${idx}] skillDisplay:`, prof.skillDisplay);
          console.log(`[${idx}] profession:`, prof.profession);
          console.log(`[${idx}] image:`, prof.image);
          console.log(`[${idx}] reason:`, prof.reason?.substring(0, 50));
          console.log(
            `[${idx}] description:`,
            prof.description?.substring(0, 50),
          );
        });

        // Сортируем по баллам
        const sortedProfessions = [...professionsFromBackend].sort((a, b) => {
          const scoreA = results[a.skillDisplay as keyof typeof results] || 0;
          const scoreB = results[b.skillDisplay as keyof typeof results] || 0;
          return scoreB - scoreA;
        });

        const top3Professions = sortedProfessions.slice(0, 3);
        console.log("Топ-3 профессии:", top3Professions);

        const skillsWithProfessions = top3Professions.map((prof) => {
          const score = results[prof.skillDisplay as keyof typeof results] || 0;

          console.log("Обрабатываем profession:", prof);

          return {
            skill: prof.skillDisplay,
            score: score,
            professionData: prof,
          };
        });

        console.log("Итоговые данные:", skillsWithProfessions);
        setTopSkills(skillsWithProfessions);
      } catch (err: any) {
        console.error("Ошибка загрузки профессий:", err);
        setError(
          err.response?.data?.message ||
            "Не удалось загрузить рекомендации профессий",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfessions();
  }, [results]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Анализируем ваши сильные стороны...</p>
        </div>
      </div>
    );
  }

  if (error || topSkills.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[90px]">
      <div className="py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-2 rounded-full mb-5">
            <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-600 font-medium tracking-wide">
              Ваши сильные стороны
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Профессии, которые вам подходят
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            На основе ваших результатов мы подобрали профессии, где вы сможете
            раскрыть свой потенциал
          </p>
        </motion.div>

        <div className="space-y-14">
          <AnimatePresence mode="wait">
            {topSkills.map((item, index) => {
              const maxScore = Math.max(...topSkills.map((s) => s.score));
              const percentScore =
                maxScore > 0 ? Math.round((item.score / maxScore) * 100) : 0;

              return (
                <ProfessionCard
                  key={`${item.skill}-${index}`}
                  data={{
                    testLink: "",
                    professions: [item.professionData.profession],
                    groups: [],
                    image: item.professionData.image,
                    backgroundColor: getBackgroundColor(index),
                    reason: item.professionData.reason,
                    description: item.professionData.description,
                  }}
                  score={percentScore}
                  index={index}
                  skill={item.skill}
                />
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border border-gray-200/80">
            <Trophy className="w-6 h-6 text-amber-500 mr-3" />
            <span className="text-gray-700 font-medium">
              Мы нашли {topSkills.length} перспективных направлений для вас
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
