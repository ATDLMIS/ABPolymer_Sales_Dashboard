'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle ,FaEye,FaLock} from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import DataTable from '../table/DataTable';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ChallanPendingList = () => {
  const router = useRouter();
    const {data:season}=useSession();
   const userID=season?.user.id;
  const salesorderList = useGetData(
    `?action=get_ChallanApproval&UserID=${userID}`
  );

 const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString.split(' ')[0];
  };

  const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '5%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center text-xs'
    },
    {
      key: 'ChallanNo',
      header: 'Challan No',
      width: '12%',
      cellClassName: 'text-xs font-medium'
    },
    {
      key: 'ChallanDate',
      header: 'Date',
      width: '8%',
      render: (row) => (
        <div className="text-xs whitespace-nowrap">
          {formatDate(row.ChallanDate)}
        </div>
      )
    },
    {
      key: 'PartyName',
      header: 'Party Name',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-left'
    },
    {
      key: 'RetailerDetailsProfile',
      header: 'Retailer',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-left',
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
     {
      key: 'AppStatusText',
      header: 'Challan Status',
      width: '12%',
      cellClassName: 'text-xs font-medium'
    },
       {
      key: 'actions',
      header: 'Actions',
      width: '7%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
           <Link
           href={`/dashboard/delivery-challan-approval/approval/${row.ChallanID}`}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaCheckCircle  className="text-lg" />
          </Link>
        
         
          
          
        </div>
      )
    }
  ];

 

  return (
    <div>

      <DataTable
        columns={columns}
        data={salesorderList?.data || []}
        isLoading={salesorderList.status === 'loading'}
        error={salesorderList.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
  );
};

export default ChallanPendingList;
