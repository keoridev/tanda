import { FC } from "react";
import { Button } from "~app/components/ui/button";
import { Profession } from "./model/types/salaryInfoTypes";
import { TrendingUp, School, ArrowForward } from "@mui/icons-material";

interface SalaryInfoCardProps {
  profession: Profession;
}

export const SalaryInfoCard: FC<SalaryInfoCardProps> = ({ profession }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:border-teal-500">
      <div className="flex-grow">
        {/* Заголовок с иконкой */}
        <div className="flex items-start mb-4">
          <div className="bg-teal-100 p-3 rounded-xl mr-4">
            <School className="text-teal-600 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {profession.title}
          </h3>
        </div>

        {/* Зарплаты */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center bg-gray px-4 rounded-xl">
            <div className="bg-amber-100 p-2 rounded-lg mr-4">
              <TrendingUp className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Новичок</p>
              <p className="text-xl font-bold text-gray-800">
                {profession.salaryBeginner.toLocaleString()} сом
              </p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-xl">
            <div className="bg-green-100 p-2 rounded-lg mr-4">
              <TrendingUp className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Профессионал</p>
              <p className="text-xl font-bold text-gray-800">
                {profession.salaryPro.toLocaleString()} сом
              </p>
            </div>
          </div>
        </div>

        {/* Описание */}
        <p className="text-gray-600 mb-6 line-clamp-4 leading-relaxed">
          {profession.description}
        </p>
      </div>

      {/* Кнопка */}
      <Button
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all group-hover:shadow-md"
        onClick={() => window.open(profession.link, "_blank")}
      >
        Читать подробнее
        <ArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};