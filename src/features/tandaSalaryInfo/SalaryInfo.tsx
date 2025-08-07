import { FC } from "react";
import { professionData } from "./model/data/salaryInfoData";
import { SalaryInfoCard } from "./SalaryInfoCard.ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~app/components/ui/carousel";

export const SalaryInfo: FC = () => {
  return (
    <section className="py-8">
      <div className=" mx-auto px-4">
        <h2 className="text-3xl text-[#2C2C2C] font-bold text-center mb-8">
          Каталог направлений
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full pb-12 relative mx-auto max-[1170px]:max-w-[930px] max-[1075px]:max-w-[800px] max-[900px]:max-w-[688px]  max-[640px]:max-w-[400px] max-[640px]:mx-auto   max-[530px]:max-w-[400px] max-[430px]:max-w-[340px]"
        >
          <CarouselContent className="-ml-4">
            {professionData.map((profession, index) => (
              <CarouselItem
                key={index}
                className="pl-4  lg:basis-1/3 
                  max-lg:basis-1/2 
                  max-md:basis-full"
              >
                <div className="py-4 h-full">
                  <SalaryInfoCard profession={profession} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Навигационные кнопки */}
          <div className="hidden m-sm:block">
            <CarouselPrevious
              className="absolute top-1/2 -translate-y-1/2 left-4"
              variant="ghost"
              size="lg"
            />
            <CarouselNext
              className="absolute top-1/2 -translate-y-1/2 right-4"
              variant="ghost"
              size="lg"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
