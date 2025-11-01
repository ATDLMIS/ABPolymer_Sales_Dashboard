'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Designation = ({ id }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
  });

  const url =
    '?action=get_desigs';
  const { status, data } = useGetData(url);

  useEffect(() => {
    if (data.length) {
      const founded = data.filter(item => item.ID === Number(id));
      setFormData({
        categoryName: founded[0].CategoryName,
      });
    }
  }, [data]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.categoryName) {
      return;
    }
    const res = await Axios.put(
      `?action=update_desig&ID=${id}`,
      {
        CategoryType: 'Designation',
        CategoryName: formData.categoryName,
      }
    );
    if (res.status === 200) {
      router.push(`/dashboard/designation`);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">designation</h1>
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
          add new designation
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="designation" className="block text-sm font-bold mb-1">
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="categoryName"
            required
            value={formData.categoryName}
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
              Save Designation
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Designation;
