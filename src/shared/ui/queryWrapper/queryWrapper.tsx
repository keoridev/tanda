import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

interface QueryWrapperProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}

export function QueryWrapper({
  isLoading,
  isError,
  children,
}: QueryWrapperProps) {
  if (isLoading) {
    return (
      <div className="m-auto">
        <CircularProgress />;
      </div>
    );
  }

  if (isError)
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded">
        <h2 className="text-3xl font-semibold">Ошибка загрузки</h2>
        <p>
          Не удалось получить данные. Попробуйте обновить страницу или позже
          снова открыть приложение.
        </p>
      </div>
    );

  return <>{children}</>;
}
