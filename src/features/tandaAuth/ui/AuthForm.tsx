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
  ArrowForward,
  StarOutlined,
  TrendingUpOutlined,
  PsychologyOutlined,
  AutoAwesomeOutlined,
  LockOutlined,
} from "@mui/icons-material";
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

  // Добавьте эту функцию
  const handleSubmitWithAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Показываем модальное окно анализа
    setIsAnalyzing(true);

    // Имитация процесса анализа
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // После завершения анализа делаем реальный submit
          setTimeout(() => {
            handleSubmit(e); // Вызываем оригинальную функцию
            setIsAnalyzing(false);
            setAnalysisProgress(0);
          }, 1000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const dropdown = document.querySelector(
        ".react-tel-input .flag-dropdown"
      ) as HTMLElement;
      if (dropdown) {
        dropdown.style.position = "absolute";
        dropdown.style.top = "0";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fix phone input dropdown positioning
  useEffect(() => {
    if (!isMounted) return;

    const observer = new MutationObserver(() => {
      const dropdown = document.querySelector(
        ".react-tel-input .flag-dropdown.open"
      ) as HTMLElement;
      if (dropdown) {
        dropdown.style.position = "absolute";
        dropdown.style.top = "100%";
        dropdown.style.left = "0";
        dropdown.style.zIndex = "1000";
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isMounted]);

  const benefits = [
    {
      icon: PsychologyOutlined,
      text: "Персональный анализ",
      color: "bg-teal-100 text-teal-700",
    },
    {
      icon: TrendingUpOutlined,
      text: "Рекомендации роста",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: StarOutlined,
      text: "Экспертная оценка",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="animate-pulse">Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <AnalysisModal
        isOpen={isAnalyzing}
        onClose={() => {
          setIsAnalyzing(false);
          setAnalysisProgress(0);
        }}
        progress={analysisProgress}
      />
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left side - Illustration and Benefits */}
          <div className="bg-[#057a6c] p-8 text-white hidden md:block">
            <Reveal from="left" delay={0.2}>
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
                    <AutoAwesomeOutlined className="text-3xl text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    Ваш карьерный путь начинается здесь
                  </h2>
                  <p className="text-teal-100 text-lg opacity-90">
                    Получите детальный анализ ваших сильных сторон и
                    персональные рекомендации
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-200"
                    >
                      <div
                        className={`p-3 rounded-lg ${benefit.color} bg-white/20 mr-4`}
                      >
                        <benefit.icon className="text-xl" />
                      </div>
                      <span className="font-semibold">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right side - Form */}
          <div className="p-8 md:p-12">
            <Reveal from="right" delay={0.4}>
              {/* Enhanced Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-4 mx-auto">
                  <AutoAwesomeOutlined className="text-teal-700 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ✨ Результаты готовы!
                </h3>
                <p className="text-gray-600 mb-4">
                  Заполните данные для получения персонального отчета
                </p>

                {/* Progress indicator */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (((name ? 1 : 0) + (email ? 1 : 0) + (phone ? 1 : 0)) /
                          3) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Form Container with subtle background */}
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200/50 mb-6">
                <form onSubmit={handleSubmitWithAnalysis} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-700 font-semibold flex items-center"
                    >
                      <PersonOutline
                        className="mr-2 text-teal-600"
                        fontSize="small"
                      />
                      Ваше имя
                    </Label>
                    <div className="relative group">
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
                        className={`pl-12 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 
                           transition-all duration-200 rounded-xl
                          ${
                            nameError
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : ""
                          }
                          group-hover:border-gray-300`}
                        placeholder="Иван Иванов"
                      />
                      <PersonOutline
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors"
                        fontSize="small"
                      />
                    </div>
                    {nameError && (
                      <p className="text-red-600 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        Имя должно быть не менее 3 символов
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-semibold flex items-center"
                    >
                      <EmailOutlined
                        className="mr-2 text-teal-600"
                        fontSize="small"
                      />
                      Email адрес
                    </Label>
                    <div className="relative group">
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
                        className={`pl-12 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 
                           transition-all duration-200 rounded-xl
                          ${
                            emailError
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : ""
                          }
                          group-hover:border-gray-300`}
                        placeholder="ivan@gmail.com"
                      />
                      <EmailOutlined
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors"
                        fontSize="small"
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-600 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        Введите корректный email
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 font-semibold flex items-center"
                    >
                      <span className="mr-2">📱</span>
                      Номер телефона
                    </Label>
                    <div className="relative group">
                      <div className="react-tel-input-wrapper">
                        <PhoneInput
                          country={"kg"}
                          value={phone}
                          onChange={handlePhoneChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => {
                            setFocusedField(null);
                            handleBlur("phone");
                          }}
                          inputProps={{
                            required: true,
                            name: "phone",
                            id: "phone",
                            autoComplete: "tel",
                          }}
                          inputStyle={{
                            width: "100%",
                            padding: "16px 16px 16px 70px",
                            borderRadius: "12px",
                            backgroundColor: "white",
                            border: phoneError
                              ? "2px solid #ef4444"
                              : "2px solid #e5e7eb",
                            color: "#111827",
                            fontSize: "16px",
                            transition: "all 0.2s ease",
                          }}
                          buttonStyle={{
                            backgroundColor: "white",
                            border: phoneError
                              ? "2px solid #ef4444"
                              : "2px solid #e5e7eb",
                            borderRadius: "12px 0 0 12px",
                            padding: "0 12px",
                          }}
                          dropdownStyle={{
                            backgroundColor: "white",
                            border: "2px solid #e5e7eb",
                            borderRadius: "12px",
                            marginTop: "8px",
                            color: "#111827",
                            zIndex: 1000,
                            position: "absolute",
                            top: "100%",
                            left: "0",
                          }}
                          enableSearch
                          disableSearchIcon
                          countryCodeEditable={false}
                        />
                      </div>
                    </div>
                    {phoneError && (
                      <p className="text-red-600 text-sm flex items-center">
                        <span className="mr-1">⚠️</span>
                        Введите корректный номер телефона
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full py-4 px-6 text-white text-base font-bold bg-gradient-to-r from-teal-600 to-teal-700 
                      hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-[1.02] 
                      rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                      shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          <span>Анализируем результаты...</span>
                        </>
                      ) : (
                        <>
                          <span>🚀 Получить результаты</span>
                          <ArrowForward className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </div>

              {/* Mobile only blocks */}
              <div className="md:hidden">
                {/* Enhanced Security notice - MOBILE ONLY */}
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center bg-teal-100 px-3 py-1 rounded-full">
                      <LockOutlined
                        className="text-teal-600 mr-2"
                        fontSize="small"
                      />
                      <span className="text-sm font-medium text-teal-700">
                        Безопасность
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-teal-600 text-center">
                    🔒 Все данные защищены SSL-шифрованием и будут
                    использоваться исключительно для формирования вашего
                    персонального отчета
                  </p>
                </div>

                {/* Quick benefits preview - MOBILE ONLY */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                    📋 Что вы получите:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-teal-50 transition-all duration-200"
                      >
                        <div
                          className={`p-1 rounded-lg ${benefit.color} mx-auto mb-1`}
                        >
                          <benefit.icon className="text-xs" />
                        </div>
                        <p className="text-[10px] text-gray-600 font-medium leading-tight">
                          {benefit.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .react-tel-input .flag-dropdown {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }

        .react-tel-input .country-list {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          z-index: 1000 !important;
        }

        .react-tel-input-wrapper {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};
