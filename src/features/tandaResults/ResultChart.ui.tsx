import React, { useMemo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Star,
  Award,
  BarChart3,
  Eye,
  Brain,
  Settings,
  PieChart,
  Zap,
  Target,
} from "lucide-react";

interface ResultChartProps {
  results: {
    [key: string]: number;
  };
}

interface ChartData {
  name: string;
  value: number;
  absoluteValue: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const SKILL_COLORS = [
  {
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
  },
  {
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
  },
  {
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
  },
  {
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  },
  {
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  },
  {
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
  },
];

const SKILLS_MAP = [
  { name: "Визуальное мышление", icon: <Eye size={20} /> },
  { name: "Креативность", icon: <Zap size={20} /> },
  { name: "Логика", icon: <Brain size={20} /> },
  { name: "Аналитика", icon: <BarChart3 size={20} /> },
  { name: "Организация", icon: <Settings size={20} /> },
  { name: "Структурирование", icon: <Target size={20} /> },
];

const Reveal = ({
  children,
  from = "bottom",
  delay = 0,
}: {
  children: React.ReactNode;
  from?: string;
  delay?: number;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: from === "bottom" ? 50 : from === "top" ? -50 : 0,
      x: from === "left" ? -50 : from === "right" ? 50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const ProgressBar = ({
  value,
  gradient,
  className = "",
}: {
  value: number;
  gradient: string;
  className?: string;
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, delay: 0.5 }}
      className="h-full rounded-full"
      style={{ background: gradient }}
    />
  </div>
);

const RadarChart = ({ data }: { data: ChartData[] }) => {
  const size = 300;
  const center = size / 2;
  const radius = center - 50;
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (angle: number, value: number) => {
    const adjustedRadius = (radius * value) / 100;
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
            strokeWidth="1"
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
              strokeWidth="1"
            />
          );
        })}

        {/* Data area */}
        <motion.path
          d={pathString}
          fill="rgba(13, 148, 136, 0.2)"
          stroke="#0D9488"
          strokeWidth="3"
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
              className="text-sm font-medium fill-gray-700"
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

