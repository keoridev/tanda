import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Star,
  Award,
  BarChart3,
  PieChart,
  Target,
} from "lucide-react";
import { useResultChart } from "./hook/use-result-chart";
import { Reveal } from "./ui/reveal";
import { ProgressBar } from "./ui/progress-bar";
import { RadarChart } from "./ui/radar-chart";
import { StatsCard } from "./ui/stats-card";
import { ResultChartProps, ChartData } from "~entities/result-chart";

const MobileSkillItem = React.memo(
  ({
    skill,
    index,
    isTop,
    selectedSkill,
    setSelectedSkill,
    totalScore,
    getSkillLevel,
  }: {
    skill: ChartData;
    index: number;
    isTop?: boolean;
    selectedSkill: string | null;
    setSelectedSkill: (skill: string | null) => void;
    totalScore: number;
    getSkillLevel: (value: number) => {
      level: string;
      icon: React.ReactNode;
      color: string;
    };
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
            <div className="flex max-sm:flex-col max-sm:items-start items-center gap-2 mb-1">
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
              {skill.absoluteValue} баллов из {Math.round(totalScore)}{" "}
              <b
                style={{ color: skill.color }}
                className="max-sm:inline hidden"
              >
                / {skill.value}%
              </b>
            </div>
          </div>

          <div className="text-right max-sm:hidden">
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
                  <strong>Процент от общего результата:</strong> {skill.value}%
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
  }
);

export const ResultChart = ({ results }: ResultChartProps) => {
  const [viewMode, setViewMode] = useState<"radar" | "bar">("radar");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const {
    data,
    isEmpty,
    totalScore,
    averageScore,
    isMobile,
    getTopSkill,
    getSkillLevel,
  } = useResultChart(results);

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
    <div className=" max-w-[1200px]">
      <div
        className="relative overflow-hidden rounded-3xl max-w-full shadow-2xl p-8 max-sm:max-w-full"
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
                title={topSkill?.name || "—"}
                value={`${topSkill?.value || 0}%`}
                subtitle="Лучший навык"
                icon={<Star size={20} />}
                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              />
              <StatsCard
                title="Проанализировано"
                value={`${data.length} навыков`}
                subtitle=""
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
                      selectedSkill={selectedSkill}
                      setSelectedSkill={setSelectedSkill}
                      totalScore={totalScore}
                      getSkillLevel={getSkillLevel}
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
