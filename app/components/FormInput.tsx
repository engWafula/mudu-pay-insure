import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-5 relative">
      <label htmlFor={name} className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded-lg px-3 py-2 mt-1 text-sm w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500" // Adjust focus styles
          required={required}
        />
        {type === 'password' && (
          <div
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash data-testid="eye-slash-icon" /> : <FaEye data-testid="eye-icon" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
