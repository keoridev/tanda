import { useProfessionStore } from "~entities/profession";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  viewMode: "absolute" | "growth";
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  viewMode,
}: CustomTooltipProps) => {
  const { data } = useProfessionStore();

  if (active && payload && payload.length) {
    const yearData = data[0]?.data.find(
      (d) => d.year === parseInt(label || "")
    );
    const isForecast = yearData?.type === "forecast";

    return (
      <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xl max-w-sm backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{label} год</p>
            {isForecast && (
              <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 mt-1">
                📊 Прогноз
              </span>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {payload.map((entry) => {
            const profession = data.find((p) => p.id === entry.dataKey);
            return (
              <div
                key={entry.dataKey}
                className="flex items-center justify-between gap-6 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {profession?.name}
                  </span>
                </div>
                <span
                  className="font-bold text-lg"
                  style={{ color: entry.color }}
                >
                  {entry.value}
                  {viewMode === "growth" ? "%" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};
