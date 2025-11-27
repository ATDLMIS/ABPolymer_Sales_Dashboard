import Link from "next/link"
import DataTable from "../table/DataTable";
import { FaEye} from 'react-icons/fa';
const CompletedList = ({completedData, type}) => {
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
         
         <Link
           href={type === 'sales' ? `/dashboard/sales-order-approval/view/sales-view/${row.SalesOrderID}`: `/dashboard/sales-order-approval/view/speciman-view/${row.SalesOrderID}`}
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
       <div >
      <DataTable
        columns={columns}
        data={completedData?.data}
        isLoading={completedData?.status === 'loading'}
        error={completedData?.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
    
  )
}

export default CompletedList