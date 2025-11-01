'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SubjectManagementEdit = ({ id }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    classInfoName: '',
  });
  const { status, data } = useGetData(
    `?action=get_subjectinfo&ID=${id}`
  );

  const classInfo = useGetData(
    '?action=get_classinfos'
  );

  useEffect(() => {
    setFormData({
      subjectName: data.SubjectName,
      classInfoName: data.sndClassID,
    });
  }, [data]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await Axios.put(
      `?action=update_subjectinfo&ID=${id}`,
      {
        SubjectName: formData.subjectName,
        sndClassID: formData.classInfoName,
      }
    );
    if (res.status === 200) {
      router.push('/dashboard/subject-management');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">subject-Info management</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="max-w-2xl bg-gray-200 rounded-md px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          add new subject-Info
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="SubjectName" className="block text-sm font-bold mb-1">
            Subject-Name:
          </label>
          <input
            type="text"
            id="SubjectName"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Class Name:
            </label>
            <select
              name="classInfoName"
              className="w-full rounded-md"
              value={formData.classInfoName}
              onChange={handleChange}
            >
              <option value="" disabled={true} selected></option>
              {classInfo.data.length &&
                classInfo.data.map(item => (
                  <option value={item.ID} key={item.ID}>
                    {item.CategoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-5">
            <button
              className="capitalize bg-primary1 px-5 py-1 text-white rounded-md"
              type="submit"
            >
              Save Subject-Info
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubjectManagementEdit;
