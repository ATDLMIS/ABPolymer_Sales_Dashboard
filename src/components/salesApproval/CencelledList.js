import Link from "next/link"
import { FaEye} from 'react-icons/fa';
import DataTable from "../table/DataTable";

const CencelledList = ({CancelledData, type}) => {
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
           href={type === 'sales' ? `/dashboard/sales-order-approval/view/sales-view/${item.SalesOrderID}`: `/dashboard/sales-order-approval/view/speciman-view/${item.SalesOrderID}`}
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
        data={CancelledData?.data}
        isLoading={CancelledData?.status === 'loading'}
        error={ CancelledData?.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
  )
}

export default CencelledList