import { FC, useMemo, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { LinearProgress, Box, useMediaQuery, Theme } from "@mui/material";
import { motion } from "framer-motion";
import { cn } from "~app/lib/utils";
import { Reveal } from "~shared/lib/framer";

export interface ResultChartProps {
  results: {
    [key: string]: number;
  };
}

interface ChartData {
  name: string;
  value: number;
  absoluteValue: number; // Добавляем абсолютное значение
}

const CHART_COLORS = {
  primary: "#0D9488",
  progress: "#0D9488",
  background: "#0D9488",
  text: "#0D9488",
};

const SKILLS_MAP = [
  "Визуальное мышление",
  "Креативность",
  "Логика",
  "Аналитика",
  "Организация",
  "Структурирование",
];

export const ResultChart: FC<ResultChartProps> = ({ results }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  const { data, isEmpty, totalScore } = useMemo(() => {
    const rawData: ChartData[] = SKILLS_MAP.map((name) => ({
      name: name.replace(/ и /g, " и\n"),
      absoluteValue: results[name] || 0,
      value: 0, // Пока 0, рассчитаем ниже
    })).filter((item) => item.absoluteValue > 0);

    const total = rawData.reduce((acc, item) => acc + item.absoluteValue, 0);

    // Рассчитываем проценты, чтобы сумма была 100%
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
    };
  }, [results]);

  const getChartOption = useCallback(
    (showLabels: boolean) => ({
      tooltip: {
        trigger: "item" as const,
        formatter: (params: any) => {
          const dataItem = data.find((item) => item.name === params.name);
          return `${params.name}: ${dataItem?.value}% (${dataItem?.absoluteValue} баллов)`;
        },
        backgroundColor: "#0D9488",
        textStyle: { color: "#fff" },
      },
      radar: {
        indicator: data.map((item) => ({
          name: showLabels ? `${item.name} (${item.value}%)` : `${item.value}%`,
          max: 49, // Фиксированный максимум 100%
        })),
        radius: isMobile ? "65%" : "75%",
        shape: "polygon" as const,
        axisLine: { lineStyle: { color: "#000", width: 1 } },
        splitLine: { lineStyle: { color: "#000", width: 1 } },
        axisName: {
          color: "#000",
          fontSize: showLabels ? 14 : 12,
          fontFamily: "Roboto, sans-serif",
          backgroundColor: showLabels
            ? "rgba(255, 255, 255, 0.6)"
            : "transparent",
          borderRadius: 3,
          padding: [2, 2] as [number, number],
        },
        splitArea: {
          show: false,
        },
      },
      series: [
        {
          type: "radar" as const,
          data: [
            {
              value: data.map((item) => item.value),
              name: "Ваши результаты",
              areaStyle: { color: CHART_COLORS.progress, opacity: 0.5 },
              lineStyle: { color: CHART_COLORS.progress, width: 2 },
              itemStyle: { color: CHART_COLORS.progress },
            },
          ],
        },
      ],
    }),
    [data, isMobile]
  );

  const MobileSkillItem = useCallback(
    ({ skill, index }: { skill: ChartData; index: number }) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "flex items-center gap-4 p-3 rounded-xl",
          "bg-[#E0E0E0] transition-colors"
        )}
      >
        <Box
          className={cn(
            "bg-[#0D9488] text-white px-3.5 py-2",
            "rounded-full font-semibold min-w-[108px] text-center"
          )}
        >
          {skill.value}%
        </Box>

        <Box className="flex-1">
          <p className="text-[#2C2C2C] font-medium mb-1 text-base">
            {skill.name.replace(/\n/g, " ")}
            <span className="text-sm text-gray-500 ml-2">
              ({skill.absoluteValue} баллов)
            </span>
          </p>
          <LinearProgress
            variant="determinate"
            value={skill.value}
            sx={{
              height: 8,
              borderRadius: 4,
              background: "white",
              ".MuiLinearProgress-bar": {
                backgroundColor: CHART_COLORS.progress,
              },
            }}
          />
        </Box>
      </motion.div>
    ),
    []
  );

  if (isEmpty) {
    return (
      <div className="text-center p-8 text-gray-500">
        Недостаточно данных для отображения результатов
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 max-w-[1000px]">
      <div className="bg-[#F7F7F7] py-5 max-md:py-8 px-4 max-md:px-8 rounded-3xl shadow-lg">
        <Reveal from="left" delay={0.3}>
          <h2 className="text-[#2C2C2C] text-2xl max-md:text-3xl font-bold mb-4 max-md:mb-6">
            Ваши результаты:
          </h2>
          <p className="text-gray-600 mb-6">
            Общий балл: {totalScore} | Проценты рассчитываются относительно
            общего балла
          </p>
        </Reveal>

        {isMobile ? (
          <>
            <div className="mb-6">
              <ReactECharts
                className="h-[300px] w-full mx-auto"
                option={getChartOption(false)}
                opts={{ renderer: "svg" }}
              />
            </div>

            <div className="flex flex-col gap-3">
              {data.map((skill, index) => (
                <MobileSkillItem key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </>
        ) : (
          <Reveal from="bottom" delay={0.3}>
            <ReactECharts
              option={getChartOption(true)}
              style={{
                height: "500px",
                width: "100%",
                minHeight: "400px",
                margin: "0 auto",
              }}
              opts={{ renderer: "svg" }}
            />
          </Reveal>
        )}
      </div>
    </div>
  );
};
