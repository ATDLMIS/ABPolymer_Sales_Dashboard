'use client'
import Link from "next/link";
import useGetData from "@/utils/useGetData";
import { useSession } from "next-auth/react";
import DataTable from "../table/DataTable";
import { FaEye} from 'react-icons/fa';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const CompleteOrderList = () => {
  const { data: session } = useSession();
  const userID = session?.user?.id || 501; // Fallback to 501 if session is not available

  const {status, data} = useGetData(
    `?action=get_MoneyReceiptComplete&UserID=${userID}`
  );

  // Define table columns
  const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '15%',
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
      width: '15%'
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
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
            <Link
            href={`/dashboard/money-receipt-approval/view/${row.MRID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaEye className="text-lg" />
          </Link>
          
        </div>
      )
    }
  ];

  return (
    <>
      <h1 className="text-2xl capitalize mb-2">Completed list</h1>
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

export default CompleteOrderList;
