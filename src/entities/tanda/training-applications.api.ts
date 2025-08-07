import { apiClient } from "~shared/lib/api";

interface TrainingApplicationData {
  fullName: string;
  email: string;
  phone: string;
  comment: string;
}

export const submitTrainingApplication = (data: TrainingApplicationData) => {
  return apiClient.post("/training-applications/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
