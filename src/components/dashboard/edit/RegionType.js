'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RegionType = ({ id }) => {
  const url =
    '?action=get_regiontypes';
  const [formData, setFormData] = useState({
    regionType: '',
  });

  const { status, data } = useGetData(url);

  useEffect(() => {
    if (data.length) {
      const founded = data.filter(item => item.ID === Number(id));
      setFormData({
        regionType: founded[0].CategoryName,
      });
    }
  }, [data]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.regionType) {
      return;
    }
    const res = await Axios.put(
      `?action=update_regiontype&ID=${id}`,
      {
        CategoryType: 'Region',
        CategoryName: formData.regionType,
      }
    );
    if (res.status === 200) {
      router.push(`/dashboard/region-type`);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Region-Type management</h1>
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
          add Region-Type
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="region" className="block text-sm font-bold mb-1">
            Region-Type:
          </label>
          <input
            type="text"
            id="region"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="regionType"
            value={formData.regionType}
            onChange={e => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              save region-type
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegionType;
