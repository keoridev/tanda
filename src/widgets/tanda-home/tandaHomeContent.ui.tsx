import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/HeaderImg.svg";
import questionImg from "../../../public/tanda/question.png";
import timeImg from "../../../public/tanda/time.png";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";
import {
  CheckCircle,
  Target,
  TrendingUp,
  Award,
  ArrowRight,
  Users,
} from "lucide-react";

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      text: "Персональная карьерная карта",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      text: "Анализ сильных сторон",
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Рекомендации экспертов",
    },
  ];

  const stats = [
    { value: "200+", label: "Довольных пользователей" },
    { value: "90%", label: "Точность результатов" },
    { value: "6", label: "Профессий в базе" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white px-5 py-12 md:py-16 max-w-6xl mx-auto">
      {/* Hero section */}
      <div className="relative text-center z-10">
        <Reveal from="top" delay={0.1}>
          <img
            src={HomeImg}
            alt="Header illustration"
            className="mx-auto w-64 md:w-80 mb-8"
          />
        </Reveal>

        <Reveal from="bottom" delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Узнайте, какая{" "}
            <span className="text-[#0c7d70]">
              профессия
            </span>
            <br />
            вам подходит
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Получите подробный отчёт от профориентологов и найдите дело по душе
            с помощью научного подхода
          </p>
        </Reveal>

        {/* Quick info chips */}
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          <Reveal from="left" delay={0.3}>
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2">
              <img src={questionImg} alt="questions" className="w-5 h-5 mr-2" />
              <span className="text-gray-700 font-medium">14 вопросов</span>
            </div>
          </Reveal>
          <Reveal from="right" delay={0.3}>
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2">
              <img src={timeImg} alt="time" className="w-5 h-5 mr-2" />
              <span className="text-gray-700 font-semibold">~2 минуты</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Features grid */}
      <div className="relative grid md:grid-cols-3 gap-6 mt-16 z-10">
        {features.map((feature, index) => (
          <Reveal from="bottom" delay={0.2 + index * 0.1} key={index}>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-[#0c7d70]/30 transition-colors">
              <div className="w-12 h-12 bg-[#0c7d70]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#0c7d70]">{feature.icon}</div>
              </div>
              <p className="text-gray-900 font-semibold">{feature.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Trust section */}
      <div className="relative mt-16 bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Users className="w-5 h-5 text-[#0c7d70]" />
          <h2 className="text-lg font-semibold text-gray-900">
            Нам доверяют тысячи пользователей
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0c7d70]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 flex-wrap mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Научный подход</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Конфиденциально</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Без регистрации</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Reveal from="bottom" delay={0.4}>
        <div className="relative text-center mt-12 z-10">
          <Button
            onClick={() => navigate("/test")}
            className="bg-[#0c7d70] hover:bg-[#0a6b5f] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all inline-flex items-center gap-2"
          >
            Пройти тест бесплатно
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Reveal>
    </div>
  );
};