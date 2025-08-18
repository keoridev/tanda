import { FC, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "~app/components/ui/button";
import { Profession } from "./model/types/salaryInfoTypes";
import {
  TrendingUp,
  GraduationCap,
  ArrowRight,
  Star,
  Award,
  Clock,
  Users,
} from "lucide-react";

interface SalaryInfoCardProps {
  profession: Profession;
}

export const SalaryInfoCard: FC<SalaryInfoCardProps> = ({ profession }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverValue = useMotionValue(0);

  // Мемоизация иконки
  const icon = useMemo(() => {
    const title = profession.title;
    if (title.includes("Frontend") || title.includes("UI")) return "🎨";
    if (title.includes("Backend") || title.includes("API")) return "⚙️";
    if (
      title.includes("Mobile") ||
      title.includes("iOS") ||
      title.includes("Android")
    )
      return "📱";
    if (title.includes("Data") || title.includes("Анал")) return "📊";
    if (title.includes("DevOps") || title.includes("Cloud")) return "☁️";
    if (title.includes("QA") || title.includes("Test")) return "🔍";
    if (title.includes("Product") || title.includes("Продукт")) return "🚀";
    return "💻";
  }, [profession.title]);

  // Плавные анимации
  const scale = useTransform(hoverValue, [0, 1], [1, 1.03]);
  const y = useTransform(hoverValue, [0, 1], [0, -4]);
  const rotate = useTransform(hoverValue, [0, 1], [0, 3]);
  const shadowIntensity = useTransform(hoverValue, [0, 1], [0, 0.15]);
  const borderOpacity = useTransform(hoverValue, [0, 1], [0.5, 0.8]);

  return (
    <motion.div
      onHoverStart={() => {
        setIsHovered(true);
        hoverValue.set(1);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        hoverValue.set(0);
      }}
      style={{ y, scale }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.5,
      }}
      className="h-full cursor-pointer"
    >
      <div className="relative h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Плавное изменение тени и границы */}
        <motion.div
          style={{
            boxShadow: useTransform(
              shadowIntensity,
              [0, 0.15],
              [
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              ]
            ),
            borderColor: useTransform(
              borderOpacity,
              [0.5, 0.8],
              ["rgba(209, 213, 219, 0.5)", "rgba(94, 234, 212, 0.8)"]
            ),
          }}
          className="absolute inset-0"
        />

        {/* Background gradient effect */}
        <motion.div
          style={{ opacity: useTransform(hoverValue, [0, 1], [0, 0.5]) }}
          className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/30"
        />

        {/* Glow effect */}
        <motion.div
          style={{
            opacity: useTransform(hoverValue, [0, 1], [0, 0.15]),
            scale: useTransform(hoverValue, [0, 1], [1, 1.05]),
          }}
          className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl blur-xl"
        />

        <div className="relative p-7 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start mb-6">
            <motion.div
              style={{
                rotate,
                scale: useTransform(hoverValue, [0, 1], [1, 1.05]),
              }}
              className="relative mr-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg border-2 border-teal-200/50">
                <span className="text-2xl">{icon}</span>
              </div>
              <motion.div
                style={{ opacity: useTransform(hoverValue, [0, 1], [0, 1]) }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
              >
                <Star className="w-3 h-3 text-white fill-current" />
              </motion.div>
            </motion.div>

            <div className="flex-1">
              <motion.h3
                style={{
                  color: useTransform(
                    hoverValue,
                    [0, 1],
                    ["rgb(31, 41, 55)", "rgb(13, 148, 136)"]
                  ),
                }}
                className="text-2xl font-bold mb-2 leading-tight"
              >
                {profession.title}
              </motion.h3>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">
                  Высокий спрос
                </span>
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div className="space-y-4 mb-6">
            {/* Beginner Salary */}
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/50"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-amber-700">
                      Новичок
                    </p>
                    <Clock className="w-3 h-3 text-amber-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {profession.salaryBeginner.toLocaleString()} сом
                  </p>
                </div>
                <motion.div
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                </motion.div>
              </div>
            </motion.div>

            {/* Professional Salary */}
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-2xl border border-emerald-200/50"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-emerald-700">
                      Профессионал
                    </p>
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {profession.salaryPro.toLocaleString()} сом
                  </p>
                </div>
                <motion.div
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <div className="flex-grow mb-6">
            <div className="relative">
              <motion.p
                style={{
                  color: useTransform(
                    hoverValue,
                    [0, 1],
                    ["rgb(75, 85, 99)", "rgb(55, 65, 81)"]
                  ),
                }}
                className="leading-relaxed line-clamp-3"
              >
                {profession.description}
              </motion.p>
              <motion.div
                style={{
                  background: useTransform(
                    hoverValue,
                    [0, 1],
                    [
                      "linear-gradient(to left, white 0%, transparent 100%)",
                      "linear-gradient(to left, rgba(204, 251, 241, 0.5) 0%, transparent 100%)",
                    ]
                  ),
                }}
                className="absolute bottom-0 right-0 w-8 h-6"
              />
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button className="w-full py-4 rounded-2xl font-semibold text-white bg-emerald-500 hover:from-teal-600  shadow-lg border-0">
              <motion.span
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                Читать подробнее
              </motion.span>
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            style={{
              scale: useTransform(hoverValue, [0, 1], [1, 1.2]),
              opacity: useTransform(hoverValue, [0, 1], [0.2, 0.4]),
            }}
            className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-teal-100/20 to-blue-100/20 rounded-full -z-10"
          />
          <motion.div
            style={{
              scale: useTransform(hoverValue, [0, 1], [1, 1.15]),
              opacity: useTransform(hoverValue, [0, 1], [0.2, 0.3]),
            }}
            className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full -z-10"
          />
        </div>
      </div>
    </motion.div>
  );
};
