import { motion } from "framer-motion";
import { CheckCircleOutline } from "@mui/icons-material";

interface Option {
  value: string;
  text: string;
}

interface OptionsListProps {
  options: Option[];
  selectedOption: string | null;
  isSubmitting: boolean;
  onOptionSelect: (value: string) => void;
  isCompact?: boolean;
}

export const OptionsList = ({
  options,
  selectedOption,
  isSubmitting,
  onOptionSelect,
  isCompact = false,
}: OptionsListProps) => {
  return (
    <div className="space-y-2">
      {options.map((option, idx) => {
        const isSelected = selectedOption === option.value;
        
        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => !isSubmitting && onOptionSelect(option.value)}
            disabled={isSubmitting}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              isSelected
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center">
              {/* Индикатор выбора */}
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                isSelected
                  ? "border-green-600 bg-green-600"
                  : "border-gray-400"
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              {/* Буква варианта */}
              <div className="w-6 flex-shrink-0 mr-3">
                <span className={`text-sm font-medium ${
                  isSelected ? "text-green-700" : "text-gray-600"
                }`}>
                  {option.value}.
                </span>
              </div>

              {/* Текст варианта */}
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${
                  isSelected ? "text-gray-900" : "text-gray-700"
                }`}>
                  {option.text}
                </p>
              </div>

              {/* Иконка подтверждения */}
              {isSelected && (
                <div className="flex-shrink-0 ml-2">
                  <CheckCircleOutline 
                    className="text-green-600" 
                    fontSize="small"
                  />
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};