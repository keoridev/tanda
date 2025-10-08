import { useProfessionStore } from "~entities/profession";
import { ControlPanel } from "~widgets/profession";
import { ProfessionCards } from "./ui/profession-cards";
import { ChartContainer } from "./ui/chart-container";
import { MethodologyInfo } from "./ui/methodology-info";
import { ProfessionModal } from "~entities/profession/profession-modal";
import { Legend } from "./ui/legend";

export const CareerForecastDashboard = () => {
  const { modalProfession, isModalOpen, actions } = useProfessionStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Прогноз востребованности профессий
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Интерактивный анализ трендов развития ключевых ИТ-специальностей на
            ближайшие 5 лет
          </p>
        </div>

        <ControlPanel />
        <Legend />
        <ProfessionCards />
        <ChartContainer />
        <MethodologyInfo />

        <ProfessionModal
          profession={modalProfession}
          isOpen={isModalOpen}
          onClose={actions.closeModal}
        />
      </div>
    </div>
  );
};
