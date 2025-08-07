import { FC } from "react";
import { mentors } from "./model/data/mentorData";
import MentorCard from "./MentorCard.ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~app/components/ui/carousel";

export const CardMentor: FC = () => {
  return (
    <section className="mb-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2C2C]">
            Наши Менторы
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full pb-12 mx-auto relative max-[1170px]:max-w-[930px] max-[1175px]:max-w-[800px] max-[900px]:max-w-[608px]  max-[640px]:max-w-[400px] max-[640px]:mx-auto   max-[530px]:max-w-[400px] max-[430px]:max-w-[340px]"
        >
          <CarouselContent className="-ml-4">
            {mentors.map((mentor, index) => (
              <CarouselItem
                key={index}
                className="pl-4                    lg:basis-1/3 
                  max-lg:basis-1/2 
                  max-md:basis-full"
              >
                <div className="py-4 h-full">
                  <div className="mx-auto max-w-[400px] md:max-w-none h-full flex flex-col">
                    <MentorCard mentor={mentor} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Кнопки навигации */}
          <div className="hidden m-sm:block">
            <CarouselPrevious
              className="absolute top-1/2 -translate-y-1/2 left-4"
              variant="ghost"
            />
            <CarouselNext
              className="absolute top-1/2 -translate-y-1/2 right-4"
              variant="ghost"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
