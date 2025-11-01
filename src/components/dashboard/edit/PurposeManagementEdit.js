'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PurposeManagementEdit = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    purpose: '',
  });

  const { status, data } = useGetData(
    `?action=get_visitpurpose&ID=${id}`
  );

  useEffect(() => {
    setFormData({
      purpose: data.CategoryName,
    });
  }, [data]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await Axios.put(
      `?action=update_visitpurpose&ID=${id}`,
      {
        CategoryType: 'visitpurpose',
        CategoryName: formData.purpose,
      }
    );
    if (res.status === 200) {
      setFormData({
        purpose: '',
      });
      router.push('/dashboard/purpose-management');
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Marketing Activity List</h1>
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
          Update Activity List
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Purpose" className="block text-sm font-bold mb-1">
            Activity:
          </label>
          <input
            type="text"
            id="Purpose"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="purpose"
            value={formData.purpose}
            onChange={e => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            required
          />
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              Update Activity
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PurposeManagementEdit;
