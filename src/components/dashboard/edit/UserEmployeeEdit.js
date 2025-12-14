'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UserEmployeeEdit = ({ id }) => {
  console.log('ID:', id);
  const [desigs, setDesigs] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    employeeName: '',
    EmployeeID: '',
    dasignationRole: '',
    password: '',
    userName: '',
    email: '',
    phone: '',
    address: '',
    reportingTo: '',
    status: '',
  });
 console.log(formData.reportingTo)
  // Validate ID prop
  if (!id || typeof id !== 'string') {
    console.error('Invalid id prop provided to UserEmployeeEdit');
  }

  const { status, data, error: dataError } = useGetData(
    `?action=get_sndUser&UserID=${id}`
  );
  console.log(data);
  // Handle data fetching errors
  useEffect(() => {
    if (dataError) {
      console.error('Error fetching user data:', dataError);
      setApiError('Failed to load user data. Please try again.');
    }
  }, [dataError]);

  useEffect(() => {
    if ( data) {
      try {
        setFormData({
          employeeName: data.EmpName || '',
          EmployeeID: data.EmployeeID || '',
          dasignationRole: data.DesignationID || '',
          password: '',
          userName: data.Username || '',
          email: data.Email || '',
          phone: data.Phone || '',
          address: data.Address || '',
          reportingTo: data.ReportingToUserID || '',
          status: data.Status || '',
        });
      } catch (error) {
        console.error('Error setting form data:', error);
        setApiError('Error processing user data.');
      }
    }
  }, [ data]);

  const getDesig = async (cb) => {
    try {
      setLoading(true);
      const res = await Axios.get('?action=get_desigs');
      if (res.status === 200) {
        cb(res.data || []);
      } else {
        throw new Error(`HTTP ${res.status}: Failed to fetch designations`);
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
      setApiError('Failed to load designations. Please refresh the page.');
      cb([]);
    } finally {
      setLoading(false);
    }
  };

  const getReporting = async (cb) => {
    if (!formData.dasignationRole) {
      cb([]);
      return;
    }

    try {
      setLoading(true);
      const res = await Axios.get(
        `?action=get_all_ReportUser&DesignationID=${formData.dasignationRole}`
      );
      if (res.status === 200) {
        cb(res.data || []);
      } else {
        throw new Error(`HTTP ${res.status}: Failed to fetch reporting users`);
      }
    } catch (error) {
      console.error('Error fetching reporting users:', error);
      setApiError('Failed to load reporting users.');
      cb([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDesig(setDesigs);
    getReporting(setReportingTo);
  }, []);

  useEffect(() => {
    if (formData.dasignationRole) {
      getReporting(setReportingTo);
    } else {
      setReportingTo([]);
    }
  }, [formData.dasignationRole]);

  const validatePassword = (pwd) => {
    if (!pwd || pwd.length === 0) {
      return "";
    }
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (pwd.length > 8) {
      return "Password must be at 6 - 8 characters long.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(pwd)) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};

    // Required field validation
    if (!formData.employeeName?.trim()) {
      errors.employeeName = 'Employee name is required';
    }

    if (!formData.dasignationRole) {
      errors.dasignationRole = 'Designation is required';
    }

    if (!formData.userName?.trim()) {
      errors.userName = 'Username is required';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Phone number must contain only digits';
    } else if (formData.phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }

    if (!formData.address?.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.reportingTo) {
      errors.reportingTo = 'Reporting to is required';
    }

    if (!formData.status && formData.status !== 0) {
      errors.status = 'Status is required';
    }

    // Password validation (only if password is provided)
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general API error when user makes changes
    if (apiError) {
      setApiError("");
    }

    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    
    // Clear errors
    if (formErrors.password) {
      setFormErrors(prev => ({
        ...prev,
        password: ''
      }));
    }
    if (apiError) {
      setApiError("");
    }

    setFormData(prev => ({
      ...prev,
      password: newPassword
    }));

    // Only validate if password is not empty
    if (newPassword) {
      const validationMessage = validatePassword(newPassword);
      if (validationMessage) {
        setFormErrors(prev => ({
          ...prev,
          password: validationMessage
        }));
      }
    }
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setApiError("");
    
    // Validate form
    if (!validateForm()) {
      setApiError("Please fix the form errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const dataWillbeSubmitted = {
        EmployeeID: formData.EmployeeID,
        EmpName: formData.employeeName.trim(),
        DesignationID: formData.dasignationRole,
        Username: formData.userName.trim(),
        Email: formData.email.trim(),
        Phone: formData.phone.trim(),
        Address: formData.address.trim(),
        ReportingToUserID: formData.reportingTo,
        Status: formData.status == 1 ? true : false,
      };

      // Only include password if it's provided
      if (formData.password) {
        dataWillbeSubmitted.Password = formData.password;
      }

      const res = await Axios.put(
        `?action=update_sndUserWithoutImage&UserID=${id}`,
        dataWillbeSubmitted
      );

      if (res.status === 200) {
        router.push('/dashboard/user-employee');
      } else {
        throw new Error(`HTTP ${res.status}: Update failed`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      
      let errorMessage = 'Failed to update user. ';
      if (error.response) {
        // Server responded with error status
        errorMessage += `Server error: ${error.response.status}`;
        if (error.response.data) {
          errorMessage += ` - ${JSON.stringify(error.response.data)}`;
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage += 'No response from server. Please check your connection.';
      } else {
        // Something else happened
        errorMessage += error.message;
      }
      
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading user data...</div>
      </div>
    );
  }

  // Show error state for initial data loading
  if (status === 'error' || dataError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-64">
        <div className="text-red-600 text-lg mb-4">Failed to load user data</div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary1 px-6 py-2 rounded-md text-surface1"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">User Management</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>

      {/* API Error Display */}
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error: </strong>{apiError}
        </div>
      )}

      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <input name="id" value={id} readOnly className="hidden" />
        
        <div className="mb-5">
          <div>
            <label
              className="capitalize flex font-semibold text-md py-1"
            >
              employee Id:
            </label>
            <input
              className="w-full rounded-md mb-1"
              value={formData.EmployeeID}
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="EmployeeName"
              className="capitalize flex font-semibold text-md py-1"
            >
              employee Name:
            </label>
            <input
              id="EmployeeName"
              type="text"
              name="employeeName"
              className={`w-full rounded-md mb-1 ${formErrors.employeeName ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.employeeName}
              required
            />
            {formErrors.employeeName && (
              <p className="text-red-500 text-sm">{formErrors.employeeName}</p>
            )}
          </div>

          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Designation/Role:
            </label>
            <select
              name="dasignationRole"
              className={`w-full rounded-md ${formErrors.dasignationRole ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.dasignationRole}
              required
            >
              <option value="">Select Designation</option>
              {desigs.length > 0 ? (
                desigs.map(item => (
                  <option value={item.ID} key={item.ID}>
                    {item.CategoryName}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading designations...</option>
              )}
            </select>
            {formErrors.dasignationRole && (
              <p className="text-red-500 text-sm">{formErrors.dasignationRole}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="userName"
              className="capitalize flex font-semibold text-md py-1"
            >
              User Name / User Id:
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              className={`w-full rounded-md mb-1 ${formErrors.userName ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.userName}
              required
            />
            {formErrors.userName && (
              <p className="text-red-500 text-sm">{formErrors.userName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Password"
              className="capitalize flex font-semibold text-md py-1"
            >
              password:
            </label>
            <input
              id="Password"
              type="password"
              name="password"
              className={`w-full rounded-md mb-1 ${formErrors.password ? 'border-red-500 border-2' : ''}`}
              onChange={handlePasswordChange}
              value={formData.password}
              placeholder="Leave blank to keep current password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Email"
              className="capitalize flex font-semibold text-md py-1"
            >
              email:
            </label>
            <input
              id="Email"
              type="email"
              name="email"
              className={`w-full rounded-md mb-1 ${formErrors.email ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.email}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Phone"
              className="capitalize flex font-semibold text-md py-1"
            >
              Phone:
            </label>
            <input
              id="Phone"
              type="tel"
              name="phone"
              className={`w-full rounded-md mb-1 ${formErrors.phone ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.phone}
              required
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Address"
              className="capitalize flex font-semibold text-md py-1"
            >
              address:
            </label>
            <input
              id="Address"
              type="text"
              name="address"
              className={`w-full rounded-md mb-1 ${formErrors.address ? 'border-red-500 border-2' : ''}`}
              onChange={handleChange}
              value={formData.address}
              required
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm">{formErrors.address}</p>
            )}
          </div>

          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              reporting to:
            </label>
            <select
              name="reportingTo"
              className={`w-full rounded-md ${formErrors.reportingTo ? 'border-red-500 border-2' : ''}`}
              value={formData.reportingTo}
              onChange={handleChange}
              required
            >
              <option value="">Select Reporting To</option>
              {reportingTo.length > 0 ? (
                reportingTo.map(item => (
                  <option value={item.UserID} key={item.UserID}>
                    {item.ReportUsers}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {formData.dasignationRole ? 'No reporting users found' : 'Select designation first'}
                </option>
              )}
            </select>
            {formErrors.reportingTo && (
              <p className="text-red-500 text-sm">{formErrors.reportingTo}</p>
            )}
          </div>

          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Status
            </label>
            <select
              name="status"
              className={`w-full rounded-md ${formErrors.status ? 'border-red-500 border-2' : ''}`}
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="1">active</option>
              <option value="0">disable</option>
            </select>
            {formErrors.status && (
              <p className="text-red-500 text-sm">{formErrors.status}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-primary1 px-6 py-2 rounded-md text-surface1 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary2'}`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UserEmployeeEdit;