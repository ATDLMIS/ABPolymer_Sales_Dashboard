'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    institutionType: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.institutionType) {
      return;
    }
    const res = await Axios.post(
      '?action=create_institutiontype',
      {
        CategoryType: 'institution-type',
        CategoryName: formData.institutionType,
      }
    );
    if (res.status === 200) {
      setFormData({
        institutionType: '',
      });
      router.push('/dashboard/institution-type');
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">
          Institution-Type Management
        </h1>
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
          add new Institution-Type
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="institution" className="block text-sm font-bold mb-1">
            Institution-Type:
          </label>
          <input
            type="text"
            id="institution"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="institutionType"
            value={formData.institutionType}
            onChange={e => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              save Institution-Type
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
