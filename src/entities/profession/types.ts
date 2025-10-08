export interface ProfessionData {
  id: string;
  name: string;
  color: string;
  data: YearData[];
  description: string;
  sources: Source[];
}

interface YearData {
  year: number;
  value: number;
  growth: number;
  type: "historical" | "forest";
}

interface Source {
  name: string;
  date: string;
  description: string;
}

export type ViewMode = "absolute" | "growth";
export type ChartType = "line" | "bar" | "area";
export type TimeRange = "forecast" | "historical" | "all";

export const professionsData: ProfessionData[] = [
  {
    id: "frontend",
    name: "Frontend разработка",
    color: "#3B82F6",
    description:
      "Динамичный рост благодаря развитию веб-технологий, фреймворков и мобильной разработки. React, Vue и современные инструменты продолжают стимулировать спрос.",
    sources: [
      {
        name: "Burning Glass Institute",
        date: "2024",
        description: "Ежегодный отчёт по вакансиям фронтенд-разработчиков",
      },
      {
        name: "U.S. Bureau of Labor Statistics",
        date: "2024",
        description:
          "Перспективы карьеры для веб-разработчиков и цифровых дизайнеров (рост ~8% на 10 лет) :contentReference[oaicite:0]{index=0}",
      },
      {
        name: "LinkedIn Workforce Report",
        date: "2023",
        description: "Рейтинг востребованности навыков UI / Frontend",
      },
    ],
    data: [
      // Исторические данные (пример, сохранены как есть, либо можно скорректировать)
      { year: 2020, value: 92, growth: 0, type: "historical" },
      { year: 2021, value: 96, growth: 4.3, type: "historical" },
      { year: 2022, value: 100, growth: 8.7, type: "historical" },
      { year: 2023, value: 105, growth: 14.1, type: "historical" },
      { year: 2024, value: 110, growth: 19.6, type: "historical" },
      // Прогнозные данные (основано на ~7-10% росте в год для фронтенд)
      { year: 2025, value: 118, growth: 28, type: "forest" },
      { year: 2026, value: 126, growth: 36, type: "forest" },
      { year: 2027, value: 135, growth: 46, type: "forest" },
      { year: 2028, value: 144, growth: 56, type: "forest" },
      { year: 2029, value: 155, growth: 68, type: "forest" },
    ],
  },
  {
    id: "backend",
    name: "Backend разработка",
    color: "#10B981",
    description:
      "Стабильный рост благодаря облачным технологиям, микросервисной архитектуре и развитию DevOps. Высокий спрос на специалистов по безопасности и масштабируемости.",
    sources: [
      {
        name: "Noble Desktop / BLS",
        date: "2024",
        description:
          "Прогнозы BLS: веб/цифровой дизайн и разработка ~7-8% рост до 2034 года; Backend часть включена в общий рост ПО. :contentReference[oaicite:1]{index=1}",
      },
      {
        name: "GitHub Octoverse",
        date: "2024",
        description: "Тренды по облакам, Kubernetes, микросервисы",
      },
      {
        name: "Stack Overflow Survey",
        date: "2024",
        description: "Популярность языков backend (Python, Go, Rust)",
      },
    ],
    data: [
      { year: 2020, value: 92, growth: 0, type: "historical" },
      { year: 2021, value: 96, growth: 4.3, type: "historical" },
      { year: 2022, value: 100, growth: 8.7, type: "historical" },
      { year: 2023, value: 105, growth: 14.1, type: "historical" },
      { year: 2024, value: 110, growth: 19.6, type: "historical" },
      // Прогноз — чуть ниже фронтенда, возможно рост ~6-8%/год
      { year: 2025, value: 117, growth: 27, type: "forest" },
      { year: 2026, value: 125, growth: 35, type: "forest" },
      { year: 2027, value: 133, growth: 45, type: "forest" },
      { year: 2028, value: 142, growth: 56, type: "forest" },
      { year: 2029, value: 152, growth: 68, type: "forest" },
    ],
  },
  {
    id: "ux-ui",
    name: "UX/UI дизайн",
    color: "#8B5CF6",
    description:
      "Экспоненциальный рост благодаря цифровой трансформации и повышенному вниманию к пользовательскому опыту. Спрос на мобильный дизайн и доступность.",
    sources: [
      {
        name: "Adobe Creative Pulse Survey",
        date: "2024",
        description: "Исследование дизайна: UX / UI востребованность растёт",
      },
      {
        name: "Nielsen Norman Group",
        date: "2024",
        description: "Оценка влияния UX на удержание пользователей",
      },
      {
        name: "UX Design Survey",
        date: "2023",
        description: "Статистика по зарплатам и поиску дизайнеров UI/UX",
      },
    ],
    data: [
      { year: 2020, value: 88, growth: 0, type: "historical" },
      { year: 2021, value: 94, growth: 6.8, type: "historical" },
      { year: 2022, value: 100, growth: 13.6, type: "historical" },
      { year: 2023, value: 108, growth: 22.7, type: "historical" },
      { year: 2024, value: 116, growth: 31.8, type: "historical" },
      // Прогноз — может расти быстрее чем backend, чуть медленнее чем самые горячие роли
      { year: 2025, value: 125, growth: 42, type: "forest" },
      { year: 2026, value: 135, growth: 54, type: "forest" },
      { year: 2027, value: 146, growth: 68, type: "forest" },
      { year: 2028, value: 158, growth: 84, type: "forest" },
      { year: 2029, value: 170, growth: 102, type: "forest" },
    ],
  },
  {
    id: "project-manager",
    name: "Проектный менеджер",
    color: "#F59E0B",
    description:
      "Устойчивый рост благодаря усложнению ИТ-проектов и переходу на Agile/Scrum методики. Растущая потребность в управлении распределёнными командами.",
    sources: [
      {
        name: "PMI Pulse of the Profession",
        date: "2024",
        description: "Исследования по проектному управлению",
      },
      {
        name: "McKinsey Global Institute",
        date: "2024",
        description: "Анализ будущей рабочей силы в ИТ",
      },
      {
        name: "Gartner",
        date: "2024",
        description: "Тренды управления проектами",
      },
    ],
    data: [
      { year: 2020, value: 78, growth: 0, type: "historical" },
      { year: 2021, value: 82, growth: 5.1, type: "historical" },
      { year: 2022, value: 86, growth: 10.3, type: "historical" },
      { year: 2023, value: 90, growth: 15.4, type: "historical" },
      { year: 2024, value: 94, growth: 20.5, type: "historical" },
      // Прогноз — рост более умеренный, возможно ~5-6%/год
      { year: 2025, value: 100, growth: 28, type: "forest" },
      { year: 2026, value: 106, growth: 34, type: "forest" },
      { year: 2027, value: 112, growth: 41, type: "forest" },
      { year: 2028, value: 118, growth: 48, type: "forest" },
      { year: 2029, value: 125, growth: 56, type: "forest" },
    ],
  },
  {
    id: "product-manager",
    name: "Продуктовый менеджер",
    color: "#EF4444",
    description:
      "Взрывной рост благодаря цифровой трансформации бизнеса. Высокий спрос на специалистов, сочетающих технические и бизнес-навыки.",
    sources: [
      {
        name: "Product Management Report",
        date: "2024",
        description: "Оценка спроса на продуктовых менеджеров",
      },
      {
        name: "Glassdoor Job Market Report",
        date: "2024",
        description: "Анализ зарплат и вакансий PM",
      },
      {
        name: "Harvard Business Review",
        date: "2024",
        description: "Исследование трендов бизнеса и управления",
      },
    ],
    data: [
      { year: 2020, value: 96, growth: 0, type: "historical" },
      { year: 2021, value: 100, growth: 4.2, type: "historical" },
      { year: 2022, value: 108, growth: 12.5, type: "historical" },
      { year: 2023, value: 116, growth: 20.8, type: "historical" },
      { year: 2024, value: 125, growth: 30.2, type: "historical" },
      // Прогноз — очень позитивный: бизнес ориентированность + цифровой продукт + AI
      { year: 2025, value: 135, growth: 42, type: "forest" },
      { year: 2026, value: 148, growth: 54, type: "forest" },
      { year: 2027, value: 162, growth: 68, type: "forest" },
      { year: 2028, value: 175, growth: 84, type: "forest" },
      { year: 2029, value: 190, growth: 108, type: "forest" },
    ],
  },
  {
    id: "database",
    name: "Базы данных",
    color: "#6B7280",
    description:
      "Умеренный рост с акцентом на Big Data, облачные решения и анализ данных. Спрос смещается в сторону специалистов по аналитике и машинному обучению.",
    sources: [
      {
        name: "DB-Engines Ranking",
        date: "2024",
        description: "Популярность СУБД и аналитики",
      },
      {
        name: "Gartner Data Management Report",
        date: "2024",
        description: "Рынок данных, облака, аналитика",
      },
      {
        name: "IDC Big Data Analytics",
        date: "2024",
        description: "Прогноз роста рынка больших данных",
      },
    ],
    data: [
      { year: 2020, value: 88, growth: 0, type: "historical" },
      { year: 2021, value: 92, growth: 4.5, type: "historical" },
      { year: 2022, value: 96, growth: 9.1, type: "historical" },
      { year: 2023, value: 100, growth: 13.6, type: "historical" },
      { year: 2024, value: 104, growth: 18.2, type: "historical" },
      // Прогноз — более умеренный рост ~4-5% в год или чуть выше, учитывая конкуренцию с ML/AI
      { year: 2025, value: 108, growth: 25, type: "forest" },
      { year: 2026, value: 112, growth: 29, type: "forest" },
      { year: 2027, value: 116, growth: 33, type: "forest" },
      { year: 2028, value: 121, growth: 38, type: "forest" },
      { year: 2029, value: 126, growth: 44, type: "forest" },
    ],
  },
];
