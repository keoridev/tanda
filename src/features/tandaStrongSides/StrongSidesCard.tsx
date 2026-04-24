import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  Star,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  Rocket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProfessionData {
  testLink?: string;
  professions?: string[] | { profession: string }[];
  groups?: string[];
  image?: string;
  backgroundColor?: string;
  reason?: string;
  description?: string;
}

// Animated counter with smooth transitions
const AnimatedScore: FC<{ score: number }> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.floor(score * easedProgress);

      setDisplayScore(currentScore);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  return (
    <span className="font-bold text-3xl bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
      {displayScore}%
    </span>
  );
};

// ProfessionBadge - принимает только строку
const ProfessionBadge: FC<{ profession: string; index: number }> = ({
  profession,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.98 }}
    className="group relative"
  >
    <div className="relative z-10 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md px-6 py-4 rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-white/80">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex-shrink-0"></div>
        <span className="font-semibold text-gray-800 text-lg tracking-tight">
          {profession}
        </span>
        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all duration-300 group-hover:translate-x-1" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 to-teal-400/30 rounded-xl blur-md group-hover:blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
  </motion.div>
);

// Expandable content with show more/less functionality
const ExpandableContent: FC<{
  title: string;
  content: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, content, icon, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTextOverflow = () => {
      if (contentRef.current && window.innerWidth < 1024) {
        const lineHeight = parseInt(
          getComputedStyle(contentRef.current).lineHeight,
        );
        const maxHeight = lineHeight * 5;
        setNeedsExpansion(contentRef.current.scrollHeight > maxHeight);
      } else {
        setNeedsExpansion(false);
      }
    };

    checkTextOverflow();
    window.addEventListener("resize", checkTextOverflow);

    return () => window.removeEventListener("resize", checkTextOverflow);
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.1, duration: 0.4 }}
          className="p-6 bg-gradient-to-br from-emerald-50/80 to-white rounded-xl border-l-4 border-emerald-400 shadow-sm"
        >
          <p
            ref={contentRef}
            className={`text-lg text-gray-700 leading-relaxed tracking-normal ${
              needsExpansion && !isExpanded ? "line-clamp-5" : ""
            }`}
          >
            {content || "Информация временно недоступна"}
          </p>

          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden flex items-center mt-4 text-emerald-600 font-medium text-sm"
            >
              {isExpanded ? (
                <>
                  <span>Свернуть</span>
                  <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <span>Развернуть</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Исправленный ProfessionCard - теперь правильно принимает data
export const ProfessionCard: FC<{
  data: ProfessionData;
  score: number;
  index: number;
  skill: string;
}> = ({ data, score, index, skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Отладка: что пришло в компонент
  console.log(`ProfessionCard для ${skill}:`, {
    data,
    score,
    index,
    skill,
    image: data?.image,
    reason: data?.reason,
    description: data?.description,
    professions: data?.professions,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const professionsList = Array.isArray(data.professions)
    ? data.professions.map((p) =>
        typeof p === "string" ? p : p.profession || String(p),
      )
    : [];

  // Проверяем, есть ли данные для отображения
  const hasImage = data?.image && data.image !== "";
  const hasReason = data?.reason && data.reason !== "";
  const hasDescription = data?.description && data.description !== "";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="flex flex-col lg:flex-row gap-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/80 overflow-hidden">
        <div
          className={`flex-1 max-w-full lg:max-w-[500px] relative overflow-hidden ${data.backgroundColor || "bg-gradient-to-br from-emerald-400 to-teal-500"}`}
          style={{ minHeight: "480px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10"></div>

          <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md px-7 py-3.5 rounded-full shadow-2xl border border-gray-700/30">
                <Star className="w-7 h-7 text-yellow-400 fill-current mr-3 animate-pulse" />
                <div className="flex items-center text-left">
                  <AnimatedScore score={score} />
                </div>
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
              className="text-4xl font-bold mb-8 text-gray-900 tracking-tight"
            >
              {skill}
            </motion.h3>

            {/* Профессии */}
            <div className="space-y-4 mb-8 w-full max-w-md">
              {professionsList.length > 0 ? (
                professionsList.map((profession, idx) => (
                  <ProfessionBadge
                    key={idx}
                    profession={profession}
                    index={idx}
                  />
                ))
              ) : (
                <div className="text-gray-600 text-center">
                  Профессии не найдены
                </div>
              )}
            </div>

            {/* Изображение */}
            {hasImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.7, duration: 0.6 }}
                className="mt-auto"
              >
                <img
                  src={data.image}
                  alt={skill}
                  className="max-h-96 max-w-full transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    console.error(
                      `Ошибка загрузки изображения для ${skill}:`,
                      data.image,
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
          className="flex-1 p-8 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm"
        >
          <ExpandableContent
            title="Почему подходит"
            content={
              hasReason
                ? data.reason!
                : "Информация временно недоступна. Пожалуйста, обратитесь к администратору."
            }
            icon={<CheckCircle2 className="w-6 h-6 text-white" />}
            delay={index * 0.15 + 0.6}
          />

          <ExpandableContent
            title="Суть профессии"
            content={
              hasDescription
                ? data.description!
                : "Информация временно недоступна. Пожалуйста, обратитесь к администратору."
            }
            icon={<Briefcase className="w-6 h-6 text-white" />}
            delay={index * 0.15 + 0.7}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.8 }}
            className="flex justify-end"
          >
            <div className="flex items-center text-blue-500">
              <Rocket className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wide">
                Отличный потенциал
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
