export type FormField = string | number;

export type FormValues = Record<string, FormField>;
//The function Record in TypeScript is a utility type that constructs an object type with (specific keys) and (value)
//FormValues is a type that represents an object where:
//The keys are of type string (meaning any string can be a key).
//The (values) are of type FormField, meaning (each key in the object will map to a FormField type).
export type FormErrors = Record<string, string>;

export type FormTouched = Record<string, boolean>;

export type ValidationRule = (value: FormField) => string | undefined;

export type ValidationRules<T> = {
  [K in keyof T]: ValidationRule;
};
// The <T> means that the type (ValidationRules is generic) and can be applied to (different types of objects).
//[K in keyof T] is a (mapped type) that (iterates) over the keys of type T
// The (in) keyword is used to (iterate) over each key.
export interface UseFormValidationProps<T extends FormValues> {
  initialValues: T;
  validationRules: ValidationRules<T>;
}

//T extends FormValues means that T must be a subtype of FormValues
//This constraint ensures that T can only be an object type that fits the structure of FormValues.
//The extends keyword enforces that T must conform to the structure of (FormValues)