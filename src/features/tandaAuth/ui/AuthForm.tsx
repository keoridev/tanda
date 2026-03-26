"use client";
import { Button } from "~app/components/ui/button";
import { Input } from "~app/components/ui/input";
import { Label } from "~app/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuthLogic } from "../model/hooks/useAuthLogic";
import { Reveal } from "~shared/lib/framer";
import { useEffect, useState } from "react";
import { PersonOutline, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { AnalysisModal } from "~features/tandaAuth/model/analysis-modal";

interface AuthFormProps {
  testResults?: Record<string, number>;
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
  } = useAuthLogic(testResults);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleSubmitWithAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsAnalyzing(true);
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
      const dropdown = document.querySelector(".react-tel-input .flag-dropdown.open") as HTMLElement;
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
      <AnalysisModal isOpen={isAnalyzing} onClose={() => setIsAnalyzing(false)} progress={analysisProgress} />
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Левая панель — спокойный зеленый фон */}
          <div className="bg-[#057a6c] p-8 md:p-10 text-white flex flex-col justify-center">
            <Reveal from="left" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Ваш карьерный путь начинается здесь
                </h2>
                <p className="text-white/80 text-lg">
                  Получите детальный анализ ваших сильных сторон и персональные рекомендации.
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
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">Результаты готовы</h3>
                <p className="text-gray-500">Заполните данные для получения отчёта</p>
              </div>

              {/* Прогресс заполнения */}
              <div className="w-full h-1 bg-gray-100 rounded-full mb-6">
                <div
                  className="h-full bg-[#057a6c] rounded-full transition-all duration-300"
                  style={{
                    width: `${(((name ? 1 : 0) + (email ? 1 : 0) + (phone ? 1 : 0)) / 3) * 100}%`,
                  }}
                />
              </div>

              <form onSubmit={handleSubmitWithAnalysis} className="space-y-5">
                {/* Имя */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-gray-600 text-sm flex items-center gap-1.5">
                    <PersonOutline fontSize="small" className="text-[#057a6c]" />
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
                        nameError ? "border-red-400" : "border-gray-200"
                      } rounded-lg focus:border-[#057a6c] focus:ring-1 focus:ring-[#057a6c]/20 transition`}
                      placeholder="Имя фамилия"
                    />
                    <PersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                  {nameError && <p className="text-red-500 text-xs">Минимум 3 символа</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-gray-600 text-sm flex items-center gap-1.5">
                    <EmailOutlined fontSize="small" className="text-[#057a6c]" />
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
                        emailError ? "border-red-400" : "border-gray-200"
                      } rounded-lg focus:border-[#057a6c] focus:ring-1 focus:ring-[#057a6c]/20 transition`}
                      placeholder="example@gmail.com"
                    />
                    <EmailOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                  {emailError && <p className="text-red-500 text-xs">Введите корректный email</p>}
                </div>

                {/* Телефон */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-gray-600 text-sm flex items-center gap-1.5">
                    <span className="text-[#057a6c] text-base">📱</span>
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
                      border: phoneError ? "1px solid #f87171" : "1px solid #e5e7eb",
                      color: "#111827",
                      fontSize: "16px",
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
                  {phoneError && <p className="text-red-500 text-xs">Некорректный номер</p>}
                </div>

                {/* Кнопка */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full py-3 bg-[#057a6c] hover:bg-[#046b5e] text-white font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50"
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

              {/* Нижний блок безопасности (для мобильных и десктопа) */}
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