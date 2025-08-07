export interface FormState {
  name: string;
  email: string;
  phone: string;
  isFormValid: boolean;
  error: boolean;
  phoneError: boolean;
  nameError: boolean;
  emailError: boolean;
  nameTouched: boolean;
  emailTouched: boolean;
  phoneTouched: boolean;
}

export interface AuthHandlers {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleValidate: () => void;
  handleBlur: (field: "name" | "email" | "phone") => void;
}