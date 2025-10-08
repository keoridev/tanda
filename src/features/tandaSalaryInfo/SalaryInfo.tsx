import { FC } from "react";
import { motion } from "framer-motion";
import { professionData } from "./model/data/salaryInfoData";
import { SalaryInfoCard } from "./SalaryInfoCard.ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~app/components/ui/carousel";
import { TrendingUp, BookOpen } from "lucide-react";

export const SalaryInfo: FC = () => {
  return (
    <section
      className="relative py-16 bg-gradient-to-br my-6 rounded-3xl "
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl shadow-lg"
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800  mb-4">
            <span className="">Каталог направлений</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Исследуйте востребованные IT-профессии и их зарплатные ожидания
          </p>
        </motion.div>

        {/* Carousel with responsive container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full pb-12 relative mx-auto   max-w-[1200px]   max-[1200px]:max-w-[1148px]  /* 1200 - 52 = 1148 /   max-[1180px]:max-w-[1128px]  / 1180 - 20 = 1128 /   max-[1160px]:max-w-[1108px]  / 1160 - 20 = 1108 /   max-[1140px]:max-w-[1088px]  / 1140 - 20 = 1088 /   max-[1120px]:max-w-[1068px]  / 1120 - 20 = 1068 /   max-[1100px]:max-w-[1048px]  / 1100 - 20 = 1048 /   max-[1080px]:max-w-[1028px]  / 1080 - 20 = 1028 /   max-[1060px]:max-w-[1008px]  / 1060 - 20 = 1008 /   max-[1040px]:max-w-[988px]   / 1040 - 20 = 988 /   max-[1020px]:max-w-[968px]   / 1020 - 20 = 968 /   max-[1000px]:max-w-[948px]   / 1000 - 20 = 948 /   max-[980px]:max-w-[928px]    / 980 - 20 = 928 /   max-[960px]:max-w-[908px]    / 960 - 20 = 908 /   max-[940px]:max-w-[888px]    / 940 - 20 = 888 /   max-[920px]:max-w-[868px]    / 920 - 20 = 868 /   max-[900px]:max-w-[848px]    / 900 - 20 = 848 /   max-[880px]:max-w-[828px]    / 880 - 20 = 828 /   max-[860px]:max-w-[808px]    / 860 - 20 = 808 /   max-[840px]:max-w-[788px]    / 840 - 20 = 788 /   max-[820px]:max-w-[768px]    / 820 - 20 = 768 /   max-[800px]:max-w-[748px]    / 800 - 20 = 748 /   max-[780px]:max-w-[728px]    / 780 - 20 = 728 /   max-[760px]:max-w-[708px]    / 760 - 20 = 708 /   max-[740px]:max-w-[688px]    / 740 - 20 = 688 /   max-[720px]:max-w-[668px]    / 720 - 20 = 668 /   max-[700px]:max-w-[648px]    / 700 - 20 = 648 /   max-[680px]:max-w-[628px]    / 680 - 20 = 628 /   max-[660px]:max-w-[608px]    / 660 - 20 = 608 /   max-[640px]:max-w-[588px]    / 640 - 20 = 588 /   max-[620px]:max-w-[568px]    / 620 - 20 = 568 /   max-[600px]:max-w-[548px]    / 600 - 20 = 548 /   max-[580px]:max-w-[528px]    / 580 - 20 = 528 /   max-[560px]:max-w-[508px]    / 560 - 20 = 508 /   max-[540px]:max-w-[488px]    / 540 - 20 = 488 /   max-[520px]:max-w-[468px]    / 520 - 20 = 468 /   max-[500px]:max-w-[448px]    / 500 - 20 = 448 /   max-[480px]:max-w-[428px]    / 480 - 20 = 428 /   max-[460px]:max-w-[408px]    / 460 - 20 = 408 /   max-[440px]:max-w-[388px]    / 440 - 20 = 388 /   max-[420px]:max-w-[368px]    / 420 - 20 = 368 /   max-[400px]:max-w-[348px]"
          >
            <CarouselContent className="-ml-6">
              {professionData.map((profession, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 lg:basis-1/3 md:basis-1/2 basis-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full py-2"
                  >
                    <SalaryInfoCard profession={profession} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="">
              <CarouselPrevious className="absolute left-[-10px]  -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-teal-400 hover:bg-white transition-all shadow-lg" />
              <CarouselNext className="absolute right-[-10px] -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-teal-400 hover:bg-white transition-all shadow-lg" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
            <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">6</h3>
            <p className="text-gray-600">IT-направлений</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">₸</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">120k+</h3>
            <p className="text-gray-600">Средняя зарплата</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
            <p className="text-gray-600">Трудоустройство</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
