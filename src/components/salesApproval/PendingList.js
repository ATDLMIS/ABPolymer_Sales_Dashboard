import Link from 'next/link';
import DataTable from '../table/DataTable';
import { FaRegClock , FaLock,FaCheckCircle} from 'react-icons/fa';
const PendingList = ({ pendingData, type }) => {
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
      key:  type === 'speciman'
                          ? 'SpecimenUserName'
                          : 'partyname',
      header:  type === 'speciman' ? 'Employee Name' : 'Party Name',
      width: '25%'
    },
  
    {
      key: 'TotalAmount',
      header: 'Total Amount',
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
           href={
                              type === 'sales'
                                ? `/dashboard/sales-order-approval/authorization/sales/${row.SalesOrderID}`
                                : `/dashboard/sales-order-approval/authorization/speciman/${row.SalesOrderID}`
                            }
            className="inline-flex items-center gap-2 bg-[#F3904F] text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaRegClock  className="text-lg" />
          </Link>):(
            <Link
            href={
                              type === 'sales'
                                ? `/dashboard/sales-order-approval/approval/sales/${row.SalesOrderID}`
                                : `/dashboard/sales-order-approval/approval/speciman/${row.SalesOrderID}`
                            }
            className="inline-flex items-center gap-2 bg-green-500 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
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
           <div >
      <DataTable
        columns={columns}
        data={pendingData?.data || []}
        isLoading={pendingData.status === 'loading'}
        error={pendingData.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
        
  );
};

export default PendingList;
