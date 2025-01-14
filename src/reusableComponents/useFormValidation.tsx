import { FormField } from '../reusableComponents/types';

export const commonValidationRules = {
  required: (fieldName: string) => (value: FormField): string | undefined =>
    !value ? `${fieldName} is required` : undefined,

  email: () => (value: FormField): string | undefined => {
    const strValue = String(value);
    if (!strValue) return 'Email is required';
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(strValue)
      ? 'Please enter a valid email'
      : undefined;
  },

  password: (fieldName: string) => (value: FormField): string | undefined => {
    const strValue = String(value);
    if (!strValue) return `${fieldName} is required`;
    if (strValue.length < 8) return `${fieldName} must be at least 8 characters`;
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(strValue)) {
      return `${fieldName} must contain at least one uppercase letter, one lowercase letter, and one number`;
    }
    return undefined;
  },

  phoneNumber: () => (value: FormField): string | undefined => {
    const strValue = String(value);
    if (!strValue) return 'Phone number is required';
    return !/^\+?[\d\s-]{10,}$/.test(strValue)
      ? 'Please enter a valid phone number (10 digit)'
      : undefined;
  },

  age: () => (value: FormField): string | undefined => {
    if (!value) return 'Age is required';
    const num = typeof value === 'string' ? Number(value) : value;
    if (isNaN(num) || num < 18 || num > 120) return 'Please enter a valid age , must be a number between 18-90 ';
    return undefined;
  },

  minLength: (fieldName: string, minLength: number) => (value: FormField): string | undefined => {
    const strValue = String(value);
    if (!strValue) return `${fieldName} is required`;
    return strValue.length < minLength
      ? `${fieldName} must be at least ${minLength} characters`
      : undefined;
  },
};