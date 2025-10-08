import { TrendingUp, TrendingDown } from "lucide-react";
import { useProfessionStore } from "~entities/profession";
import { Sparkline } from "./sparkline";
import { cn } from "~app/lib/utils";

export const ProfessionCards = () => {
  const { data, selectedProfessions, actions } = useProfessionStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {data.map((profession) => {
        const latestData = profession.data[profession.data.length - 1];
        const isVisible = selectedProfessions.has(profession.id);

        return (
          <div
            key={profession.id}
            className={cn(
              "bg-white rounded-xl p-4 shadow-sm border-l-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
              isVisible ? "opacity-100" : "opacity-50 hover:opacity-70"
            )}
            style={{ borderLeftColor: profession.color }}
            onClick={() => actions.openModal(profession)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">
                {profession.name}
              </h3>
              <div className="flex items-center gap-2">
                {latestData.growth > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    latestData.growth > 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {latestData.growth > 0 ? "+" : ""}
                  {latestData.growth}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-500 mb-1">Прогноз к 2029</div>
                <div className="text-xl font-bold text-gray-900">
                  {latestData.value} пунктов
                </div>
              </div>
              <Sparkline data={profession.data} color={profession.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
