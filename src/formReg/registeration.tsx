
import React, { useState } from 'react';
import { Input, Button } from 'digitinary-ui'; 
import { useFormValidation } from '../reusableComponents/validationHook';
import { commonValidationRules } from '../reusableComponents/useFormValidation';
import { FormField, ValidationRules } from '../reusableComponents/types';
import Swal from 'sweetalert2';

type FormData = {
  fullName: FormField;
  email: FormField;
  password: FormField;
  phoneNumber: FormField;
  age: FormField;
  country: FormField;
};

const RegistrationForm: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false);  // Track checkbox state
  
  const validationRules: ValidationRules<FormData> = {
    fullName: commonValidationRules.required('Full Name'),
    email: commonValidationRules.email(),
    password: commonValidationRules.password('Password'),
    phoneNumber: commonValidationRules.phoneNumber(),
    age: commonValidationRules.age(),
    country: commonValidationRules.required('Country'),
  };

  const {
    formData,
    errors,
    handleInputChange,
    validateForm,
  } = useFormValidation({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      age: '',
      country: '',
    },
    validationRules,
  });

  const isFormValid = Object.values(formData).every((value) => value !== '') && isAgreed; // Ensure checkbox is checked

  const countries = [
    { label: 'Jordan', value: 'jordan' },
    { label: 'KSA', value: 'ksa' },
    { label: 'USA', value: 'usa' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && isAgreed) {
      console.log('Form submitted:', formData);
      localStorage.setItem('Form Data :', JSON.stringify(formData));
      Swal.fire({
        title: 'Success!',
        text: 'Your form has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'You must agree to the terms and conditions.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-rose-200 via-fuchsia-200 to-sky-200">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Registration Form</h1>

        {/* Full Name Input */}
        <div className="space-y-1">
          <Input
            type="text"
            value={String(formData.fullName)}
            onChange={handleInputChange('fullName')}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <Input
            type="email"
            value={String(formData.email)}
            onChange={handleInputChange('email')}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <Input
            type="password"
            value={String(formData.password)}
            onChange={handleInputChange('password')}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Phone Number Input */}
        <div className="space-y-1">
          <Input
            type="text"
            value={String(formData.phoneNumber)}
            onChange={handleInputChange('phoneNumber')}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Age Input */}
        <div className="space-y-1">
          <Input
            type="number"
            value={String(formData.age)}
            onChange={handleInputChange('age')}
            placeholder="Enter your age from 18 - 90"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        {/* Country Select */}
        <div className="space-y-1">
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) => handleInputChange('country')(e.target.value)}
            className="w-full p-3 bg-white border-2 border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        {/* Agree to Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
            className="h-4 w-4 border-gray-300 rounded text-cyan-600 focus:ring-0"
          />
          <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
            I agree to the <a href="/terms" className="text-cyan-600">terms and conditions</a>.
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={!isFormValid}>Submit</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
