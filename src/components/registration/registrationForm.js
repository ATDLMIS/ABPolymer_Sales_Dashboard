'use client';
import { useState, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';
import axios from 'axios';
import Image from 'next/image';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const registrationForm = () => {
  const [desigs, setDesigs] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  console.log(reportingTo);
  const [imagePreview, setImagePreview] = useState('');

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
      '?action=get_reporttoUsers'
    );
    if (res.status === 200) {
      cb(res.data);
    }
  };

  useEffect(() => {
    getDesig(setDesigs);
    getReporting(setReportingTo);
  }, []);
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
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="w-full"
      action="/api/signup"
      method="POST"
      encType="multipart/form-data"
    >
      <div>{/* image upload here */}</div>
      <div className="mb-5">
        <div>
          <div className="flex justify-center">
            <label
              htmlFor="Image"
              className="capitalize flex font-semibold text-md py-1"
            >
              {/* {formData.image ? (
                <div className="h-150">
                  <Image
                    src={imagePreview}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <RxAvatar className="text-8xl" />
              )} */}
            </label>
          </div>

          <input
            id="Image"
            name="image"
            type="file"
            className="w-full rounded-md mb-1 invisible"
            onChange={e => {
              const file = e.target.files[0];
              setFormData({ ...formData, [e.target.name]: file });
              const previewUrl = URL.createObjectURL(file);
              setImagePreview(previewUrl);
            }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="EmployeeID"
            className="capitalize flex font-semibold text-md py-1"
          >
            employeeID:
          </label>

          <input
            id="EmployeeID"
            name="employeeId"
            type="text"
            className="w-full rounded-md mb-1"
            onChange={handleChange}
            required
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
            defaultValue=""
            onChange={handleChange}
            required
          >
            <option value="" disabled={true} selected></option>
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
            User Name / User ID:
          </label>

          <input
            id="userName"
            type="text"
            name="userName"
            className="w-full rounded-md mb-1"
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
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
            className="w-full rounded-md mb-1"
            onChange={handleChange}
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
            defaultValue=""
            onChange={handleChange}
            required
          >
            <option value="" disabled={true} selected></option>
            {reportingTo.length &&
              reportingTo.map(item => (
                <option value={item.UserID} key={item.UserID}>
                  {item.reportUsers}
                </option>
              ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary1 w-full py-3 rounded-full text-surface1"
      >
        Register
      </button>
    </form>
  );
};

export default registrationForm;
