import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/HeaderImg.svg";
import questionImg from "../../../public/tanda/question.png";
import timeImg from "../../../public/tanda/time.png";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";
export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-[0] pr-5 pb-5 pl-5 ">
      <Reveal from="top" delay={0.3}>
        <img
          src={HomeImg}
          alt="Header"
          className="m-auto max-md:max-w-60 max-w-96"
        />
      </Reveal>
      <Reveal from="bottom" delay={0.3}>
        <h4 className="text-5xl text-[#2C2C2C] font-bold  mt-6 max-md:text-[32px] max-sm:text-[26px]">
          Узнайте, какая профессия <br /> вам подходит
        </h4>
        <p className="leading-[24px] text-[20px] font-semibold  text-[#888888] mt-5 r-sm:text-base">
          Получите подробный отчёт от профориентологов <br /> и найдите дело по
          душе
        </p>
      </Reveal>
      <div className="flex justify-center items-center max-sm:gap-3 max-md:gap-4 gap-5 flex-wrap max-[360px]:grid mt-6">
        <Reveal from="left" delay={0.3}>
          <div className="flex items-center bg-[#E0E0E0] text-[#2C2C2C] rounded-full px-4 py-2 r-sm:text-sm text-base font-medium font-[Graphik,sans-serif]">
            <img src={questionImg} alt="questions" className="w-8 h-8 mr-2" />
            14 вопросов
          </div>
        </Reveal>
        <Reveal from="right" delay={0.3}>
          <div className="flex items-center bg-[#E0E0E0] text-[#2C2C2C] rounded-full px-4 py-2 max-sm:text-sm text-base font-medium font-[Graphik,sans-serif]">
            <img src={timeImg} alt="time" className="w-8 h-8 mr-2" />
            ~2 минуты
          </div>
        </Reveal>
      </div>
      <Reveal from="bottom" delay={0.3}>
        <Button
          className="bg-[#005B50] hover:bg-[#004b45] "
          onClick={() => navigate('/test')}
          style={{
            borderRadius: "20px",
            fontSize: "16px",
            padding: "20px 80px",
            margin: "30px",
            maxWidth: "100%",
          }}
        >
          Пройти тест
        </Button>
      </Reveal>
    </div>
  );
};
