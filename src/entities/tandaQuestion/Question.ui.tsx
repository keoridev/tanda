import { Typography } from "@mui/material";
import { useEffect } from "react";
import { Question as QuestionType } from "~entities/tandaQuestion";
import { Progress } from "~app/components/ui/progress";
import { Button } from "~app/components/ui/button";
import { motion } from "framer-motion";

interface QuestionProps {
  question: QuestionType;
  selectedOption: string;
  onOptionChange: (value: string) => void;
  onSubmit: () => void;
  onPreviousQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
}

const optionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
  selected: {
    scale: 1.02,
    backgroundColor: "#f0fdf4",
    borderColor: "#4f46e5",
  },
};

export const QuestionCard: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onOptionChange,
  onSubmit,
  onPreviousQuestion,
  currentQuestionIndex,
  totalQuestions,
  isSubmitting,
}) => {
  const progressValue = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (selectedOption && !isSubmitting) {
      const timer = setTimeout(() => {
        onSubmit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, isSubmitting, onSubmit]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Progress */}
      <div className="flex items-center gap-4 w-full mb-6">
        <span className="text-sm font-medium ">
          Вопрос {currentQuestionIndex + 1} из {totalQuestions}
        </span>
        <Progress
          value={progressValue}
          className="h-2 flex-1 bg-indigo-100"
          indicatorClassName="bg-indigo-600"
        />
      </div>

      {/* Question Card */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Question */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">
          {question.options.map((option, idx) => (
            <motion.div
              key={option.value}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              whileHover={!selectedOption ? { scale: 1.01 } : {}}
              variants={optionVariants}
              animate={selectedOption === option.value ? "selected" : "visible"}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedOption === option.value
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              } ${isSubmitting ? "opacity-70 pointer-events-none" : ""}`}
              onClick={() => !isSubmitting && onOptionChange(option.value)}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedOption === option.value
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedOption === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <Typography className="text-gray-700">{option.text}</Typography>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-gray-100 flex justify-between">
          <Button
            onClick={onPreviousQuestion}
            disabled={currentQuestionIndex === 0 || isSubmitting}
            variant="outline"
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Назад
          </Button>

          {selectedOption && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center"
            >
              <span className="text-sm text-gray-500 mr-2">
                Автоматически продолжается...
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
