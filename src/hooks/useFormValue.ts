import { ChangeEvent, useState } from "react";

export type FormDataType = { [key in string]: any };

export const useFormValue = <T extends FormDataType>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);

  const initialErrors = Object.keys(initialData).reduce((acc, cur) => {
    acc[cur as keyof T] = "";

    return acc;
  }, {} as { [key in keyof T]?: string });
  const [error, setError] = useState(initialErrors);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    clearInputError(e.target.name);
  };

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/[^0-9+]/g)) {
      e.target.value = e.target.value.replace(/[^0-9+]+/g, "");
    }
    onChange(e);
  };

  const onChangeSelect = <Value>(
    key: keyof T,
    value: Value,
    clearError: boolean = true
  ) => {
    setFormData((state) => ({
      ...state,
      [key]: value,
    }));
    if (clearError) clearInputError(key);
  };

  const clearInputError = (inputName: keyof T) => {
    if (inputName in error && error?.[inputName]) {
      setError({
        ...error,
        [inputName]: null,
      });
    }
  };

  const getError = (name: keyof T) => !!error && error?.[name];

  const onResetForm = () => {
    setFormData(initialData);
  };

  return {
    formData,
    onChange,
    onNumberChange,
    onChangeSelect,
    onResetForm,
    setFormData,
    clearInputError,
    getError,
    setError,
    error,
  };
};
