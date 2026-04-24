import { apiClient } from "./apiClient";

// ---------- ТИПЫ ----------
export interface ApiOption {
  id: number;
  value: string;
  text: string;
  skill1: number;
  skill2: number;
  skill3: number;
  skill4: number;
  skill5: number;
  skill6: number;
  question: number;
}

export interface ApiQuestion {
  text: string;
  options: ApiOption[];
}

export interface Profession {
  id: number;
  skillDisplay: string;
  skill: string;
  profession: string;
  image: string;
  reason: string;
  description: string;
}

export interface TransformedQuestion {
  id: number;
  question: string;
  options: TransformedOption[];
}

export interface TransformedOption {
  value: string;
  text: string;
  skills: {
    "Визуальное мышление": number;
    Креативность: number;
    Логика: number;
    Аналитика: number;
    Организация: number;
    Структурирование: number;
  };
}

// ---------- API ФУНКЦИИ ----------
export const fetchQuestions = async (): Promise<ApiQuestion[]> => {
  const response = await apiClient.get<ApiQuestion[]>("/tanda/");
  return response.data;
};

export const fetchAllProfessions = async (): Promise<Profession[]> => {
  const response = await apiClient.get<Profession[]>("/tanda/professions/");
  return response.data;
};

const transformResultsToBackendFormat = (
  results: Record<string, number>,
): Record<string, number> => {
  const skillMap: Record<string, string> = {
    "Визуальное мышление": "skill1",
    Креативность: "skill2",
    Логика: "skill3",
    Аналитика: "skill4",
    Организация: "skill5",
    Структурирование: "skill6",
  };

  const backendResults: Record<string, number> = {};
  Object.entries(results).forEach(([skillName, score]) => {
    const backendKey = skillMap[skillName];
    if (backendKey) {
      backendResults[backendKey] = score;
    }
  });
  return backendResults;
};

export const fetchTopProfessions = async (
  results: Record<string, number>,
): Promise<Profession[]> => {
  try {
    const payload = transformResultsToBackendFormat(results);
    const response = await apiClient.post("/tanda/top-profession/", payload);

    let professionsData = response.data;
    if (!Array.isArray(professionsData)) {
      if (professionsData.results && Array.isArray(professionsData.results)) {
        professionsData = professionsData.results;
      } else if (professionsData.data && Array.isArray(professionsData.data)) {
        professionsData = professionsData.data;
      } else {
        console.error("Неизвестный формат:", professionsData);
        return [];
      }
    }

    const transformedProfessions: Profession[] = professionsData.map(
      (item: any, index: number) => {
        // 🔥 ВАЖНО: Проверяем, есть ли вложенный profession объект
        const nestedProfession = item.profession?.profession
          ? item.profession
          : null;

        // Если есть вложенный объект — берём оттуда, иначе из корня
        const source = nestedProfession || item;

        console.log(`[${index}] source:`, source);

        return {
          id: source.id || index,
          skillDisplay:
            source.skillDisplay || source.skill_display || item.skill || "",
          skill: item.skill || source.skill || "",
          profession: source.profession || source.profession_name || "",
          image: source.image || source.image_url || "",
          reason: source.reason || source.reason_text || "",
          description: source.description || source.description_text || "",
        };
      },
    );

    console.log("=== Преобразованные профессии ===");
    console.log(transformedProfessions);

    return transformedProfessions;
  } catch (error: any) {
    console.error("Ошибка fetchTopProfessions:", error);
    throw error;
  }
};
