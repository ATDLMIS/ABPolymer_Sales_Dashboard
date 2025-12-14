import DatePicker from "react-datepicker";

const FormDatePicker = ({ label, selected, onChange, required = false }) => (
  <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
    <DatePicker
      selected={selected}
      onChange={onChange}
    dateFormat="dd/MM/yyyy"
    placeholderText="dd/mm/yyyy"
      className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
      wrapperClassName="w-full"
    />
  </div>
);

export default FormDatePicker;