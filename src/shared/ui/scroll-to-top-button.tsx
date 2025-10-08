import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "lucide-react"; // Или другая иконка

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Функция для прокрутки наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавная прокрутка
    });
  };

  // Следим за scroll событием, чтобы показать/скрыть кнопку
  useEffect(() => {
    const toggleVisibility = () => {
      // Показываем кнопку, когда пользователь проскроллил больше высоты 2-х экранов
      // Или можно использовать конкретный элемент (section) для отслеживания
      if (window.pageYOffset > window.innerHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Рендерим кнопку только если isVisible = true
  return isVisible ? (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-[#005B50] hover:bg-[#005B50] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#297c73]"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  ) : null;
};
