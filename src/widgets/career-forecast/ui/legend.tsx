import { useProfessionStore } from "~entities/profession";

export const Legend = () => {
  const { data, selectedProfessions, actions } = useProfessionStore();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
      <div className="flex flex-wrap gap-4">
        {data.map((profession) => {
          const isSelected = selectedProfessions.has(profession.id);
          return (
            <label
              key={profession.id}
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 
                ${
                  isSelected
                    ? "bg-blue-50 border-blue-200 shadow-md transform scale-105"
                    : "bg-gray-50 border-transparent hover:bg-gray-100 hover:border-gray-200"
                }
                group
              `}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => actions.toggleProfession(profession.id)}
                  className="w-5 h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-colors"
                />
              </div>
              <div
                className={`
                  w-5 h-5 rounded-full border-2 border-white shadow-sm transition-transform 
                  ${isSelected ? "scale-110" : "group-hover:scale-105"}
                `}
                style={{ backgroundColor: profession.color }}
              />
              <span
                className={`
                  text-sm font-medium transition-colors select-none
                  ${
                    isSelected
                      ? "text-gray-900"
                      : "text-gray-600 group-hover:text-gray-800"
                  }
                `}
              >
                {profession.name}
              </span>
            </label>
          );
        })}
      </div>

      {/* Дополнительная информация */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Выберите профессии для отображения на графике
        </p>
      </div>
    </div>
  );
};
