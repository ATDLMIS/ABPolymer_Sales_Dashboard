'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UserEmployeeEdit = ({ id }) => {
  const [desigs, setDesigs] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [error, setError] = useState("");
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

  const { status, data } = useGetData(
    `?action=get_sndUser&UserID=${id}`
  );

  useEffect(() => {
    if (status !== 'pending') {
      setFormData({
        employeeName: data.EmpName,
        EmployeeID: data.EmployeeID,
        dasignationRole: data.DesignationID,
        password: '',
        userName: data.Username,
        email: data.Email,
        phone: data.Phone,
        address: data.Address,
        reportingTo: data.ReportingToUserID,
        status: data.Status,
      });
    }
  }, [status]);

  const getDesig = async cb => {
    const res = await Axios.get(
      '?action=get_desigs'
    );
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
    getReporting(setReportingTo);
  }, []);

  useEffect(() => {
    if (formData.dasignationRole){ 
      getReporting(setReportingTo);
    }
  }, [formData.dasignationRole]);

  const validatePassword = (pwd) => {
    if (pwd.length === 0) {
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
      password: newPassword
    })
    const validationMessage = validatePassword(newPassword);
    setError(validationMessage);
  };

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    let dataWillbeSubmitted = {}
    dataWillbeSubmitted.EmployeeID = formData.EmployeeID
    dataWillbeSubmitted.EmpName = formData.employeeName
    dataWillbeSubmitted.DesignationID = formData.dasignationRole
    dataWillbeSubmitted.Username = formData.userName
    if(formData.password){
      dataWillbeSubmitted.Password = formData.password 
    }
    dataWillbeSubmitted.Email = formData.email
    dataWillbeSubmitted.Phone = formData.phone
    dataWillbeSubmitted.Address = formData.address
    dataWillbeSubmitted.ReportingToUserID = formData.reportingTo
    dataWillbeSubmitted.Status = formData.status == 1 ? true : false
    const res = await Axios.put(`?action=update_sndUserWithoutImage&UserID=${id}`, dataWillbeSubmitted)
    router.push('/dashboard/user-employee')
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
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <input name="id" value={id} readonly className="hidden" />
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
              className="w-full rounded-md mb-1"
              onChange={handleChange}
              value={formData.employeeName}
              required
            />
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Dasignation/Role:
            </label>
            <select
              name="dasignationRole"
              className="w-full rounded-md"
              onChange={handleChange}
              value={formData.dasignationRole}
              required
            >
              {desigs.length &&
                desigs.map(item => (
                  <option value={item.ID} key={item.ID}>
                    {item.CategoryName}
                  </option>
                ))}
            </select>
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
              className="w-full rounded-md mb-1"
              onChange={handleChange}
              value={formData.userName}
              required
            />
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
              className="w-full rounded-md mb-1"
              onChange={handlePasswordChange}
              value={formData.password}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
              className="w-full rounded-md mb-1"
              onChange={handleChange}
              value={formData.email}
              required
            />
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
              type="number"
              name="phone"
              className="w-full rounded-md mb-1"
              onChange={handleChange}
              value={formData.phone}
              required
            />
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
              className="w-full rounded-md mb-1"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              reporting to:
            </label>

            <select
              name="reportingTo"
              className="w-full rounded-md"
              value={formData.reportingTo}
              onChange={handleChange}
              required
            >
              {reportingTo.length &&
                reportingTo.map(item => (
                  <option value={item.UserID} key={item.UserID}>
                    {item.reportUsers}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Status
            </label>

            <select
              name="status"
              className="w-full rounded-md"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="1">active</option>
              <option value="0">disable</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary1 px-6 py-2 rounded-md text-surface1"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserEmployeeEdit;
