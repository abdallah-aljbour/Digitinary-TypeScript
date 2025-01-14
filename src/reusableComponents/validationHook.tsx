import { useState, useCallback } from 'react';
import { FormField, FormValues, UseFormValidationProps } from './types';

export const useFormValidation = <T extends FormValues>({
  initialValues,
  validationRules,
}: UseFormValidationProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = useCallback(
    (field: keyof T, value: FormField): string | undefined => {
      const rule = validationRules[field];
      return rule ? rule(value) : undefined;
    },
    [validationRules]
  );

  const handleInputChange = useCallback(
    (field: keyof T) => (value: FormField) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      
      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [validateField]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof T>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
    resetForm,
    setFormData,
  };
};