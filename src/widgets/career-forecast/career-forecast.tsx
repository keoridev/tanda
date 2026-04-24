import { useProfessionStore } from "~entities/profession";
import { ControlPanel } from "~widgets/profession";
import { ProfessionCards } from "./ui/profession-cards";
import { ChartContainer } from "./ui/chart-container";
import { MethodologyInfo } from "./ui/methodology-info";
import { ProfessionModal } from "~entities/profession/profession-modal";
import { Legend } from "./ui/legend";
import { motion } from "framer-motion";

export const CareerForecastDashboard = () => {
  const { modalProfession, isModalOpen, actions } = useProfessionStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Прогноз востребованности профессий
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Интерактивный анализ трендов развития ключевых ИТ-специальностей на
            ближайшие 5 лет
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ControlPanel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Legend />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ProfessionCards />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ChartContainer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <MethodologyInfo />
        </motion.div>

        <ProfessionModal
          profession={modalProfession}
          isOpen={isModalOpen}
          onClose={actions.closeModal}
        />
      </div>
    </div>
  );
};
