import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSubmitTrainingApplication } from "~entities/tanda";
import { pathKeys } from "~shared/lib/react-router";
const initialFormState = {
  name: "",
  email: "",
  phone: "",
  isFormValid: false,
  phoneError: false,
  nameError: false,
  emailError: false,
  nameTouched: false,
  emailTouched: false,
  phoneTouched: false,
  isSubmitting: false,
  submitError: null as string | null,
};

export const useAuthLogic = (testResults?: Record<string, number>) => {
  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();
  const { mutateAsync: submitTraining } = useSubmitTrainingApplication();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      submitError: null, // Сбрасываем ошибку при изменении
    }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    setFormState((prev) => ({
      ...prev,
      phone: value,
      phoneError: false,
      phoneTouched: true,
      submitError: null,
    }));
  }, []);

  const handleBlur = useCallback((field: "name" | "email" | "phone") => {
    setFormState((prev) => ({ ...prev, [`${field}Touched`]: true }));
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone?.length > 5;
  };

  const validateForm = useCallback(() => {
    const nameValid = formState.name.trim().length >= 3;
    const emailValid = validateEmail(formState.email);
    const phoneValid = validatePhone(formState.phone);

    setFormState((prev) => ({
      ...prev,
      phoneError: !phoneValid && prev.phoneTouched,
      nameError: !nameValid && prev.nameTouched,
      emailError: !emailValid && prev.emailTouched,
      isFormValid: nameValid && emailValid && phoneValid,
    }));

    return nameValid && emailValid && phoneValid;
  }, [
    formState.name,
    formState.email,
    formState.phone,
    formState.nameTouched,
    formState.emailTouched,
    formState.phoneTouched,
  ]);

  const normalizeResults = (results: Record<string, number>): string => {
    const entries = Object.entries(results);
    if (entries.length === 0) return "";

    const total = entries.reduce((sum, [, value]) => sum + Math.abs(value), 0);
    if (total === 0) return entries.map(([key]) => `${key}: 0%`).join(", ");

    const temp = entries.map(([key, value]) => {
      const percent = (Math.abs(value) / total) * 100;
      return {
        key,
        percent,
        integer: Math.floor(percent),
        remainder: percent % 1,
      };
    });

    const totalInteger = temp.reduce((sum, { integer }) => sum + integer, 0);

    if (totalInteger < 100) {
      const sorted = [...temp].sort((a, b) => b.remainder - a.remainder);
      for (let i = 0; i < 100 - totalInteger; i++) {
        sorted[i].integer += 1;
      }
    }

    return temp.map(({ key, integer }) => `${key}: ${integer}%`).join(", ");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm() || formState.isSubmitting) return;

      try {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: true,
          submitError: null,
        }));

        const comment = testResults ? normalizeResults(testResults) : undefined;
        const phoneNumber = formState.phone.startsWith("+")
          ? formState.phone
          : `+${formState.phone}`;

        await submitTraining({
          fullName: formState.name,
          email: formState.email,
          phone: phoneNumber,
          comment,
        });

        navigate("/result");
      } catch (error: any) {
        console.error("Ошибка отправки:", error);
        setFormState((prev) => ({
          ...prev,
          submitError:
            error.response?.data?.message ||
            "Произошла ошибка при отправке формы",
        }));
      } finally {
        setFormState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [
      formState.name,
      formState.email,
      formState.phone,
      formState.isSubmitting,
      testResults,
      validateForm,
      submitTraining,
      navigate,
    ]
  );

  useEffect(() => {
    validateForm();
  }, [formState.name, formState.email, formState.phone, validateForm]);

  return {
    ...formState,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleBlur,
  };
};
