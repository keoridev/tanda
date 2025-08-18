import { FC, memo } from "react";
import { Mentor } from "./model/types/mentorTypes";
import {
  BadgeCheck,
  Briefcase,
  BookOpen,
  ChevronRight,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import defaultMentor from "../../../public/tanda/CardMentor/icon/defaultMentor.png";
import { useNavigate } from "react-router-dom";
import { pathKeys } from "~shared/lib";
interface MentorCardProps {
  mentor: Mentor;
}

export const MentorCard: FC<MentorCardProps> = memo(({ mentor }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(pathKeys.mentors.byId(mentor.id));
  };
  return (
    <div className="group relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-300 flex flex-col bg-white hover:-translate-y-2">
      {/* Gradient glow effect */}

      {/* Header with dynamic gradient */}
      <div className="relative  p-6 pb-16 border-b border-gray-200">
        {/* Subtle pattern overlay */}

        <div className="relative flex flex-col items-center">
          {/* Mentor avatar with glow effect */}
          <div className="relative mb-4">
            <div className="w-[133px] h-[133px] rounded-full bg-white/20 p-1 backdrop-blur-sm shadow-lg">
              <img
                src={mentor.image || defaultMentor}
                alt={`${mentor.name} - ментор`}
                className="w-full h-full rounded-full object-cover border-2 border-white/80 group-hover:border-white transition-all duration-300"
                loading="lazy"
              />
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-1 bg-white text-teal-600 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BadgeCheck size={18} className="fill-current" />
            </div>
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center">
            {mentor.name}
          </h3>

          {/* Rating with animated stars */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-current group-hover:scale-110 transition-transform"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
            <span className="text-black text-sm ml-1 font-medium">5.0</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 -mt-10  relative z-10">
        {/* Badges with hover effects */}
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          <div className="flex items-center bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 px-6 py-2 rounded-full border border-teal-200 group-hover:border-teal-300 transition-all shadow-sm hover:shadow-md">
            <Briefcase size={14} className="mr-2 text-teal-600" />
            <span className="text-xs font-semibold">{mentor.profession}</span>
          </div>

          <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-100 text-amber-800 px-4 py-2 rounded-full border border-amber-200 group-hover:border-amber-300 transition-all shadow-sm hover:shadow-md">
            <Users size={14} className="mr-2 text-amber-600" />
            <span className="text-xs font-semibold">
              Опыт {mentor.experience}
            </span>
          </div>
        </div>

        {/* Specialization card */}
        <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl mb-6 border border-gray-100 group-hover:border-blue-200 transition-all shadow-sm hover:shadow-inner">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:rotate-6 transition-transform">
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-gray-500 font-medium mb-1">
                Преподаватель по:
              </h4>
              <p className="text-gray-800 font-bold text-sm group-hover:text-blue-700 transition-colors">
                {mentor.teacher}
              </p>
            </div>
          </div>
        </div>

        {/* Topics section */}
        <div className="flex-1 mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
            <span className="group-hover:text-teal-700 transition-colors">
              Пройдете темы:
            </span>
          </h4>
          <ul className="space-y-3">
            {mentor.topics.slice(0, 4).map((topic, index) => (
              <li key={index} className="flex items-start group/item">
                <div className="bg-teal-100 p-1 rounded-full mr-3 mt-1 group-hover/item:bg-teal-200 transition-colors flex-shrink-0">
                  <ChevronRight
                    size={12}
                    className="text-teal-600 group-hover/item:text-teal-800 transition-colors"
                  />
                </div>
                <span className="text-gray-700 text-sm font-medium leading-relaxed group-hover/item:text-gray-900 transition-colors">
                  {topic}
                </span>
              </li>
            ))}
            {mentor.topics.length > 4 && (
              <li className="text-teal-600 text-sm font-semibold ml-8 mt-2 flex items-center hover:text-teal-700 transition-colors">
                <ArrowRight size={14} className="mr-1" />
                Еще {mentor.topics.length - 4} тем
              </li>
            )}
          </ul>
        </div>

        {/* CTA button */}
        <button
          onClick={handleViewDetails}
          className="w-full py-3 px-4 bg-gradient-to-r bg-emerald-500 hover:from-teal-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center group/button"
        >
          <span>Посмотреть подробнее</span>
          <ArrowRight
            size={16}
            className="ml-2 group-hover/button:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-teal-400/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-400/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
});
