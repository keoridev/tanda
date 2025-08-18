import { ResultChartProps } from "~features/tandaResults";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStrongSides } from "~features/tandaStrongSides/model/lib/useStrongSides";
import { skillToProfessions } from "~features/tandaStrongSides/model/StrongSideData";
import { Sparkles, Trophy } from "lucide-react";
import { Warning } from "@mui/icons-material";
import { ProfessionCard } from "~features/tandaStrongSides";

const glowVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 0.4, scale: 1 },
  hover: { opacity: 0.6, scale: 1.05 },
};
const EmptyState: FC = () => (
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
          <Warning className="w-10 h-10 text-white" />
        </div>
      </div>

      <h3 className="text-3xl font-bold text-gray-800 mb-5 tracking-tight">
        Результаты пока недоступны
      </h3>

      <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
        Пройдите тест, чтобы открыть свои уникальные таланты и найти идеальную
        профессию
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3.5 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        Пройти тест
      </motion.button>
    </div>
  </motion.div>
);

export const StrongSection: FC<ResultChartProps> = ({ results }) => {
  const { topSkills } = useStrongSides(results);

  if (!results || topSkills.length === 0) {
    return (
      <div className=" mx-auto px-4 py-12">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-[90px]  ">
      <div className="   py-16">
        {/* Header */}
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

        {/* Skills Cards */}
        <div className="space-y-14">
          <AnimatePresence mode="wait">
            {topSkills.map((item, index) => {
              const data = skillToProfessions[item.skill];
              if (!data) return null;

              return (
                <ProfessionCard
                  key={`${item.skill}-${index}`}
                  data={data}
                  score={item.score}
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
              Вы нашли {topSkills.length} перспективных направления
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
