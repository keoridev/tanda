import { ProfessionData } from "./types/strongSidesTypes";
import Frontend from "../../../../public/tanda/StrongSides/frontend.png";
import Backend from "../../../../public/tanda/StrongSides/backend.png";
import Design from "../../../../public/tanda/StrongSides/UI-UX-Design.png";
import Project from "../../../../public/tanda/StrongSides/projectManager.png";
import Product from "../../../../public/tanda/StrongSides/productManager.png";
import Database from "../../../../public/tanda/StrongSides/database.png";

export const skillToProfessions: Record<string, ProfessionData> = {
  Креативность: {
    testLink: "/frontend-test",
    professions: ["Frontend"],
    groups: ["(Пи)"],
    image: Frontend,
    backgroundColor: "bg-[#8dddce]",
    reason:
      "Твоя способность мыслить нестандартно и создавать оригинальные решения делает тебя идеальным кандидатом во фронтенд-разработку, где нужно постоянно придумывать новые способы взаимодействия с пользователем.",
    description:
      "Frontend-разработчик создает видимую часть веб-приложений, используя современные технологии вроде React и Vue.js, чтобы превращать дизайн-макеты в интерактивные пользовательские интерфейсы.",
  },
  "Визуальное мышление": {
    testLink: "/design-test",
    professions: ["UX/UI дизайнер"],
    groups: ["(ДПО)"],
    image: Design,
    backgroundColor: "bg-[#98eff7]",
    reason:
      "Твое умение визуализировать идеи и понимать принципы композиции позволяет создавать эстетичные и удобные интерфейсы, что является ключевым для успешной карьеры в дизайне.",
    description:
      "UX/UI дизайнер занимается проектированием пользовательского опыта, создавая интуитивно понятные интерфейсы в Figma и Adobe XD, которые сочетают красоту и функциональность.",
  },
  Логика: {
    testLink: "/backend-test",
    professions: ["Backend"],
    groups: ["(ПОВТ)"],
    image: Backend,
    backgroundColor: "bg-[#e3f1f8]",
    reason:
      "Твое аналитическое мышление и способность выстраивать сложные алгоритмы идеально подходят для бэкенд-разработки, где важна четкая структура и оптимальная производительность.",
    description:
      "Backend-разработчик работает с серверной частью приложений, используя языки вроде Python и Node.js для создания надежных API и обработки бизнес-логики.",
  },
  Структурирование: {
    testLink: "/database-test",
    professions: ["Базы данных"],
    groups: ["Группа аналитики и работы с данными"],
    image: Database,
    backgroundColor: "bg-[#5ce4f4]",
    reason:
      "Твоя способность систематизировать информацию и выстраивать четкие структуры делает тебя ценным специалистом в области баз данных, где важна организация больших объемов данных.",
    description:
      "Специалист по базам данных проектирует и оптимизирует системы хранения информации, работая с SQL и NoSQL решениями для обеспечения быстрого доступа к данным.",
  },
  Организация: {
    testLink: "/project-test",
    professions: ["Проектный менеджер"],
    groups: ["Группа управления проектами"],
    image: Project,
    backgroundColor: "bg-[#bce1e1]",
    reason:
      "Твои навыки планирования и управления процессами позволяют эффективно координировать работу команды, что критически важно для успешной реализации IT-проектов.",
    description:
      "Проектный менеджер контролирует все этапы разработки, используя методологии вроде Agile и Scrum, чтобы обеспечить своевременное выполнение задач в рамках бюджета.",
  },
  Аналитика: {
    testLink: "/product-test",
    professions: ["Продуктовый менеджер"],
    groups: ["Группа менеджмента и маркетинга"],
    image: Product,
    backgroundColor: "bg-[#f7e1b3]",
    reason:
      "Твое умение анализировать рынок и понимать потребности пользователей помогает создавать продукты, которые действительно решают проблемы людей и востребованы на рынке.",
    description:
      "Продуктовый менеджер определяет стратегию развития продукта, анализируя данные и работая на стыке между бизнесом, разработкой и дизайном для создания успешных решений.",
  },
};
