// features/StrongSides/ui/StrongSidesCard/StrongSidesCard.tsx
import { FC } from "react";
import { useStrongSides } from "./model/lib/useStrongSides";
import { ProfessionData } from "./model/types/strongSidesTypes";
import star from "../../../public/tanda/StrongSides/icon-star.png";
import { skillToProfessions } from "./model/StrongSideData";
import { ResultChartProps } from "~features/tandaResults";
import { Box } from "@mui/material";
export const StrongSidesCard: FC<ResultChartProps> = ({ results }) => {
  const { topSkills } = useStrongSides(results);

  if (!results || topSkills.length === 0) {
    return <p className="text-center py-4">Результаты теста пока недоступны</p>;
  }

  return (
    <div>
      {topSkills.map((item, index) => {
        const data: ProfessionData | undefined = skillToProfessions[item.skill];

        if (!data) {
          return null;
        }

        return (
          <Box
            key={index}
            className="flex gap-x-[10px] px-4  max-[1075px]:grid max-[1075px]:gap-[10px] mb-10 rounded-[20px]"
          >
            <Box
              style={{ flex: "0 0 540px" }}
              className={`py-12 px-[40px] w-full rounded-[20px] flex flex-col items-center min-h-[468px] text-center ${data?.backgroundColor}`}
            >
              <Box className="flex items-center w-full justify-center gap-x-[8px] gap-1 bg-[#242424] min-w-[108px] px-5 py-[10px] rounded-[32px] whitespace-nowrap">
                <img src={star} alt="Star" className="w-9 h-9" />
                <span className="text-white font-medium text-[18px] font-[Roboto]">
                  {item.score}% совпадение
                </span>
              </Box>
              <h3 className="text-2xl  font-semibold mt-[15px] mb-[20px] font-[Roboto]">
                {item.skill}
              </h3>
              {data.professions?.map((profession, idx) => (
                <h5
                  key={idx}
                  className="mb-5 font-medium text-[18px] font-[Roboto]"
                >
                  Профессия: <strong>{profession}</strong>
                </h5>
              ))}
              {data?.image && (
                <img
                  src={data.image}
                  alt={item.skill}
                  className="max-h-60 max-w-full m-0"
                />
              )}
            </Box>
            <Box className="pt-[56px] pr-[56px] pb-[18px] pl-[56px] shadow-sm max-[430px]:px-[20px]  bg-[#F5F5F5] rounded-xl ">
              <h3 className="text-2xl text-[#2C2C2C] font-semibold mb-2 ">
                Почему подходит
              </h3>
              <p className="text-lg mb-5 font-medium text-[#6E6E6E]  ">
                {data.reason || "Информация недоступна"}
              </p>
              <h4 className="text-2xl font-semibold mb-2 text-[#2C2C2C]">
                Суть профессии
              </h4>
              <ul className="space-y-2">
                {data?.professions?.map((_, idx) => (
                  <li key={idx} className="text-lg font-medium text-[#6E6E6E] ">
                    {data.description || "Описание недоступно"}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        );
      })}
    </div>
  );
};
