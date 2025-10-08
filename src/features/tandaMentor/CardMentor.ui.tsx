import { FC } from "react";
import { mentors } from "./model/data/mentorData";
import { MentorCard } from "./MentorCard.ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~app/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselPrevious, CarouselNext } from "~app/components/ui/carousel";

export const CardMentor: FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <section className=" my-6 relative ">
      <div className="max-w-[1200px]  py-16 mx-auto  rounded-3xl px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Наши Менторы
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Опытные специалисты готовы поделиться знаниями и помочь в развитии
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full pb-12 relative mx-auto
  max-w-[1200px]
  max-[1200px]:max-w-[1148px]  /* 1200 - 52 = 1148 */
  max-[1180px]:max-w-[1128px]  /* 1180 - 20 = 1128 */
  max-[1160px]:max-w-[1108px]  /* 1160 - 20 = 1108 */
  max-[1140px]:max-w-[1088px]  /* 1140 - 20 = 1088 */
  max-[1120px]:max-w-[1068px]  /* 1120 - 20 = 1068 */
  max-[1100px]:max-w-[1048px]  /* 1100 - 20 = 1048 */
  max-[1080px]:max-w-[1028px]  /* 1080 - 20 = 1028 */
  max-[1060px]:max-w-[1008px]  /* 1060 - 20 = 1008 */
  max-[1040px]:max-w-[988px]   /* 1040 - 20 = 988 */
  max-[1020px]:max-w-[968px]   /* 1020 - 20 = 968 */
  max-[1000px]:max-w-[948px]   /* 1000 - 20 = 948 */
  max-[980px]:max-w-[928px]    /* 980 - 20 = 928 */
  max-[960px]:max-w-[908px]    /* 960 - 20 = 908 */
  max-[940px]:max-w-[888px]    /* 940 - 20 = 888 */
  max-[920px]:max-w-[868px]    /* 920 - 20 = 868 */
  max-[900px]:max-w-[848px]    /* 900 - 20 = 848 */
  max-[880px]:max-w-[828px]    /* 880 - 20 = 828 */
  max-[860px]:max-w-[808px]    /* 860 - 20 = 808 */
  max-[840px]:max-w-[788px]    /* 840 - 20 = 788 */
  max-[820px]:max-w-[768px]    /* 820 - 20 = 768 */
  max-[800px]:max-w-[748px]    /* 800 - 20 = 748 */
  max-[780px]:max-w-[728px]    /* 780 - 20 = 728 */
  max-[760px]:max-w-[708px]    /* 760 - 20 = 708 */
  max-[740px]:max-w-[688px]    /* 740 - 20 = 688 */
  max-[720px]:max-w-[668px]    /* 720 - 20 = 668 */
  max-[700px]:max-w-[648px]    /* 700 - 20 = 648 */
  max-[680px]:max-w-[628px]    /* 680 - 20 = 628 */
  max-[660px]:max-w-[608px]    /* 660 - 20 = 608 */
  max-[640px]:max-w-[588px]    /* 640 - 20 = 588 */
  max-[620px]:max-w-[568px]    /* 620 - 20 = 568 */
  max-[600px]:max-w-[548px]    /* 600 - 20 = 548 */
  max-[580px]:max-w-[528px]    /* 580 - 20 = 528 */
  max-[560px]:max-w-[508px]    /* 560 - 20 = 508 */
  max-[540px]:max-w-[488px]    /* 540 - 20 = 488 */
  max-[520px]:max-w-[468px]    /* 520 - 20 = 468 */
  max-[500px]:max-w-[448px]    /* 500 - 20 = 448 */
  max-[480px]:max-w-[428px]    /* 480 - 20 = 428 */
  max-[460px]:max-w-[408px]    /* 460 - 20 = 408 */
  max-[440px]:max-w-[388px]    /* 440 - 20 = 388 */
  max-[420px]:max-w-[368px]    /* 420 - 20 = 368 */
  max-[400px]:max-w-[348px]"
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
                  <div className="mx-auto  md:max-w-none h-full flex flex-col">
                    <MentorCard mentor={mentor} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="">
            <CarouselPrevious className="absolute left-[-10px]  -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-teal-400 hover:bg-white transition-all shadow-lg" />
            <CarouselNext className="absolute right-[-10px] -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-teal-400 hover:bg-white transition-all shadow-lg" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
