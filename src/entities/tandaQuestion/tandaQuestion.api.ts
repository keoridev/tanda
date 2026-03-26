// src/shared/api/tandaApi.ts
import { apiClient } from "~shared/index";
import { BackendQuestion, TransformedQuestion, TransformedOption, BackendOption, } from "./question.types";

export const tandaApi = {
    // Получение вопросов с бэкенда
    async getQuestions(): Promise<TransformedQuestion[]> {
        try {
            const response = await apiClient.get<BackendQuestion[]>('/tanda/');
            return this.transformQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    },

    transformQuestions(backendQuestions: BackendQuestion[]): TransformedQuestion[] {
        return backendQuestions.map((backendQuestion: BackendQuestion) => ({
            question: backendQuestion.text,
            options: backendQuestion.options.map((option: BackendOption): TransformedOption => ({
                value: option.value,
                text: option.text,
                skills: {
                    skill1: option.skill1,
                    skill2: option.skill2,
                    skill3: option.skill3,
                    skill4: option.skill4,
                    skill5: option.skill5,
                    skill6: option.skill6,
                }
            }))
        }));
    }
};