import { create } from "zustand";
import { ProfessionData, ViewMode, ChartType, TimeRange } from "./types";
import { professionsData } from "./types";

interface ProfessionStore {
  
  data: ProfessionData[];
  selectedProfessions: Set<string>;
  viewMode: ViewMode;
  chartType: ChartType;
  timeRange: TimeRange; // Добавляем выбор периода
  pinnedProfession: string | null;
  modalProfession: ProfessionData | null;
  isModalOpen: boolean;

  actions: {
    toggleProfession: (id: string) => void;
    setViewMode: (mode: ViewMode) => void;
    setChartType: (type: ChartType) => void;
    setTimeRange: (range: TimeRange) => void; // Новая функция
    setPinnedProfession: (id: string | null) => void;
    openModal: (profession: ProfessionData) => void;
    closeModal: () => void;
  };
}

export const useProfessionStore = create<ProfessionStore>((set, get) => ({
  data: professionsData,
  selectedProfessions: new Set(professionsData.map((p) => p.id)),
  viewMode: "growth",
  chartType: "line",
  timeRange: "all", // По умолчанию показываем все данные
  pinnedProfession: null,
  modalProfession: null,
  isModalOpen: false,

  actions: {
    toggleProfession: (id) =>
      set((state) => {
        const newSelected = new Set(state.selectedProfessions);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        return { selectedProfessions: newSelected };
      }),
    setViewMode: (mode) => set({ viewMode: mode }),
    setChartType: (type) => set({ chartType: type }),
    setTimeRange: (range) => set({ timeRange: range }), // Устанавливаем период
    setPinnedProfession: (id) => set({ pinnedProfession: id }),
    openModal: (profession) =>
      
      set({ modalProfession: profession, isModalOpen: true }),
    closeModal: () => set({ modalProfession: null, isModalOpen: false }),
  },
}));
