import { motion } from "framer-motion";
import { QuizOutlined } from "@mui/icons-material";

export const PreloaderTest = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-indigo-200 rounded-full animate-pulse mx-auto mb-4 flex items-center justify-center">
          <QuizOutlined className="text-4xl text-indigo-600" />
        </div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-t-indigo-600 rounded-full animate-spin mx-auto" />
      </div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-800 mb-2"
      >
        Подготовка теста...
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600"
      >
        Загружаем персональные вопросы для вас
      </motion.p>
    </motion.div>
  </div>
);
