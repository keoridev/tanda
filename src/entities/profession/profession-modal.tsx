import { X } from "lucide-react";
import { ProfessionData } from "./types";

interface ProfessionModalProps {
  profession: ProfessionData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProfessionModal = ({
  profession,
  isOpen,
  onClose,
}: ProfessionModalProps) => {
  if (!isOpen || !profession) return null;

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {profession.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {profession.description}
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">
                Прогноз роста
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profession.data.map((item) => (
                  <div
                    key={item.year}
                    className="text-center p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {item.growth > 0 ? "+" : ""}
                      {item.growth}%
                    </div>
                    <div className="text-sm text-gray-600">{item.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Источники данных
            </h3>
            <div className="space-y-4">
              {profession.sources.map((source, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="font-medium text-gray-900 text-lg">
                    {source.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Обновлено: {source.date}
                  </div>
                  <div className="text-gray-700">{source.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