export const ResultChart = ({ results }: ResultChartProps) => {
  const [viewMode, setViewMode] = useState<"radar" | "bar">("radar");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isEmpty, totalScore, averageScore } = useMemo(() => {
    const rawData: ChartData[] = SKILLS_MAP.map((skill, index) => ({
      name: skill.name,
      absoluteValue: results[skill.name] || 0,
      value: 0,
      icon: skill.icon,
      color: SKILL_COLORS[index % SKILL_COLORS.length].color,
      gradient: SKILL_COLORS[index % SKILL_COLORS.length].gradient,
    })).filter((item) => item.absoluteValue > 0);

    const total = rawData.reduce((acc, item) => acc + item.absoluteValue, 0);
    const average = total / rawData.length;

    const calculatedData = rawData
      .map((item) => ({
        ...item,
        value: total > 0 ? Math.round((item.absoluteValue / total) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return {
      data: calculatedData,
      isEmpty: calculatedData.length === 0,
      totalScore: total,
      averageScore: Math.round(average),
    };
  }, [results]);

  const getTopSkill = () => data[0];

  const getSkillLevel = (value: number) => {
    if (value >= 25)
      return {
        level: "Экспертный",
        icon: <Award size={16} />,
        color: "#10B981",
      };
    if (value >= 15)
      return {
        level: "Продвинутый",
        icon: <Star size={16} />,
        color: "#0D9488",
      };
    if (value >= 10)
      return {
        level: "Средний",
        icon: <TrendingUp size={16} />,
        color: "#F59E0B",
      };
    return { level: "Базовый", icon: <Target size={16} />, color: "#6B7280" };
  };

  const StatsCard = ({
    title,
    value,
    subtitle,
    icon,
    gradient,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-90 mb-1">{title}</div>
        <div className="text-xs opacity-75">{subtitle}</div>
      </div>
    </motion.div>
  );

  const MobileSkillItem = useCallback(
    ({
      skill,
      index,
      isTop,
    }: {
      skill: ChartData;
      index: number;
      isTop?: boolean;
    }) => {
      const skillLevel = getSkillLevel(skill.value);

      return (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 cursor-pointer
            bg-white shadow-lg border border-gray-100 hover:shadow-xl
            ${
              isTop
                ? "ring-2 ring-emerald-200 bg-gradient-to-r from-emerald-50 to-white"
                : ""
            }
            ${selectedSkill === skill.name ? "ring-2 ring-blue-300" : ""}`}
          onClick={() =>
            setSelectedSkill(selectedSkill === skill.name ? null : skill.name)
          }
        >
          {isTop && (
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
              ТОП
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div
              className="p-3 rounded-xl text-white shadow-lg"
              style={{ background: skill.gradient }}
            >
              {skill.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: skillLevel.color }}
                >
                  {skillLevel.icon}
                  {skillLevel.level}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {skill.absoluteValue} баллов из {Math.round(totalScore)}
              </div>
            </div>

            <div className="text-right">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: skill.color }}
              >
                {skill.value}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <ProgressBar
              value={Math.min(skill.value * 2, 100)}
              gradient={skill.gradient}
              className="h-2"
            />
          </div>

          <AnimatePresence>
            {selectedSkill === skill.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Процент от общего результата:</strong> {skill.value}
                    %
                  </p>
                  <p className="mb-2">
                    <strong>Абсолютный результат:</strong> {skill.absoluteValue}{" "}
                    баллов
                  </p>
                  <p>
                    <strong>Уровень развития:</strong> {skillLevel.level}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    },
    [selectedSkill, totalScore]
  );

  if (isEmpty) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-12 rounded-2xl bg-gray-50">
          <PieChart className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Недостаточно данных
          </h3>
          <p className="text-gray-500">
            Пройдите тест, чтобы увидеть ваши результаты
          </p>
        </div>
      </div>
    );
  }

  const topSkill = getTopSkill();

  return (
    <div className="mx-auto px-4 max-w-[1200px]">
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl p-8 max-md:p-6"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-24 -translate-x-24" />

        <div className="relative z-10">
          <Reveal from="top" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl max-md:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white">
                    <Award size={24} />
                  </div>
                  Ваши результаты
                </h2>
                <p className="text-gray-600">
                  Детальный анализ ваших навыков и компетенций
                </p>
              </div>

              {!isMobile && (
                <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("radar")}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      viewMode === "radar"
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Target size={16} />
                    Радар
                  </button>
                  <button
                    onClick={() => setViewMode("bar")}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      viewMode === "bar"
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <BarChart3 size={16} />
                    График
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          {/* Stats Cards */}
          <Reveal from="left" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Общий балл"
                value={totalScore}
                subtitle="Сумма всех навыков"
                icon={<Award size={20} />}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
              <StatsCard
                title="Средний балл"
                value={averageScore}
                subtitle="По всем категориям"
                icon={<BarChart3 size={20} />}
                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              />
              <StatsCard
                title="Лучший навык"
                value={`${topSkill?.value || 0}%`}
                subtitle={topSkill?.name || "—"}
                icon={<Star size={20} />}
                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              />
              <StatsCard
                title="Всего навыков"
                value={data.length}
                subtitle="Проанализировано"
                icon={<TrendingUp size={20} />}
                gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              />
            </div>
          </Reveal>

          {isMobile || viewMode === "bar" ? (
            <div className="space-y-6">
              <Reveal from="right" delay={0.4}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart3 size={20} />
                    Детализация по навыкам
                  </h3>
                  {data.map((skill, index) => (
                    <MobileSkillItem
                      key={skill.name}
                      skill={skill}
                      index={index}
                      isTop={index === 0}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          ) : (
            <Reveal from="bottom" delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <RadarChart data={data} />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};

const demoResults = {
  "Визуальное мышление": 15,
  Креативность: 22,
  Логика: 18,
  Аналитика: 12,
  Организация: 25,
  Структурирование: 8,
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ResultChart results={demoResults} />
    </div>
  );
}
