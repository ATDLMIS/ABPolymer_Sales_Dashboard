const FormSelect = ({ 
  label, 
  placeholder = '',
  id, 
  value, 
  onChange, 
  options, 
  required = false,
  disabled = false,
  valueKey = 'value',
  labelKey = 'label',
  className = '',
  width='w-full'
}) => (
  <div className={`mb-4 ${className} text-ellipsis`}>
    <label 
      htmlFor={id} 
      className="block text-sm text-ellipsis font-semibold text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`${width} text-ellipsis px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
    >
      <option >Select a {label||placeholder}</option>
      {options.map((option) => (
        <option value={option[valueKey]} key={option[valueKey]}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;