import { Info } from "lucide-react";

export const MethodologyInfo = () => (
  <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
    <div className="flex items-start gap-4">
      <Info className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-blue-900 text-lg mb-2">
          Методология прогнозирования
        </h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          Прогнозы основаны на анализе рыночных трендов, опросах работодателей,
          статистике вакансий и экспертных оценках. Данные агрегированы из
          ведущих исследовательских центров и обновляются ежеквартально.
          Точность прогноза снижается с увеличением временного горизонта. Все
          данные нормализованы относительно базового года для сравнения.
        </p>
      </div>
    </div>
  </div>
);
