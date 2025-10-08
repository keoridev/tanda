import { motion } from "framer-motion";
import React from "react";
import { ChartData } from "~entities/result-chart";

interface RadarChartProps {
  data: ChartData[];
}

export const RadarChart = ({ data }: RadarChartProps) => {
  const size = 400;
  const center = size / 2;
  const radius = center - 50;
  const angleStep = (2 * Math.PI) / data.length;

  const scaleValue = (value: number) => {
    const scaleFactor = 2;
    return Math.min(100, value * scaleFactor);
  };

  const getPoint = (angle: number, value: number) => {
    const scaledValue = scaleValue(value);
    const adjustedRadius = (radius * scaledValue) / 100;
    return {
      x: center + adjustedRadius * Math.cos(angle - Math.PI / 2),
      y: center + adjustedRadius * Math.sin(angle - Math.PI / 2),
    };
  };

  const pathData = data.map((item, index) => {
    const angle = index * angleStep;
    return getPoint(angle, item.value);
  });

  const pathString =
    pathData
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ") + " Z";

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(radius * percent) / 100}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            
          />
        ))}

        {/* Grid lines */}
        {data.map((_, index) => {
          const angle = index * angleStep;
          const endPoint = getPoint(angle, 100);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#e5e7eb"
              strokeWidth="2"
            />
          );
        })}

        {/* Data area */}
        <motion.path
          d={pathString}
          fill="rgba(13, 148, 136, 0.2)"
          stroke="#0D9488"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Data points */}
        {pathData.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#0D9488"
            stroke="#fff"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
          
        ))}

        {/* Labels */}
        {data.map((item, index) => {
          const angle = index * angleStep;
          const labelPoint = getPoint(angle, 120);
          return (
            <text
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium  fill-gray-700"
              style={{ fontSize: "12px" }}
            >
              <tspan x={labelPoint.x} dy="0">
                {item.name.split(" ")[0]}
              </tspan>
              <tspan x={labelPoint.x} dy="12">
                {item.name.split(" ").slice(1).join(" ")}
              </tspan>
              <tspan
                x={labelPoint.x}
                dy="12"
                className="text-xs font-bold fill-emerald-600"
              >
                {item.value}%
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
};
