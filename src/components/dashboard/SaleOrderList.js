'use client';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Link from 'next/link';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import DataTable from '../table/DataTable';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SaleOrderList = () => {
  const url ='?action=get_salesorders'

const { status, data } = useGetData(url);
  // Define table columns
  const columns = [
    {
      key: 'SalesOrderID',
      header: 'Order ID',
      width: '10%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'SalesOrderNo',
      header: 'Sales Order No',
      width: '15%'
    },
    {
      key: 'OrderDate',
      header: 'Order Date',
      width: '15%'
    },
    {
      key: 'partyname',
      header: 'Party Name',
      width: '20%'
    },
    {
      key: 'Status',
      header: 'Status',
      width: '15%'
    },
    {
      key: 'logUserName',
      header: 'Log User Name',
      width: '20%'
    },
    {
      key: 'TotalAmount',
      header: 'Total Amount',
      width: '15%'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`/dashboard/sales-order/view/sales/${row.SalesOrderID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <FaEye className="text-lg" />
          </Link>
          
          <Link
            href={`/dashboard/sales-order/edit/sales/${row.SalesOrderID}`}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            
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

export default SaleOrderList;
