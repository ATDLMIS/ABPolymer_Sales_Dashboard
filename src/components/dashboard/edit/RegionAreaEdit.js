'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RegionAreaEdit = ({ id }) => {
  const [formData, setFormData] = useState({
    RegionName: '',
    ParentRegionID: '',
    RegionTypeID: '',
  });

  const { status, data } = useGetData(
    `?action=get_regionview&AreaRegionID=${id}`
  );

  useEffect(() => {
    setFormData({
      RegionName: data[0]?.AreaName,
      ParentRegionID: data[0]?.ParentRegionID,
      RegionTypeID: data[0]?.RegionTypeID,
    });
  }, [data]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await Axios.put(
      `?action=update_region&RegionID=${id}`,
      formData
    );
    router.push('/dashboard/region-area');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Region management</h1>
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
        <h2 className="text-lg font-semibold mb-2 capitalize">Update Region</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="RegionName" className="block text-sm font-bold mb-1">
            Region Area:
          </label>
          <input
            type="text"
            id="RegionName"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="RegionName"
            required
            value={formData.RegionName}
            onChange={e => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <div className="mt-5">
            <button
              className="capitalize bg-primary1 px-5 py-1 text-white rounded-md"
              type="submit"
            >
              Update Region
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegionAreaEdit;
