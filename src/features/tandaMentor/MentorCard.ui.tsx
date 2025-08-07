import { FC } from "react";
import { Mentor } from "./model/types/mentorTypes";
import { BadgeCheck, Briefcase, BookOpen, ChevronRight } from "lucide-react";
import defaultMentor from "../../../public/tanda/CardMentor/icon/defaultMentor.png";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: FC<MentorCardProps> = ({ mentor }) => (
  <div className="bg-white h-full rounded-3xl px-8 pt-8 pb-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 flex flex-col">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={mentor.image || defaultMentor}
          alt={mentor.name}
          className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
        />
        <div className="absolute -bottom-2 right-2 bg-teal-500 text-white p-2 rounded-full">
          <BadgeCheck size={20} />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">{mentor.name}</h3>

      <div className="flex flex-wrap justify-center gap-2 ">
        <div className="flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full">
          <Briefcase size={16} className="mr-2" />
          <span className="text-sm font-medium">{mentor.profession}</span>
        </div>

        <div className="flex items-center bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
          <Briefcase size={16} className="mr-2" />
          <span className="text-sm font-medium">Опыт {mentor.experience}</span>
        </div>
      </div>
    </div>

    {/* Детали преподавания */}
    <div className="mb-6">
      <div className="flex items-center bg-gray-50 p-3 rounded-xl mb-4">
        <BookOpen size={20} className="text-gray-500 mr-3" />
        <div>
          <h4 className="text-sm text-gray-500 font-medium">
            Преподаватель по:
          </h4>
          <p className="text-gray-800 font-semibold">{mentor.teacher}</p>
        </div>
      </div>

      <h4 className="text-lg font-bold text-gray-800 mb-3">Пройдете темы:</h4>
      <ul className="space-y-3">
        {mentor.topics.map((topic, index) => (
          <li key={index} className="flex items-start">
            <ChevronRight
              size={18}
              className="text-teal-500 mt-1 mr-2 flex-shrink-0"
            />
            <span className="text-gray-700 font-medium">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MentorCard;
