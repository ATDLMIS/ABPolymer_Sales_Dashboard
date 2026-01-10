import React from 'react';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import convertDateFormat from '@/utils/convertDateFormat';
import DataTable from '../table/DataTable';
import { useSession } from 'next-auth/react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ChallanCompleteList = () => {
    const {data:season}=useSession();
     const userID=season?.user.id;
  const salesOrderList = useGetData(
    `?action=get_ChallanApproval_Complete&UserID=${userID}`
  );
    const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'ChallanNo',
      header: 'Challan No',
      width: '15%'
    },
    {
      key: 'ChallanDate',
      header: 'Challan Date',
      width: '15%'
    },
    {
      key: 'TripNo',
      header: 'Trip No',
      width: '15%'
    },
    // {
    //   key:  type === 'speciman'
    //                       ? 'SpecimenUserName'
    //                       : 'partyname',
    //   header:  type === 'speciman' ? 'Employee Name' : 'Party Name',
    //   width: '25%'
    // },
  
    {
      key: 'PartyName',
      header: 'Party Name',
      width: '25%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
    },
       {
      key: 'RetailerDetailsProfile',
      header: 'Retailer',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div 
          className="text-xs leading-tight break-all overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '2.8em',
            lineHeight: '1.4'
          }}
          title={row.RetailerDetailsProfile || 'N/A'}
        >
          {row.RetailerDetailsProfile || 'N/A'}
        </div>
      )
    },
    // {
    //   key: 'StatusName',
    //   header: 'Challan Status',
    //   width: '10%'
    // },
    // {
    //   key: 'StatusName',
    //   header: 'Challan Status',
    //   width: '10%'
    // },
    
    {
      key: 'actions',
      header: 'Actions',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
           <Link
           href={`/dashboard/delivery-challan-approval/view/${row.ChallanID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaEye  className="text-lg" />
          </Link>
        
         
          
          
        </div>
      )
    }
  ];
  return (
     <div >
      <DataTable
        columns={columns}
        data={salesOrderList?.data || []}
        isLoading={salesOrderList.status === 'loading'}
        error={salesOrderList.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
  );
};

export default ChallanCompleteList;
