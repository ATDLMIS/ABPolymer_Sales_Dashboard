'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BookManagementEdit = ({ id }) => {
  const [formData, setFormData] = useState({
    category: '',
    bookTitle: '',
    status: '',
  });

  const [prevData, setPrevData] = useState({});
  const url =
    '?action=get_bookscategorys';
  const { status, data } = useGetData(url);

  const getProductDetails = async (id, cb) => {
    const res = await Axios.get(
      `?action=get_product&ProductID=${id}`
    );
    cb({
      ...res.data,
    });
  };

  useEffect(() => {
    getProductDetails(id, setPrevData);
  }, []);

  useEffect(() => {
    if (prevData.ProductID) {
      const filterItem = data.filter(
        item => item.CategoryName === prevData.Category
      );
      if (filterItem[0]) {
        setFormData({
          category: filterItem[0].ID,
          bookTitle: prevData.ProductName,
          status: prevData.status,
        });
      }
    }
  }, [prevData]);

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
      `?action=update_product&ProductID=${id}`,
      {
        Categoryid: formData.category,
        ProductName: formData.bookTitle,
        status: formData.status,
      }
    );
    router.push('/dashboard/book-management');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Books management</h1>
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
          add new Books / Edit Books
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Product Type:
            </label>

            <select
              name="category"
              className="w-full rounded-md"
              defaultValue={formData.category}
              onChange={handleChange}
              value={formData.category}
            >
              <option value="" disabled={true} selected></option>
              {data.length &&
                data.map(item => (
                  <option value={item.ID} key={item.ID}>
                    {item.CategoryName}
                  </option>
                ))}
            </select>
          </div>
          <label htmlFor="BookTitle" className="block text-sm font-bold mb-1">
            Book Name :
          </label>
          <input
            type="text"
            id="BookTitle"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="bookTitle"
            onChange={handleChange}
            value={formData.bookTitle}
          />
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

          <div className="mt-5">
            <button
              className="capitalize bg-primary1 px-5 py-1 text-white rounded-md"
              type="submit"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookManagementEdit;
// DLogicKBL/salesforce_api.php?action=get_product&ProductID=145
