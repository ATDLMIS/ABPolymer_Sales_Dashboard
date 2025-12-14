const FormFileUpload = ({ label, id, onChange, required = false }) => (
  <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
    <div className="relative">
      <input
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF6F0B] file:text-white hover:file:bg-[#E66309] file:cursor-pointer"
      />
    </div>
  </div>
);

export default FormFileUpload