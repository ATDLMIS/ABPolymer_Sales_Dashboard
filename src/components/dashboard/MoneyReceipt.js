'use client';
import useGetData from '@/utils/useGetData';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Link from 'next/link';
import DataTable from '../table/DataTable';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const MoneyReceipt = () => {
  
   const url = '?action=get_moneyreceipts'
  
   const { status, data } = useGetData(url);
  // Define table columns
  const columns = [
    {
      key: 'MRID',
      header: 'Money Receipt No.',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'MRDate',
      header: 'Receipt Date',
      width: '15%'
    },
    {
      key: 'PartyName',
      header: 'Party Name',
      width: '15%'
    },
    {
      key: 'AmountReceived',
      header: 'Amount Received',
      width: '15%'
    },
    {
      key: 'PaymentMethod',
      header: 'Payment Method',
      width: '15%'
    },
    {
      key: 'PaymentMethodDetails',
      header: 'Bank Name/Purpose',
      width: '15%'
    },
    
   
    {
      key: 'actions',
      header: 'Actions',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`/dashboard/money-receipt/view/${row.MRID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
             title="View Details"
          >
            <FaEye className="text-lg" />
          </Link>
          
          <Link
            href={`/dashboard/money-receipt/edit/${row.MRID}`}
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

export default MoneyReceipt;


