'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ClassManagementEdit = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    classManagement: '',
  });

  const { status, data } = useGetData(
    `?action=get_classinfo&ID=${id}`
  );

  useEffect(() => {
    setFormData({
      classManagement: data?.CategoryName,
    });
  }, [data]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await Axios.put(
      `?action=update_classinfo&ID=${id}`,
      {
        CategoryType: 'ClassInfo',
        CategoryName: formData.classManagement,
      }
    );
    console.log(res);
    if (res.status === 200) {
      setFormData({
        classManagement: '',
      });
      router.push('/dashboard/class-management');
    }
    console.log(formData);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">class-Info management</h1>
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
          Add new class-Info
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="ClassManagement"
            className="block text-sm font-bold mb-1"
          >
            Puroses:
          </label>
          <input
            type="text"
            id="ClassManagement"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="classManagement"
            value={formData.classManagement}
            onChange={e => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            required
          />
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              Save Class-Info
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClassManagementEdit;
