import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { useProfessionStore } from "~entities/profession";
import { CustomTooltip } from "./custom-tooltip";

export const  ChartContainer = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    data,
    selectedProfessions,
    viewMode,
    chartType,
    timeRange,
    pinnedProfession,
    actions,
  } = useProfessionStore();

  // Фильтруем данные по выбранному периоду
  const filteredData = data.map((profession) => ({
    ...profession,
    data: profession.data.filter((item) => {
      if (timeRange === "historical") return item.type === "historical";
      if (timeRange === "forecast") return item.type === "forecast";
      return true; // 'all' - все данные
    }),
  }));

  const chartData = filteredData[0]?.data.map((yearData) => {
    const point: any = { year: yearData.year, type: yearData.type };
    filteredData.forEach((profession) => {
      const profData = profession.data.find((d) => d.year === yearData.year);
      if (profData) {
        point[profession.id] =
          viewMode === "absolute" ? profData.value : profData.growth;
      }
    });
    return point;
  });

  const visibleProfessions = filteredData.filter((p) =>
    selectedProfessions.has(p.id)
  );

  // Функция для отрисовки разделительной линии между историей и прогнозом
  const renderForecastLine = () => {
    if (timeRange !== "all") return null;

    return (
      <line
        x1={((2025 - 2015) / (2029 - 2015)) * 100 + "%"}
        x2={((2025 - 2015) / (2029 - 2015)) * 100 + "%"}
        y1="0%"
        y2="100%"
        stroke="#ef4444"
        strokeWidth={2}
        strokeDasharray="4 4"
        opacity={0.7}
      />
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="2 2"
              className="opacity-20"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: viewMode === "growth" ? "Рост (%)" : "Индекс",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 13 },
              }}
            />
            <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
            {renderForecastLine()}

            {visibleProfessions.map((profession) => (
              <Line
                key={profession.id}
                type="monotone"
                dataKey={profession.id}
                stroke={profession.color}
                strokeWidth={pinnedProfession === profession.id ? 4 : 2.5}
                strokeDasharray={
                  profession.data[0]?.type === "forecast" ? "6 6" : "0"
                }
                dot={{
                  r: pinnedProfession === profession.id ? 5 : 4,
                  fill: profession.color,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 7,
                  fill: profession.color,
                  stroke: "#fff",
                  strokeWidth: 3,
                  onClick: () =>
                    actions.setPinnedProfession(
                      pinnedProfession === profession.id ? null : profession.id
                    ),
                }}
              />
            ))}
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={chartData}>
            <CartesianGrid
              strokeDasharray="2 2"
              className="opacity-20"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
            {renderForecastLine()}

            {visibleProfessions.map((profession) => (
              <Area
                key={profession.id}
                type="monotone"
                dataKey={profession.id}
                stroke={profession.color}
                fill={profession.color}
                fillOpacity={pinnedProfession === profession.id ? 0.15 : 0.08}
                strokeWidth={pinnedProfession === profession.id ? 3 : 2}
                strokeDasharray={
                  profession.data[0]?.type === "forecast" ? "6 6" : "0"
                }
              />
            ))}
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart data={chartData} barGap={2}>
            <CartesianGrid
              strokeDasharray="2 2"
              className="opacity-20"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
            {renderForecastLine()}

            {visibleProfessions.map((profession) => (
              <Bar
                key={profession.id}
                dataKey={profession.id}
                fill={profession.color}
                fillOpacity={pinnedProfession === profession.id ? 0.9 : 0.7}
                radius={[2, 2, 0, 0]}
                onClick={() =>
                  actions.setPinnedProfession(
                    pinnedProfession === profession.id ? null : profession.id
                  )
                }
              />
            ))}
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      ref={chartRef}
    >
      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Улучшенная легенда с пояснениями */}
      <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <div className="w-6 h-0.5 bg-gray-500 rounded-full"></div>
          <span className="font-medium">Исторические данные</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-0.5 bg-gray-500 rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent, transparent 3px, currentColor 3px, currentColor 6px)",
            }}
          ></div>
          <span className="font-medium">Прогноз</span>
        </div>
        {timeRange === "all" && (
          <div className="flex items-center gap-3 text-red-500">
            <div className="w-6 h-0.5 bg-red-500 rounded-full"></div>
            <span className="font-medium">Текущий год</span>
          </div>
        )}
      </div>
    </div>
  );
};
