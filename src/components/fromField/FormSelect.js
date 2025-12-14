
import { useState, useRef, useEffect } from 'react';

const FormSelect = ({ 
  label = '', 
  placeholder = '',
  id, 
  value = '', 
  onChange, 
  options = [], 
  required = false,
  disabled = false,
  valueKey = 'value',
  labelKey = 'label',
  className = '',
  width = 'w-full',
  searchable = true,
  searchKeys = ['label', 'value'] // Keys to search through
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get selected option label
  const selectedOption = options?.find(opt => opt[valueKey] === value);
  const selectedLabel = selectedOption ? selectedOption[labelKey] : '';

  // Filter options based on search term
  const filteredOptions = options.filter(option => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return searchKeys.some(key => {
      const optionValue = option[key];
      if (optionValue === undefined || optionValue === null) return false;
      return optionValue.toString().toLowerCase().includes(searchLower);
    });
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: id,
          value: option[valueKey],
          id: id
        }
      };
      onChange(syntheticEvent);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // If not searchable, return original select component
  if (!searchable) {
    return (
      <div className={`mb-4 ${className}`}>
         <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${width} px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">Select a {label || placeholder}</option>
          {options.map((option) => (
            <option value={option[valueKey]} key={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Searchable dropdown
  return (
    <div className={`mb-4 ${className}`} ref={dropdownRef}>
     <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
      
      <div className="relative">
        {/* Display selected value */}
        <div
          onClick={handleToggle}
          className={`${width} px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors cursor-pointer flex justify-between items-center ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <span className={`${!selectedLabel ? 'text-gray-400' : ''} truncate`}>
            {selectedLabel || `Select a ${label || placeholder}`}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] outline-none"
              />
            </div>

            {/* Options list */}
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option[valueKey]}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-gray-100 transition-colors ${
                      value === option[valueKey] ? 'bg-orange-50 text-[#FF6F0B] font-semibold' : ''
                    }`}
                  >
                    {option[labelKey]}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2.5 text-gray-500 text-sm">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        id={id}
        name={id}
        value={value}
        required={required}
      />
    </div>
  );
};

export default FormSelect;