"use client";
import { Button } from "~app/components/ui/button";
import { Input } from "~app/components/ui/input";
import { Label } from "~app/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuthLogic } from "../model/hooks/useAuthLogic";
import { Reveal } from "~shared/lib/framer";
import { useEffect, useState } from "react";
import {
  PersonOutline,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { AnalysisModal } from "../model/analysis-modal";
import { motion } from "framer-motion";

interface AuthFormProps {
  testResults?: Record<string, number> | null;
}

export const AuthForm = ({ testResults }: AuthFormProps) => {
  const {
    name,
    email,
    phone,
    isFormValid,
    nameError,
    emailError,
    phoneError,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useAuthLogic(testResults || undefined);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleSubmitWithAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleSubmit(e);
            setIsAnalyzing(false);
            setAnalysisProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Фикс для выпадающего списка телефона
  useEffect(() => {
    if (!isMounted) return;
    const observer = new MutationObserver(() => {
      const dropdown = document.querySelector(
        ".react-tel-input .flag-dropdown.open",
      ) as HTMLElement;
      if (dropdown) {
        dropdown.style.position = "absolute";
        dropdown.style.top = "100%";
        dropdown.style.left = "0";
        dropdown.style.zIndex = "1000";
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 text-center text-gray-500">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gray-50">
      <AnalysisModal
        isOpen={isAnalyzing}
        onClose={() => {
          setIsAnalyzing(false);
          setAnalysisProgress(0);
        }}
        progress={analysisProgress}
      />
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Левая панель — спокойный зеленый фон */}
          <div className="bg-[#0c7d70] p-8 md:p-10 text-white flex flex-col justify-center">
            <Reveal from="left" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Ваш карьерный путь начинается здесь
                </h2>
                <p className="text-white/80 text-lg">
                  Получите детальный анализ ваших сильных сторон и персональные
                  рекомендации.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Персональный анализ</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Рекомендации роста</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Экспертная оценка</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Правая панель — форма */}
          <div className="p-8 md:p-10">
            <Reveal from="right" delay={0.3}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  Результаты готовы
                </h3>
                <p className="text-gray-500">
                  Заполните данные для получения отчёта
                </p>
              </div>

              {/* Прогресс заполнения */}
              <div className="w-full h-1 bg-gray-100 rounded-full mb-6">
                <div
                  className="h-full bg-[#0c7d70] rounded-full transition-all duration-300"
                  style={{
                    width: `${(((name ? 1 : 0) + (email ? 1 : 0) + (phone ? 1 : 0)) / 3) * 100}%`,
                  }}
                />
              </div>

              <form onSubmit={handleSubmitWithAnalysis} className="space-y-5">
                {/* Имя */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-gray-600 text-sm flex items-center gap-1.5"
                  >
                    <PersonOutline
                      fontSize="small"
                      className="text-[#0c7d70]"
                    />
                    Имя
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => {
                        setFocusedField(null);
                        handleBlur("name");
                      }}
                      className={`pl-10 py-3 bg-white border ${
                        nameError
                          ? "border-red-400"
                          : focusedField === "name"
                            ? "border-[#0c7d70]"
                            : "border-gray-200"
                      } rounded-lg focus:border-[#0c7d70] focus:ring-1 focus:ring-[#0c7d70]/20 transition-all hover:border-gray-300`}
                      placeholder="Введите ваше имя"
                    />
                    <PersonOutline
                      className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl transition-colors ${
                        focusedField === "name"
                          ? "text-[#0c7d70]"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  {nameError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      Минимум 3 символа
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-gray-600 text-sm flex items-center gap-1.5"
                  >
                    <EmailOutlined
                      fontSize="small"
                      className="text-[#0c7d70]"
                    />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => {
                        setFocusedField(null);
                        handleBlur("email");
                      }}
                      className={`pl-10 py-3 bg-white border ${
                        emailError
                          ? "border-red-400"
                          : focusedField === "email"
                            ? "border-[#0c7d70]"
                            : "border-gray-200"
                      } rounded-lg focus:border-[#0c7d70] focus:ring-1 focus:ring-[#0c7d70]/20 transition-all hover:border-gray-300`}
                      placeholder="example@gmail.com"
                    />
                    <EmailOutlined
                      className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl transition-colors ${
                        focusedField === "email"
                          ? "text-[#0c7d70]"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      Введите корректный email
                    </motion.p>
                  )}
                </div>

                {/* Телефон */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-gray-600 text-sm flex items-center gap-1.5"
                  >
                    <span className="text-[#0c7d70] text-base">📱</span>
                    Телефон
                  </Label>
                  <PhoneInput
                    country={"kg"}
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => {
                      setFocusedField(null);
                      handleBlur("phone");
                    }}
                    inputProps={{ name: "phone", id: "phone" }}
                    inputStyle={{
                      width: "100%",
                      padding: "12px 12px 12px 58px",
                      borderRadius: "8px",
                      border: phoneError
                        ? "1px solid #f87171"
                        : focusedField === "phone"
                          ? "1px solid #0c7d70"
                          : "1px solid #e5e7eb",
                      color: "#111827",
                      fontSize: "16px",
                      transition: "all 0.2s",
                    }}
                    buttonStyle={{
                      border: "none",
                      background: "transparent",
                      padding: "0 10px",
                    }}
                    dropdownStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      marginTop: "4px",
                    }}
                    enableSearch
                    disableSearchIcon
                    countryCodeEditable={false}
                  />
                  {phoneError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      Некорректный номер
                    </motion.p>
                  )}
                </div>

                {/* Кнопка */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full py-3 bg-[#0c7d70] hover:bg-[#0a6b5f] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Анализ...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Получить результаты
                      <span className="text-lg">→</span>
                    </span>
                  )}
                </Button>
              </form>

              {/* Нижний блок безопасности */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <LockOutlined fontSize="small" className="text-gray-400" />
                <span>SSL-шифрование · Данные только для отчёта</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Стили для react-phone-input */}
      <style>{`
        .react-tel-input .flag-dropdown {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          height: 100% !important;
          background: transparent !important;
          border: none !important;
        }
        .react-tel-input .selected-flag {
          background: transparent !important;
          border-radius: 8px 0 0 8px !important;
          padding: 0 0 0 12px !important;
        }
        .react-tel-input .selected-flag:hover {
          background: rgba(5, 122, 108, 0.05) !important;
        }
      `}</style>
    </div>
  );
};
