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
    <div className={`space-y-2 ${isCompact ? 'mt-2' : 'mt-4'}`}>
      {options.map((option, idx) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: isCompact ? 1.005 : 1.01 }}
          whileTap={{ scale: 0.995 }}
          className={`group relative cursor-pointer transition-all duration-200 ${
            isCompact ? 'p-3 rounded-xl' : 'p-4 rounded-2xl'
          } border-2 ${
            selectedOption === option.value
              ? "border-[#0c7d70] bg-[#e6f4f2] shadow-sm"
              : "border-gray-200 hover:border-[#0c7d70] hover:bg-gray-50"
          } ${isSubmitting ? "opacity-60 pointer-events-none" : ""}`}
          onClick={() => onOptionSelect(option.value)}
        >
          <div className="flex items-center">
            {/* Радио-кнопка */}
            <div
              className={`flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isCompact ? 'w-5 h-5 mr-3' : 'w-6 h-6 mr-4'
              } ${
                selectedOption === option.value
                  ? "border-[#0c7d70] bg-[#0c7d70] scale-105"
                  : "border-gray-300 group-hover:border-[#0c7d70]"
              }`}
            >
              {selectedOption === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`bg-white rounded-full ${
                    isCompact ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'
                  }`}
                />
              )}
            </div>

            {/* Текст варианта */}
            <div className="flex-1 min-w-0">
              <p
                className={`transition-colors duration-200 ${
                  isCompact ? 'text-sm leading-tight' : 'text-base'
                } ${
                  selectedOption === option.value
                    ? "text-[#0c7d70] font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.text}
              </p>
            </div>

            {/* Иконка подтверждения */}
            {selectedOption === option.value && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex-shrink-0 ${
                  isCompact ? 'ml-2' : 'ml-3'
                }`}
              >
                <CheckCircleOutline 
                  className="text-[#0c7d70]" 
                  fontSize={isCompact ? "small" : "medium"} 
                />
              </motion.div>
            )}
          </div>

          {/* Фон для выбранного варианта */}
          {selectedOption === option.value && (
            <motion.div
              className="absolute inset-0 bg-[#e6f4f2] rounded-2xl -z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};