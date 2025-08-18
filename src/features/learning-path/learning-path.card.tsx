import { useState } from "react";
import { motion } from "framer-motion";
import { learningPaths } from "~entities/learning-path";
import { FiExternalLink } from "react-icons/fi";

export const LearningPathCard = () => {
  const [selectedProfession, setSelectedProfession] = useState(
    learningPaths[0].profession
  );
  const selectedPath =
    learningPaths.find((path) => path.profession === selectedProfession) ||
    learningPaths[0];

  return (
    <section className="   ">
      <div className="container mx-auto py-16 rounded-3xl my-6 px-4  bg-white dark:bg-gray-900 max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Дорожная карта обучения 2025
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Актуальный путь освоения профессии с нуля до трудоустройства
          </p>
        </div>

        {/* Profession Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {learningPaths.map((path) => (
            <button
              key={path.profession}
              onClick={() => setSelectedProfession(path.profession)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedProfession === path.profession
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {path.profession}
            </button>
          ))}
        </div>

        {/* Learning Path Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />

          {selectedPath.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative pl-10 md:pl-0 pb-12 ${
                index === selectedPath.steps.length - 1 ? "pb-0" : ""
              }`}
            >
              {/* Circle indicator */}
              <div
                className={`absolute top-0 left-4 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 z-10 ${
                  index % 3 === 0
                    ? "bg-blue-500"
                    : index % 3 === 1
                    ? "bg-green-500"
                    : "bg-purple-500"
                }`}
              />

              {/* Content card - чередование для десктопа */}
              <div
                className={`md:max-w-[50%] ${
                  index % 2 === 0
                    ? "md:ml-auto md:mr-0 md:pl-8" // Четные - справа
                    : "md:mr-auto md:ml-0 md:pr-8" // Нечетные - слева
                }`}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {step.title}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Осваиваемые навыки:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Ресурсы:
                      </h4>
                      <ul className="space-y-2">
                        {step.resources.map((resource) => (
                          <li key={resource.url}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              {resource.name}
                              <FiExternalLink className="ml-1" size={14} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
