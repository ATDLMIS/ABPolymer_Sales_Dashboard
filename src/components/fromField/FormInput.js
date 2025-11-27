import React from 'react'

const FormInput = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  readOnly = false, 
  required = false,
  placeholder = '',
  className = '',
  width='w-full'
}) => (
  <div className="mb-4">
    <label 
      htmlFor={id} 
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder}
      className={`${width} px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors ${readOnly ? 'bg-gray-50 cursor-not-allowed' : ''} ${className}`}
    />
  </div>
);

export default FormInput