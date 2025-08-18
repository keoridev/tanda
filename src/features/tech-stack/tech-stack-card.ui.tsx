import { useState } from "react";
import { motion } from "framer-motion";
import { techStacks } from "~entities/tech-stack";
export const TechStackCard = () => {
  const [selectedProfession, setSelectedProfession] = useState(
    techStacks[0].profession
  );

  const selectedStack =
    techStacks.find((stack) => stack.profession === selectedProfession) ||
    techStacks[0];

  return (
    <section
      className="py-16 my-6 bg-gradient-to-br  rounded-3xl "
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Инструменты и технологии
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Стек технологий для разных IT-профессий
          </p>
        </div>

        {/* Profession Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {techStacks.map((stack) => (
            <button
              key={stack.profession}
              onClick={() => setSelectedProfession(stack.profession)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedProfession === stack.profession
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {stack.profession}
            </button>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          key={selectedProfession}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {selectedStack.stack.map((tech) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={tech.id}
              className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 mb-3 flex items-center justify-center text-4xl">
                {tech.icon}
              </div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                {tech.name}
              </h3>

              {/* Importance indicator */}
              <div className="w-full mt-auto">
                <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.importance}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${
                      tech.category === "frontend"
                        ? "bg-blue-500"
                        : tech.category === "backend"
                        ? "bg-green-500"
                        : tech.category === "design"
                        ? "bg-purple-500"
                        : tech.category === "management"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {tech.importance}% важности
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Frontend
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Backend
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Дизайн
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Менеджмент
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Базы данных
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
