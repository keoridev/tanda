import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/HeaderImg.svg";
import questionImg from "../../../public/tanda/question.png";
import timeImg from "../../../public/tanda/time.png";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Target,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      text: "Персональная карьерная карта",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Анализ сильных сторон",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Рекомендации экспертов",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const stats = [
    { number: "200+", label: "Довольных пользователей" },
    { number: "90%", label: "Точность результатов" },
    { number: "6", label: "Профессий в базе" },
  ];

  return (
    <div className="relative text-center px-5 py-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#0c7d70]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Image with Enhanced Animation */}
        <Reveal from="top" delay={0.3}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <img
              src={HomeImg}
              alt="Header"
              className="mx-auto max-md:max-w-60 max-w-96 drop-shadow-2xl"
            />
            {/* Floating accent elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-[#0c7d70] p-3 rounded-full shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-2 -left-4 bg-emerald-500 p-2 rounded-full shadow-lg"
            >
              <Star className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Enhanced Title and Description */}
        <Reveal from="bottom" delay={0.4}>
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl text-[#2C2C2C] font-bold mt-6 max-md:text-4xl max-sm:text-3xl leading-tight">
              Узнайте, какая{" "}
              <span className="relative">
                <span className="text-[#0c7d70]">профессия</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-[#0c7d70]/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <br />
              вам подходит
            </h1>

            <p className="text-xl text-[#666666] mt-6 max-sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Получите{" "}
              <span className="font-semibold text-[#0c7d70]">
                подробный отчёт
              </span>{" "}
              от профориентологов и найдите дело по душе с помощью научного
              подхода
            </p>
          </div>
        </Reveal>

        {/* Enhanced Test Info Cards */}
        <div className="flex justify-center items-center gap-4 flex-wrap mb-8">
          <Reveal from="left" delay={0.5}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center bg-white shadow-lg border border-[#0c7d70]/10 text-[#2C2C2C] rounded-2xl px-6 py-4 max-sm:text-sm text-base font-semibold transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#0c7d70]/10 rounded-full flex items-center justify-center mr-3">
                <img src={questionImg} alt="questions" className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-[#0c7d70]">14 вопросов</div>
                <div className="text-xs text-gray-500">Быстро и точно</div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal from="right" delay={0.5}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center bg-white shadow-lg border border-[#0c7d70]/10 text-[#2C2C2C] rounded-2xl px-6 py-4 max-sm:text-sm text-base font-semibold transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3">
                <img src={timeImg} alt="time" className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-emerald-600">~2 минуты</div>
                <div className="text-xs text-gray-500">Экономим время</div>
              </div>
            </motion.div>
          </Reveal>
        </div>
        <Reveal from="bottom" delay={0.7}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                >
                  {feature.icon}
                </div>
                <p className="text-[#2C2C2C] font-semibold">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Trust Indicators */}
        <Reveal from="bottom" delay={0.7}>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#0c7d70] mr-2" />
              <h3 className="text-xl font-bold text-[#2C2C2C]">
                Нам доверяют тысячи пользователей
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[#0c7d70] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Additional Trust Elements */}
        <Reveal from="bottom" delay={0.6}>
          <div className="mt-8 flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Научный подход</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Конфиденциально</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Без регистрации</span>
            </div>
          </div>
        </Reveal>

        {/* Enhanced CTA Button */}
        <Reveal from="bottom" delay={0.6}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-12"
          >
            <Button
              className="relative bg-[#0c7d70] hover:bg-[#0a6b5f] text-white font-bold text-lg mt-8 px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-[#0c7d70]/25 hover:shadow-3xl group overflow-hidden"
              onClick={() => navigate("/test")}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <span className="relative flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Пройти тест бесплатно
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </Reveal>

        {/* New Features Section */}

      </div>
    </div>
  );
};
