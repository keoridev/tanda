import { useMutation } from "@tanstack/react-query";
import { submitTrainingApplication } from "./training-applications.api";

const keys = {
  submit: () => ["training-applications", "submit"] as const,
};

export function useSubmitTrainingApplication() {
  return useMutation({
    mutationKey: keys.submit(),
    mutationFn: submitTrainingApplication,
    onSuccess: (data) => {
      console.log("Успешный ответ от сервера:", data);
    },
    onError: (error) => {
      console.error("Ошибка при отправке:", error);
    },
  });
}
