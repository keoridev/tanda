import { TrendingUp, TrendingDown } from "lucide-react";
import { useProfessionStore } from "~entities/profession";
import { Sparkline } from "./sparkline";
import { cn } from "~app/lib/utils";
import { motion } from "framer-motion";

export const ProfessionCards = () => {
  const { data, selectedProfessions, actions } = useProfessionStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {data.map((profession, index) => {
        const latestData = profession.data[profession.data.length - 1];
        const isVisible = selectedProfessions.has(profession.id);

        return (
          <motion.div
            key={profession.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "bg-white rounded-2xl p-6 shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4",
              isVisible ? "opacity-100 border-l-[#0c7d70]" : "opacity-60 hover:opacity-80 border-l-gray-300"
            )}
            style={{ borderLeftColor: isVisible ? '#0c7d70' : profession.color }}
            onClick={() => actions.openModal(profession)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                {profession.name}
              </h3>
              <div className="flex items-center gap-2">
                {latestData.growth > 0 ? (
                  <TrendingUp className="w-5 h-5 text-[#0c7d70]" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-bold",
                    latestData.growth > 0 ? "text-[#0c7d70]" : "text-red-600"
                  )}
                >
                  {latestData.growth > 0 ? "+" : ""}
                  {latestData.growth}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-500 mb-2 font-medium">Прогноз к 2029</div>
                <div className="text-2xl font-bold text-gray-900">
                  {latestData.value} <span className="text-sm text-gray-600">пунктов</span>
                </div>
              </div>
              <div className="ml-4">
                <Sparkline data={profession.data} color={isVisible ? '#0c7d70' : profession.color} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
