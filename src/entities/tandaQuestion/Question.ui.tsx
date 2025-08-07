import { useEffect } from "react";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import { Question as QuestionType } from "~entities/tandaQuestion";
import { Progress } from "~app/components/ui/progress";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";

interface QuestionProps {
  question: QuestionType;
  selectedOption: string;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestion: number;
}

export const QuestionCard: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onOptionChange,
  onNextQuestion,
  onPreviousQuestion,
  currentQuestionIndex,
  totalQuestion,
}) => {
  const progressValue = ((currentQuestionIndex + 1) / totalQuestion) * 100;

  useEffect(() => {
    if (selectedOption) {
      const timer = setTimeout(() => {
        onNextQuestion();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, onNextQuestion]);

  const handleOptionClick = (optionValue: string) => {
    const event = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onOptionChange(event);
  };

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div
        className="w-full flex flex-col items-center px-4 sm:px-0"
        style={{ maxWidth: "680px" }}
      >
        {/* Progress line */}
        <Reveal from="bottom" delay={0.3}>
          <div className="flex items-center gap-x-6 pb-4 w-full">
            <span className="text-slate-500 font-semibold text-sm">
              {currentQuestionIndex + 1} / {totalQuestion}
            </span>
            <Progress value={progressValue} className="h-2 w-64" />
          </div>
        </Reveal>

        {/* Question card */}
        <div
          className="relative w-full bg-white rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 flex flex-col"
          style={{
            height: "500px",
            minHeight: "500px",
            maxHeight: "500px",
          }}
        >
          {/* Question - фиксированная высота с возможностью прокрутки */}
          <Reveal from="top" delay={0.3}>
            <div className="h-[80px] sm:h-[90px] overflow-y-auto mb-4">
              <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold leading-snug pr-2">
                {question.question}
              </h2>
            </div>
          </Reveal>

          {/* Options - фиксированная высота с прокруткой */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "280px" }}
          >
            <ul className="space-y-2 pr-2">
              {question.options.map((option, idx) => (
                <Reveal key={option.value} from="left" delay={idx * 0.1 + 0.3}>
                  <li
                    className="flex items-center min-h-[60px] rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 bg-slate-50 hover:bg-green-100 transition cursor-pointer border border-transparent hover:border-indigo-300"
                    onClick={() => handleOptionClick(option.value)}
                  >
                    <Radio
                      checked={selectedOption === option.value}
                      onChange={onOptionChange}
                      value={option.value}
                      sx={{
                        color: "#005B50",
                        "&.Mui-checked": { color: "#4f46e5" },
                      }}
                      size="small"
                      className="!p-1 sm:!p-2"
                    />
                    <Typography
                      variant="body1"
                      className="ml-2 text-slate-700 text-base sm:text-lg line-clamp-2 flex-1"
                    >
                      {option.text}
                    </Typography>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Back button */}
          <div className="flex justify-center  pt-2">
            <Reveal from="bottom" delay={0.4}>
              <Button
                onClick={onPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="rounded-[20px] px-[70px] py-[10px] bg-[#005B50] hover:bg-[#004b45] text-white font-medium text-[16px] transition-colors duration-150"
              >
                Назад
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};
