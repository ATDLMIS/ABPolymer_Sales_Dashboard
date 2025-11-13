// BookManagement.jsx - Using the reusable DataTable
'use client';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import DataTable from '../table/DataTable';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BookManagement = () => {
  const url = '?action=get_products';
  const { status, data } = useGetData(url);
  // Define table columns
  const columns = [
    {
      key: 'ProductCode',
      header: 'Product Code',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'CategoryName',
      header: 'Product Type',
      width: '7%'
    },
    {
      key: 'ProductName',
      header: 'Product Name',
      width: '15%'
    },
    {
      key: 'Price',
      header: 'Price',
      width: '5%'
    },
    // {
    //   key: 'OuterDiameter',
    //   header: 'Outer Diameter',
    //   width: '5%'
    // },
    {
      key: 'Thikness',
      header: 'Thikness',
      width: '5%'
    },
    {
      key: 'Length',
      header: 'Length',
      width: '5%'
    },
    // {
    //   key: 'Color',
    //   header: 'Color',
    //   width: '5%'
    // },
    {
      key: 'Weight',
      header: 'Weight',
      width: '5%'
    },
    {
      key: 'TradePrice',
      header: 'TradePrice',
      width: '5%'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '5%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`/dashboard/book-management/view/${row.ProductID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaEye className="text-lg" />
          </Link>
          
          <Link
            href={`/dashboard/book-management/edit/${row.ProductID}`}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="Edit Product"
          >
            <FaRegEdit className="text-lg" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">

      <DataTable
        columns={columns}
        data={data}
        isLoading={status === 'pending'}
        error={status === 'error' ? 'Failed to load products' : null}
        emptyMessage="No products found"
      />
    </div>
  );
};

export default BookManagement;