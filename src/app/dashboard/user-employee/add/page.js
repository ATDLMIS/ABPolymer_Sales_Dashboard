'use client';
import { useState, useEffect } from 'react';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const [desigs, setDesigs] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    employeeId: '',
    employeeName: '',
    dasignationRole: '',
    password: '',
    userName: '',
    email: '',
    phone: '',
    address: '',
    reportingTo: '',
    status: '',
  });

  const getDesig = async cb => {
    const res = await Axios.get('?action=get_desigs');
    if (res.status === 200) {
      cb(res.data);
    }
  };

  const getReporting = async cb => {
    const res = await Axios.get(
      `?action=get_all_ReportUser&DesignationID=${formData.dasignationRole}`
    );
    if (res.status === 200) {
      cb(res.data);
    }
  };

  useEffect(() => {
    getDesig(setDesigs);
  }, []);

  useEffect(() => {
    if (formData.dasignationRole) {
      getReporting(setReportingTo);
    }
  }, [formData.dasignationRole]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Registration</h1>
              <p className="text-sm text-gray-500 mt-1">Create a new employee account</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form
            action="/api/user-registration"
            method="POST"
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary1/20 to-primary1/10 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-primary1/40" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <label htmlFor="Image" className="absolute bottom-0 right-0 bg-primary1 rounded-full p-2 cursor-pointer hover:bg-primary1/90 transition-colors shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  id="Image"
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData({ ...formData, [e.target.name]: file });
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="EmployeeID" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="EmployeeID"
                    name="employeeId"
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="Enter employee ID"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="EmployeeName" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="EmployeeName"
                    type="text"
                    name="employeeName"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="Enter full name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="Designation" className="block text-sm font-medium text-gray-700 mb-2">
                    Designation/Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="Designation"
                    name="dasignationRole"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all bg-white"
                    defaultValue=""
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select designation</option>
                    {desigs.length > 0 &&
                      desigs.map(item => (
                        <option value={item.ID} key={item.ID}>
                          {item.CategoryName}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="ReportingTo" className="block text-sm font-medium text-gray-700 mb-2">
                    Reporting To <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ReportingTo"
                    name="reportingTo"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all bg-white"
                    defaultValue=""
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select manager</option>
                    {reportingTo.length > 0 &&
                      reportingTo.map(item => (
                        <option value={item.UserID} key={item.UserID}>
                          {item.ReportUsers}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Account Credentials */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Username / User ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="userName"
                    type="text"
                    name="userName"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="Enter username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="Password"
                    type="password"
                    name="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="Email"
                    type="email"
                    name="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="employee@company.com"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="Phone"
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all"
                    placeholder="+880 1XXX-XXXXXX"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="Address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="Address"
                    name="address"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Enter full address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-primary1 text-white rounded-lg font-medium hover:bg-primary1/90 transition-colors shadow-lg shadow-primary1/25"
              >
                Register Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;