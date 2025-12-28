'use client'
import Link from 'next/link';
import { FaRegClock , FaLock,FaCheckCircle} from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import convertDateFormat from "@/utils/convertDateFormat";
import formatAmountWithCommas from "@/utils/formatAmountWithCommas";
import { useSession } from 'next-auth/react';
import DataTable from '../table/DataTable';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PendingOrderList = () => {
    const { data: session } = useSession();
    const userID = session?.user?.id; // Fallback to 501 if session is not available

    const { status, data} = useGetData(`?action=get_MoneyReceiptApproval&UserID=${userID}`);

      // Define table columns
  const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'MRNo',
      header: 'Receipt No',
      width: '15%'
    },
    {
      key: 'MRDate',
      header: 'Date',
      width: '15%'
    },
    {
      key: 'PartyName',
      header: 'Party Name',
      width: '25%'
    },
  
    {
      key: 'AmountReceived',
      header: 'Received Amount',
      width: '15%'
    },
    {
      key: 'Status',
      header: 'Approval Status',
      width: '15%'
    },
    
    {
      key: 'actions',
      header: 'Actions',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
            {
            row.AppStatus === 1 ? ( <Link
            href={`/dashboard/money-receipt-approval/check/${row.MRID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaRegClock  className="text-lg" />
          </Link>):
          row.AppStatus === 2 ? (
            <Link
            href={`/dashboard/money-receipt-approval/authorized/${item.MRID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaLock className="text-lg" />
            </Link>
          ):(
            <Link
            href={`/dashboard/money-receipt-approval/approval/${item.MRID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaCheckCircle className="text-lg" />
            </Link>
          )
        }
         
          
          
        </div>
      )
    }
  ];

    return (
        <>
            <h1 className="text-2xl capitalize mb-2">Pending list</h1>
           <div className="container mx-auto px-4 py-6">

      <DataTable
        columns={columns}
        data={data}
        isLoading={status === 'pending'}
        error={status === 'error' ? 'Failed to load products' : null}
        emptyMessage="No data found"
      />
    </div>
        </>
    );
};

export default PendingOrderList;
