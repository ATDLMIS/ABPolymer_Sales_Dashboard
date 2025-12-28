import React from 'react';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import convertDateFormat from '@/utils/convertDateFormat';
import DataTable from '../table/DataTable';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ChallanCompleteList = () => {
  const salesOrderList = useGetData(
    '?action=get_challansOrder'
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
      key: 'StatusName',
      header: 'Challan Status',
      width: '10%'
    },
    // {
    //   key: 'Status',
    //   header: 'Status',
    //   width: '15%'
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
           href={`/dashboard/delivery-challan/view/sales/${row.ChallanID}`}
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
