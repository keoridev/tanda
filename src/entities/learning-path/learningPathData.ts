import { LearningPath } from "./learningPathTypes";

export const learningPaths: LearningPath[] = [
  {
    profession: "Frontend-разработчик (2025)",
    steps: [
      {
        id: "front-1",
        title: "Основы веб-разработки",
        duration: "3-4 недели",
        description:
          "Изучение базовых технологий: HTML5, CSS3 и JavaScript (ES6+)",
        skills: [
          "HTML5",
          "CSS3",
          "Адаптивный дизайн",
          "Git basics",
          "DevTools",
        ],
        resources: [
          { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
          {
            name: "FreeCodeCamp (Responsive Web Design)",
            url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
          },
        ],
      },
      {
        id: "front-2",
        title: "Продвинутый JavaScript",
        duration: "5-6 недель",
        description:
          "Глубокая работа с JavaScript: асинхронность, ООП, работа с API",
        skills: ["ES6+", "Async/Promises", "REST API", "Webpack", "Jest"],
        resources: [
          { name: "JavaScript.info", url: "https://javascript.info" },
          {
            name: "You Dont Know JS",
            url: "https://github.com/getify/You-Dont-Know-JS",
          },
        ],
      },
      {
        id: "front-3",
        title: "React и современные фреймворки",
        duration: "6-8 недель",
        description:
          "Изучение React 18+, управление состоянием, Next.js и TypeScript",
        skills: [
          "React",
          "Redux/Toolkit",
          "Next.js",
          "TypeScript",
          "React Query",
        ],
        resources: [
          { name: "React Docs (Beta)", url: "https://react.dev" },
          { name: "Next.js Docs", url: "https://nextjs.org/docs" },
        ],
      },
      {
        id: "front-4",
        title: "Продвинутые фронтенд-техники",
        duration: "4-5 недель",
        description: "Оптимизация производительности, тестирование, SSR/SSG",
        skills: [
          "Performance",
          "Testing (Jest/RTL)",
          "SSR/SSG",
          "GraphQL",
          "Web Vitals",
        ],
        resources: [
          {
            name: "Web Dev (Learn Performance)",
            url: "https://web.dev/learn/",
          },
          { name: "Testing Library", url: "https://testing-library.com" },
        ],
      },
      {
        id: "front-5",
        title: "Подготовка к трудоустройству",
        duration: "4 недели",
        description:
          "Создание портфолио, решение задач, подготовка к собеседованиям",
        skills: [
          "Портфолио",
          "GitHub",
          "LeetCode",
          "System Design",
          "Soft Skills",
        ],
        resources: [
          {
            name: "Frontend Interview Handbook",
            url: "https://frontendinterviewhandbook.com",
          },
          {
            name: "LeetCode Frontend",
            url: "https://leetcode.com/explore/interview/card/top-interview-questions-easy/",
          },
        ],
      },
    ],
  },
  {
    profession: "Backend-разработчик (2025)",
    steps: [
      {
        id: "back-1",
        title: "Основы программирования",
        duration: "4 недели",
        description: "Изучение Python/Node.js, алгоритмов и структур данных",
        skills: [
          "Python/Node.js",
          "Базовые алгоритмы",
          "Git",
          "CLI",
          "HTTP basics",
        ],
        resources: [
          { name: "CS50", url: "https://cs50.harvard.edu/x/2024/" },
          {
            name: "Python Official Docs",
            url: "https://docs.python.org/3/tutorial/",
          },
        ],
      },
      {
        id: "back-2",
        title: "Базы данных и API",
        duration: "5 недель",
        description: "Работа с SQL/NoSQL базами данных и создание REST API",
        skills: ["PostgreSQL", "MongoDB", "REST API", "ORM", "Docker basics"],
        resources: [
          {
            name: "PostgreSQL Tutorial",
            url: "https://www.postgresqltutorial.com",
          },
          { name: "REST API Tutorial", url: "https://restfulapi.net" },
        ],
      },
      {
        id: "back-3",
        title: "Backend фреймворки",
        duration: "6 недель",
        description: "Освоение Express.js (Node) или Django/FastAPI (Python)",
        skills: [
          "Express.js",
          "Django/FastAPI",
          "JWT Auth",
          "WebSockets",
          "GraphQL",
        ],
        resources: [
          { name: "Express.js Docs", url: "https://expressjs.com" },
          { name: "Django Docs", url: "https://docs.djangoproject.com" },
        ],
      },
      {
        id: "back-4",
        title: "Облачные технологии и DevOps",
        duration: "5 недель",
        description:
          "Деплой приложений, CI/CD и работа с облачными платформами",
        skills: ["AWS/GCP", "Kubernetes", "CI/CD", "Terraform", "Monitoring"],
        resources: [
          { name: "AWS Free Tier", url: "https://aws.amazon.com/free" },
          { name: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        ],
      },
      {
        id: "back-5",
        title: "Подготовка к работе",
        duration: "4 недели",
        description: "Оптимизация запросов, безопасность, собеседования",
        skills: [
          "SQL оптимизация",
          "API Security",
          "System Design",
          "Scaling",
          "Interview Prep",
        ],
        resources: [
          {
            name: "System Design Primer",
            url: "https://github.com/donnemartin/system-design-primer",
          },
          {
            name: "Backend Interview Questions",
            url: "https://github.com/arialdomartini/Back-End-Developer-Interview-Questions",
          },
        ],
      },
    ],
  },
  {
    profession: "Data Scientist (2025)",
    steps: [
      {
        id: "data-1",
        title: "Основы Python и математики",
        duration: "4 недели",
        description: "Изучение Python для анализа данных и основ статистики",
        skills: ["Python", "NumPy", "Pandas", "Основы статистики", "Jupyter"],
        resources: [
          {
            name: "Python Data Science Handbook",
            url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
          },
          { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
        ],
      },
      {
        id: "data-2",
        title: "Анализ данных и визуализация",
        duration: "5 недель",
        description:
          "Работа с данными и их визуализация с помощью современных инструментов",
        skills: ["Pandas", "Matplotlib", "Seaborn", "EDA", "SQL для анализа"],
        resources: [
          {
            name: "Data Visualization with Python",
            url: "https://www.coursera.org/learn/python-for-data-visualization",
          },
          {
            name: "Storytelling with Data",
            url: "https://www.storytellingwithdata.com",
          },
        ],
      },
      {
        id: "data-3",
        title: "Машинное обучение",
        duration: "6 недель",
        description: "Основы ML: от линейной регрессии до нейронных сетей",
        skills: [
          "Scikit-learn",
          "TensorFlow/PyTorch",
          "Feature Engineering",
          "Model Evaluation",
          "MLOps basics",
        ],
        resources: [
          {
            name: "Coursera ML",
            url: "https://www.coursera.org/learn/machine-learning",
          },
          { name: "Fast.ai", url: "https://course.fast.ai" },
        ],
      },
      {
        id: "data-4",
        title: "Продвинутые техники DS",
        duration: "5 недель",
        description: "Работа с большими данными и продвинутые методы анализа",
        skills: ["Spark", "Dask", "NLP/CV", "Time Series", "Cloud ML"],
        resources: [
          {
            name: "Big Data with PySpark",
            url: "https://www.udemy.com/course/spark-and-python-for-big-data-with-pyspark",
          },
          { name: "Hugging Face", url: "https://huggingface.co/course" },
        ],
      },
      {
        id: "data-5",
        title: "Реальные проекты и трудоустройство",
        duration: "4 недели",
        description: "Участие в соревнованиях, портфолио и собеседования",
        skills: [
          "Kaggle Competitions",
          "Портфолио",
          "AB Testing",
          "Data Storytelling",
          "Case Interviews",
        ],
        resources: [
          { name: "Kaggle", url: "https://www.kaggle.com" },
          {
            name: "Data Science Interview Questions",
            url: "https://github.com/alexeygrigorev/data-science-interviews",
          },
        ],
      },
    ],
  },
  {
    profession: "DevOps/SRE (2025)",
    steps: [
      {
        id: "devops-1",
        title: "Основы Linux и сетей",
        duration: "4 недели",
        description:
          "Работа с Linux, bash-скриптинг и основы сетевых технологий",
        skills: ["Linux CLI", "Bash scripting", "Networking", "SSH", "Systemd"],
        resources: [
          { name: "Linux Journey", url: "https://linuxjourney.com" },
          {
            name: "Cisco Networking Basics",
            url: "https://www.netacad.com/courses/networking",
          },
        ],
      },
      {
        id: "devops-2",
        title: "Контейнеризация и облака",
        duration: "5 недель",
        description: "Docker, Kubernetes и основы облачных платформ",
        skills: ["Docker", "Kubernetes", "AWS/GCP basics", "Terraform", "Helm"],
        resources: [
          { name: "Docker Docs", url: "https://docs.docker.com/get-started/" },
          {
            name: "Kubernetes Docs",
            url: "https://kubernetes.io/docs/tutorials/",
          },
        ],
      },
      {
        id: "devops-3",
        title: "CI/CD и инфраструктура как код",
        duration: "6 недель",
        description: "Настройка пайплайнов и автоматизация развертывания",
        skills: [
          "GitHub Actions",
          "ArgoCD",
          "Terraform",
          "Ansible",
          "Monitoring",
        ],
        resources: [
          {
            name: "GitHub Actions Docs",
            url: "https://docs.github.com/en/actions",
          },
          {
            name: "Terraform Learn",
            url: "https://learn.hashicorp.com/terraform",
          },
        ],
      },
      {
        id: "devops-4",
        title: "Безопасность и оптимизация",
        duration: "5 недель",
        description: "DevSecOps, оптимизация инфраструктуры и затрат",
        skills: [
          "Security Best Practices",
          "Cost Optimization",
          "Performance Tuning",
          "Disaster Recovery",
          "GitOps",
        ],
        resources: [
          { name: "DevSecOps Guide", url: "https://www.devsecops.org" },
          {
            name: "Cloud Cost Optimization",
            url: "https://www.cncf.io/blog/2023/03/15/cloud-cost-optimization-best-practices/",
          },
        ],
      },
      {
        id: "devops-5",
        title: "Подготовка к работе",
        duration: "4 недели",
        description: "Реальные кейсы, сертификации и собеседования",
        skills: [
          "Case Studies",
          "AWS/GCP Cert Prep",
          "Incident Management",
          "Interview Prep",
          "SRE Principles",
        ],
        resources: [
          {
            name: "Google SRE Book",
            url: "https://sre.google/sre-book/table-of-contents/",
          },
          {
            name: "DevOps Interview Questions",
            url: "https://github.com/bregman-arie/devops-exercises",
          },
        ],
      },
    ],
  },
  {
    profession: "UX/UI дизайнер (2025)",
    steps: [
      {
        id: "design-1",
        title: "Основы дизайна",
        duration: "4 недели",
        description: "Принципы дизайна, цвет, типографика и композиция",
        skills: [
          "Color Theory",
          "Typography",
          "Grid Systems",
          "Design Principles",
          "Figma Basics",
        ],
        resources: [
          { name: "Refactoring UI", url: "https://refactoringui.com" },
          { name: "Figma Learn", url: "https://help.figma.com/hc/en-us" },
        ],
      },
      {
        id: "design-2",
        title: "UX исследования",
        duration: "5 недель",
        description:
          "Проведение исследований и создание пользовательских сценариев",
        skills: [
          "User Research",
          "Personas",
          "User Flows",
          "Wireframing",
          "Usability Testing",
        ],
        resources: [
          { name: "NN/g UX Courses", url: "https://www.nngroup.com/training/" },
          { name: "UX Collective", url: "https://uxdesign.cc" },
        ],
      },
      {
        id: "design-3",
        title: "UI дизайн и прототипирование",
        duration: "6 недель",
        description: "Создание интерфейсов и интерактивных прототипов",
        skills: [
          "Figma",
          "Design Systems",
          "Prototyping",
          "Microinteractions",
          "Responsive Design",
        ],
        resources: [
          {
            name: "Figma UI Design",
            url: "https://www.figma.com/resources/learn-design/",
          },
          { name: "Design Systems Repo", url: "https://designsystemsrepo.com" },
        ],
      },
      {
        id: "design-4",
        title: "Продвинутые техники",
        duration: "5 недель",
        description: "Анимации, 3D и новые тренды в дизайне",
        skills: [
          "After Effects",
          "3D Design",
          "AR/VR",
          "Design Tokens",
          "Accessibility",
        ],
        resources: [
          { name: "LottieFiles", url: "https://lottiefiles.com" },
          { name: "WebAIM Accessibility", url: "https://webaim.org" },
        ],
      },
      {
        id: "design-5",
        title: "Портфолио и трудоустройство",
        duration: "4 недели",
        description: "Создание кейсов, презентация работ и поиск работы",
        skills: [
          "Case Studies",
          "Portfolio Design",
          "Networking",
          "Freelance",
          "Interview Prep",
        ],
        resources: [
          { name: "UX Portfolio Guide", url: "https://uxfol.io" },
          { name: "Dribbble Jobs", url: "https://dribbble.com/jobs" },
        ],
      },
    ],
  },
];
