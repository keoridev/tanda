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
  Calendar,
  MessageCircle,
  Award,
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
    <div className="group relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-teal-200 flex flex-col bg-white hover:-translate-y-1">
      {/* Header Section */}
      <div className="relative p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          {/* Mentor Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gray-100 p-1 shadow-sm">
              <img
                src={mentor.image || defaultMentor}
                alt={`${mentor.name} - ментор`}
                className="w-full h-full rounded-xl object-cover border border-gray-200 group-hover:border-teal-200 transition-colors duration-300"
                loading="lazy"
              />
            </div>
            {/* Verified Badge */}
            <div className="absolute -bottom-1 -right-1 bg-white text-teal-600 p-1.5 rounded-full shadow-md border border-teal-100">
              <BadgeCheck size={14} className="fill-current" />
            </div>
          </div>

          {/* Mentor Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {mentor.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">{mentor.profession}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {mentor.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-teal-600" />
            <span className="text-sm text-gray-700">
              Опыт: {mentor.experience}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-blue-600" />
            <span className="text-sm text-gray-700">Английский</span>
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen size={16} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Преподаватель
              </h4>
              <p className="text-sm font-semibold text-gray-800">
                {mentor.teacher}
              </p>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Award size={16} className="text-teal-600" />
            Ключевые темы:
          </h4>

          <div className="space-y-2">
            {mentor.topics.slice(0, 3).map((topic, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors duration-200"
              >
                <ChevronRight
                  size={14}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-tight">
                  {topic}
                </span>
              </div>
            ))}

            {mentor.topics.length > 3 && (
              <div className="text-center pt-2">
                <span className="text-xs text-teal-600 font-medium">
                  +{mentor.topics.length - 3} дополнительных тем
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleViewDetails}
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group/button"
        >
          <span className="text-sm">Подробнее о менторе</span>
          <ArrowRight
            size={16}
            className="group-hover/button:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Hover Effects */}
      <div className="absolute top-3 right-3 w-12 h-12 bg-teal-200/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 w-16 h-16 bg-blue-200/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
});
