"use client";
import DataTable from '@/components/table/DataTable';
import Axios from '@/utils/axios';
import useGetData from '@/utils/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEye, FaRegEdit } from 'react-icons/fa';

const page = () => {
   const url =
      '?action=get_bookscategorys';
      const [allCategory, setAllCategory] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    const getData = async () => {
      setIsLoading(true);
      const response = await Axios.get(url);
      const result = response.data
      setIsLoading(false);
       return setAllCategory(result);
    }
    useEffect(() => {
      getData();
    }, []);
    // Define table columns
    const columns = [
      {
        key: 'ID',
        header: 'ID',
        width: '33%',
        headerClassName: 'text-center',
        cellClassName: 'font-medium text-center'
      },
      {
        key: 'CategoryName',
        header: 'Product Type',
        width: '33%'
      },
      {
        key: 'actions',
        header: 'Actions',
        width: '33%',
        headerClassName: 'text-center',
        cellClassName: 'text-center',
        render: (row) => (
          <div className="flex justify-center items-center gap-3">
            <Link
              href={`/dashboard/designation/view/${row.ID}`}
              className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              title="View"
            >
              <FaEye className="text-lg" />
            </Link>
            
            <Link
              href={`/dashboard/designation/edit/${row.ID}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              title="Edit"
            >
              <FaRegEdit className="text-lg" />
            </Link>
          </div>
        )
      }
    ];
  return (
    <div >
      <h1 className="text-2xl capitalize mb-3 ml-5">Product Type Management</h1>
      <div className="flex justify-between items-center ml-5">
        <Link href="/dashboard/book-category/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new Product Type
          </button>
        </Link>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
       <div className="container mx-auto px-4 py-6">
        <DataTable
              columns={columns}
              data={allCategory || []}
              isLoading={isLoading}
              error={null}
              emptyMessage="No data found"
            />
       </div>
       
    </div>
  );
};

export default page;