"use client";
import { Button } from "~app/components/ui/button";
import { Input } from "~app/components/ui/input";
import { Label } from "~app/components/ui/label";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuthLogic } from "../model/hooks/useAuthLogic";
import { Reveal } from "~shared/lib/framer";
import { useEffect, useRef } from "react";
import {
  PersonOutline,
  EmailOutlined,
  ArrowForward,
  VerifiedUserOutlined,
} from "@mui/icons-material";

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

  const phoneInputRef = useRef<PhoneInputProps>(null);

  useEffect(() => {
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

  return (
    <Reveal from="bottom" delay={0.3}>
      <div className="p-5 pb-20 flex justify-center items-center min-h-[80vh]">
        <div className="bg-gradient-to-br from-white to-[#f0fdfa] rounded-3xl shadow-xl max-w-md w-full p-10 mx-auto border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Результаты теста готовы!
            </h3>
            <p className="text-gray-500 font-medium">
              Заполните форму, чтобы получить персональные рекомендации
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-700 font-medium flex items-center"
              >
                <PersonOutline
                  className="mr-2 text-teal-600"
                  fontSize="small"
                />
                Ваше Имя
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`pl-10 py-5 ${
                    nameError
                      ? "border-red"
                      : "border-gray-300 focus:border-teal-500"
                  }`}
                  placeholder="Введите ваше имя"
                />
                <PersonOutline
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fontSize="small"
                />
              </div>
              {nameError && (
                <p className="text-[red] text-sm mt-1">
                  Имя должно быть не менее 3 символов
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 font-medium flex items-center"
              >
                <EmailOutlined
                  className="mr-2 text-teal-600"
                  fontSize="small"
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
                  onBlur={() => handleBlur("email")}
                  className={`pl-10 py-5 ${
                    emailError
                      ? "border-red-500"
                      : "border-gray-300 focus:border-teal-500"
                  }`}
                  placeholder="Введите ваш email"
                />
                <EmailOutlined
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fontSize="small"
                />
              </div>
              {emailError && (
                <p className="text-[red] text-sm mt-1">
                  Введите корректный email
                </p>
              )}
            </div>

            <div className="space-y-1 text-left relative">
              <Label htmlFor="phone" className="text-[#000]">
                Номер телефона
              </Label>
              <div className="relative">
                <PhoneInput
                  country={"kg"}
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur("phone")}
                  inputProps={{
                    required: true,
                    name: "phone",
                    id: "phone",
                  }}
                  localization={{
                    countrySelectorLabel: "Код страны",
                    countrySelectorError: "Выберите страну",
                    phoneNumberInput: "Номер телефона",
                    example: "Пример:",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    padding: "10px 14px 10px 58px",
                    borderRadius: "6px",
                    borderColor: phoneError ? "#ef4444" : "#d1d5db",
                  }}
                  buttonStyle={{
                    borderColor: phoneError ? "#ef4444" : "#d1d5db",
                    backgroundColor: "white",
                    borderRadius: "6px 0 0 6px",
                    height: "40px",
                  }}
                  dropdownStyle={{
                    position: "absolute",
                    top: "100%",
                    bottom: "auto",
                    width: "300px",
                    borderRadius: "6px",
                    marginTop: "4px",
                    zIndex: 10,
                  }}
                  enableSearch
                  disableSearchIcon
                  countryCodeEditable={false}
                />
              </div>
              {phoneError && (
                <p className="text-[red] text-sm">
                  Введите корректный номер телефона
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="mt-6 w-full py-6 text-white text-base font-bold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] shadow-lg rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Показать результаты"}
              {!isSubmitting && <ArrowForward className="ml-2  text-lg" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm flex items-center justify-center">
            <VerifiedUserOutlined
              className="mr-1 text-gray-400"
              fontSize="small"
            />
            <p>Ваши данные защищены и не будут переданы третьим лицам</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
