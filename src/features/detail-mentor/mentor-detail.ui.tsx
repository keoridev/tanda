import { mentors } from "~features/tandaMentor/model/data/mentorData";
import {
  FiBriefcase,
  FiClock,
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
  FiAward,
  FiCode,
  FiTarget,
  FiCalendar,
  FiStar,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { styled } from "@mui/material/styles";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ChevronDown } from "lucide-react";
import type { AccordionProps, AccordionSummaryProps } from "@mui/material";
import { Button } from "~app/components/ui/button";
import { useNavigate } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MentorDetailPageProps {
  mentorId?: string;
}

export const MentorDetailPage: React.FC<MentorDetailPageProps> = ({
  mentorId,
}) => {
  const navigate = useNavigate();
  const currentIndex = mentors.findIndex((m) => m.id === mentorId);
  const prevMentor = currentIndex > 0 ? mentors[currentIndex - 1] : null;
  const nextMentor =
    currentIndex < mentors.length - 1 ? mentors[currentIndex + 1] : null;
  const mentor = mentors.find((m) => m.id === mentorId) || mentors[0];

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ментор не найден</h2>
          <p>Пожалуйста, вернитесь на страницу менторов</p>
        </div>
      </div>
    );
  }

  const StyledAccordion = styled(Accordion)<AccordionProps>(() => ({
    "&": {
      boxShadow: "none",
      border: "none",
      backgroundColor: "transparent",
      "&::before": {
        display: "none",
      },
      "&.Mui-expanded": {
        margin: "0",
      },
    },
  }));

  const StyledAccordionSummary = styled(
    AccordionSummary
  )<AccordionSummaryProps>(() => ({
    "&": {
      padding: "12px 16px",
      minHeight: "auto",
      borderRadius: "8px",
      transition: "all 0.2s ease-in-out",
      backgroundColor: "transparent",
      border: "1px solid rgb(226 232 240)",
      marginBottom: "8px",
      "&:hover": {
        backgroundColor: "rgb(248 250 252)",
      },
      "&.Mui-expanded": {
        minHeight: "auto",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        borderBottom: "none",
        marginBottom: "0",
      },
    },
    "& .MuiAccordionSummary-content": {
      margin: "0",
      "&.Mui-expanded": {
        margin: "0",
      },
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: "rgb(71 85 105)",
      transition: "transform 0.2s ease-in-out",
      "&.Mui-expanded": {
        transform: "rotate(180deg)",
      },
    },
  }));

  const StyledAccordionDetails = styled(AccordionDetails)(() => ({
    "&": {
      padding: "16px",
      backgroundColor: "white",
      border: "1px solid rgb(226 232 240)",
      borderTop: "none",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
  }));

  const CustomAccordion = StyledAccordion;
  const CustomAccordionSummary = StyledAccordionSummary;
  const CustomAccordionDetails = StyledAccordionDetails;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-slate-500">
            <a href="/result" className="hover:text-emerald-600">
              Назад
            </a>{" "}
            /<span className="text-slate-900"> {mentor.name}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="md:flex">
            {/* Left Column - Photo & Contact */}
            <div className="md:w-1/3 bg-slate-100 p-8 flex flex-col items-center">
              <div className="relative mb-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-48 h-48 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-3 rounded-full shadow-lg">
                  <FiCheckCircle size={24} />
                </div>
                <div className="absolute -top-3 -left-3 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ТОП ментор
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                {mentor.name}
              </h1>
              <p className="text-slate-600 text-center mb-4">
                {mentor.profession}
              </p>

              {/* Рейтинг */}
              <div className="flex items-center mb-6">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
                <span className="text-slate-600 text-sm">
                  {mentor.rating} ({mentor.reviewsCount} отзывов)
                </span>
              </div>

              {/* Контакты */}
              <div className="w-full space-y-3">
                <div className="flex items-center text-slate-600">
                  <FiMail className="mr-3 text-slate-400" size={16} />
                  <span className="text-sm">{mentor.contact.email}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <FiPhone className="mr-3 text-slate-400" size={16} />
                  <span className="text-sm">{mentor.contact.phone}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <FiMapPin className="mr-3 text-slate-400" size={16} />
                  <span className="text-sm">{mentor.contact.location}</span>
                </div>
                <div className="flex space-x-3 pt-2">
                  <a
                    href={mentor.contact.github}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href={mentor.contact.linkedin}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <FiLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Main Info */}
            <div className="md:w-2/3 p-8">
              {/* Статистика */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FiBriefcase className="mr-2 text-emerald-600" />
                    <span className="text-2xl font-bold text-slate-900">
                      {mentor.statistics.experience}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">Опыт работы</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FiUsers className="mr-2 text-blue-600" />
                    <span className="text-2xl font-bold text-slate-900">
                      {mentor.statistics.students}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">Выпускников</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FiClock className="mr-2 text-purple-600" />
                    <span className="text-2xl font-bold text-slate-900">
                      {mentor.statistics.employment}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">Трудоустройство</p>
                </div>
              </div>

              {/* О преподавателе */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  О преподавателе
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {mentor.bio}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {mentor.extendedBio}
                </p>
              </div>

              {/* Преподаваемый курс */}
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <FiBookOpen className="mr-3 text-emerald-600" />
                  Преподаваемый курс:
                </h3>
                <p className="text-slate-700 font-medium text-lg">
                  {mentor.teacher}
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Трёхгодичная программа подготовки специалистов
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Образование и сертификации */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <FiAward className="mr-3 text-emerald-600" />
              Образование
            </h2>
            <div className="space-y-4">
              {mentor.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-emerald-200 pl-4">
                  <h4 className="font-semibold text-slate-900">{edu.degree}</h4>
                  <p className="text-slate-600 text-sm">
                    {edu.institution} • {edu.period}
                  </p>
                  <p className="text-slate-500 text-sm">{edu.grade}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <FiCode className="mr-3 text-blue-600" />
              Сертификации
            </h2>
            <div className="space-y-3">
              {mentor.certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-3" size={16} />
                  <span className="text-slate-700">
                    {cert.name} ({cert.year})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Навыки */}
        {/* Навыки */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <FiCode className="mr-3 text-purple-600" />
            Профессиональные навыки
          </h2>
          <div className="flex flex-wrap gap-3">
            {mentor.skills.map((skill, index) => {
              // Массив цветовых комбинаций (рамка + текст)
              const colorCombinations = [
                { border: "border-emerald-400", text: "text-emerald-700" },
                { border: "border-blue-400", text: "text-blue-700" },
                { border: "border-purple-400", text: "text-purple-700" },
                { border: "border-amber-400", text: "text-amber-700" },
                { border: "border-red-400", text: "text-red-700" },
                { border: "border-indigo-400", text: "text-indigo-700" },
                { border: "border-pink-400", text: "text-pink-700" },
                { border: "border-cyan-400", text: "text-cyan-700" },
                { border: "border-lime-400", text: "text-lime-700" },
                { border: "border-violet-400", text: "text-violet-700" },
              ];

              // Выбираем комбинацию по индексу
              const colors =
                colorCombinations[index % colorCombinations.length];

              return (
                <span
                  key={index}
                  className={`bg-white ${colors.border} ${colors.text} border-2 px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        {/* Трёхгодичная программа курса */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="bg-slate-100 p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Программа обучения (3 года)
            </h2>
            <p className="text-slate-600">
              Полная программа подготовки frontend-разработчиков от основ до
              профессионального уровня
            </p>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {mentor.courseProgram.map((year, yearIndex) => (
                <div
                  key={yearIndex}
                  className={`bg-${year.color}-50 rounded-xl p-6 border border-${year.color}-200`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`bg-${year.color}-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}
                    >
                      {year.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 ml-3">
                      {year.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    {year.description}
                  </p>

                  {year.semesters.map((semester, semIndex) => (
                    <CustomAccordion key={semIndex}>
                      <CustomAccordionSummary
                        expandIcon={<ChevronDown size={18} />}
                        className={`hover:!bg-${year.color}-100`}
                      >
                        <span className="font-medium text-slate-800">
                          {semester.name}
                        </span>
                      </CustomAccordionSummary>
                      <CustomAccordionDetails>
                        <ul className="space-y-2 text-slate-600">
                          {semester.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start">
                              <span className={`text-${year.color}-600 mr-2`}>
                                •
                              </span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </CustomAccordionDetails>
                    </CustomAccordion>
                  ))}

                  <div
                    className={`mt-4 pt-4 border-t border-${year.color}-200`}
                  >
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {year.year === 3
                        ? "Финальные проекты:"
                        : "Итоговые проекты:"}
                    </h4>
                    <ul className="space-y-1">
                      {year.projects.map((project, projectIndex) => (
                        <li
                          key={projectIndex}
                          className="flex items-start text-slate-600 text-sm"
                        >
                          <span className={`text-${year.color}-600 mr-2`}>
                            •
                          </span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Результаты обучения */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <FiTarget className="mr-3 text-emerald-600" />
            Результаты обучения
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mentor.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                  <FiCheckCircle className="text-emerald-600" size={16} />
                </div>
                <p className="text-slate-700">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* График работы */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <FiCalendar className="mr-3 text-blue-600" />
            График работы и консультации
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Лекции:</h4>
              <div className="space-y-2 text-slate-600">
                {mentor.schedule.lectures.map((lecture, index) => (
                  <p key={index}>{lecture}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Консультации:
              </h4>
              <div className="space-y-2 text-slate-600">
                {mentor.schedule.consultations.map((consultation, index) => (
                  <p key={index}>{consultation}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto my-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6 mt-8">
            {/* Кнопка "Предыдущий" */}
            {prevMentor && (
              <button
                onClick={() => navigate(pathKeys.mentors.byId(prevMentor.id))}
                className="group flex items-center gap-4 px-6 py-4
        bg-gradient-to-r from-slate-50 to-slate-100 
        hover:from-emerald-50 hover:to-emerald-100
        border border-slate-200 hover:border-emerald-200 
        rounded-xl shadow-sm hover:shadow-lg 
        transition-all duration-300 ease-out
        w-full sm:w-auto sm:max-w-xs
        transform hover:-translate-y-0.5
        relative overflow-hidden"
              >
                {/* Animated background */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 to-emerald-500/0 
        group-hover:from-emerald-400/5 group-hover:to-emerald-500/5 
        transition-all duration-500"
                ></div>

                {/* Icon container */}
                <div
                  className="relative flex-shrink-0 p-2.5 
        bg-white group-hover:bg-emerald-50 
        border border-slate-200 group-hover:border-emerald-200
        rounded-lg shadow-sm group-hover:shadow-md
        transition-all duration-300
        group-hover:scale-110"
                >
                  <ArrowLeft
                    size={18}
                    className="text-slate-600 group-hover:text-emerald-600 
            transition-colors duration-300
            group-hover:-translate-x-0.5"
                  />
                </div>

                {/* Content */}
                <div className="relative text-left flex-1">
                  <p
                    className="text-xs font-medium text-slate-500 group-hover:text-emerald-600 
          transition-colors duration-300 uppercase tracking-wide"
                  >
                    Предыдущий ментор
                  </p>
                  <p
                    className="text-sm font-semibold text-slate-800 group-hover:text-slate-900
          transition-colors duration-300 mt-1 line-clamp-1"
                  >
                    {prevMentor.name}
                  </p>
                  <p
                    className="text-xs text-slate-400 group-hover:text-emerald-500
          transition-colors duration-300 mt-0.5"
                  >
                    {prevMentor.profession}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className="absolute top-0 left-0 w-1 h-full 
        bg-gradient-to-b from-emerald-400 to-emerald-600
        scale-y-0 group-hover:scale-y-100 
        transition-transform duration-300 origin-top"
                ></div>
              </button>
            )}

            {/* Кнопка "Следующий" */}
            {nextMentor && (
              <button
                onClick={() => navigate(pathKeys.mentors.byId(nextMentor.id))}
                className="group flex items-center gap-4 px-6 py-4
        bg-gradient-to-l from-slate-50 to-slate-100 
        hover:from-blue-50 hover:to-blue-100
        border border-slate-200 hover:border-blue-200 
        rounded-xl shadow-sm hover:shadow-lg 
        transition-all duration-300 ease-out
        w-full sm:w-auto sm:max-w-xs sm:ml-auto
        transform hover:-translate-y-0.5
        relative overflow-hidden"
              >
                {/* Animated background */}
                <div
                  className="absolute inset-0 bg-gradient-to-l from-blue-400/0 to-blue-500/0 
        group-hover:from-blue-400/5 group-hover:to-blue-500/5 
        transition-all duration-500"
                ></div>

                {/* Content */}
                <div className="relative text-right flex-1">
                  <p
                    className="text-xs font-medium text-slate-500 group-hover:text-blue-600 
          transition-colors duration-300 uppercase tracking-wide"
                  >
                    Следующий ментор
                  </p>
                  <p
                    className="text-sm font-semibold text-slate-800 group-hover:text-slate-900
          transition-colors duration-300 mt-1 line-clamp-1"
                  >
                    {nextMentor.name}
                  </p>
                  <p
                    className="text-xs text-slate-400 group-hover:text-blue-500
          transition-colors duration-300 mt-0.5"
                  >
                    {nextMentor.profession}
                  </p>
                </div>

                {/* Icon container */}
                <div
                  className="relative flex-shrink-0 p-2.5 
        bg-white group-hover:bg-blue-50 
        border border-slate-200 group-hover:border-blue-200
        rounded-lg shadow-sm group-hover:shadow-md
        transition-all duration-300
        group-hover:scale-110"
                >
                  <ArrowRight
                    size={18}
                    className="text-slate-600 group-hover:text-blue-600 
            transition-colors duration-300
            group-hover:translate-x-0.5"
                  />
                </div>

                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-1 h-full 
        bg-gradient-to-b from-blue-400 to-blue-600
        scale-y-0 group-hover:scale-y-100 
        transition-transform duration-300 origin-top"
                ></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
