import React from "react";
import { StrongSidesCard } from "~features/tandaStrongSides";
import { ResultChartProps } from "~features/tandaResults";
export const StrongSection: React.FC<ResultChartProps> = ({ results }) => {
  return (
    <div>
      <div className="relative container ">
        <h2 className="my-[20px] text-[#2C2C2C] text-[2.2rem] font-semibold font-[Roboto] text-center">
          Подходящие профессии
        </h2>
        <StrongSidesCard results={results} />
      </div>
    </div>
  );
};
