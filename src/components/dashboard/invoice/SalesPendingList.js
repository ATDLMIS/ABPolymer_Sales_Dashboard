import useGetData from "@/utils/useGetData"
import Link from "next/link"
import { FaRegClock , FaLock,FaCheckCircle} from 'react-icons/fa';
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from "@/utils/formatAmountWithCommas"
import DataTable from "@/components/table/DataTable";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesPendingList = () => {
    const {status, data} = useGetData('?action=get_salesordersInvoice')
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
      key: 'ChallanNo',
      header: 'Challan No',
      width: '15%'
    },
    // {
    //   key:`${convertDateFormat(ChallanDate)}`,
    //   header: 'Challan Date',
    //   width: '15%'
    // },
    // {
    //   key:  type === 'speciman'
    //                       ? 'SpecimenUserName'
    //                       : 'partyname',
    //   header:  type === 'speciman' ? 'Employee Name' : 'Party Name',
    //   width: '25%'
    // },
  
    {
      key: 'partyname',
      header: 'Party Name',
      width: '25%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
    },
    {
      key: 'challanstatusName',
      header: 'Challan Status',
      width: '10%'
    },
    {
      key: 'TotalAmount',
      header: 'Total Amount',
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
           href={`/dashboard/invoice-bill/add/sales/${row.ChallanID}`}
            className="inline-flex items-center gap-2 bg-green-500 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaRegClock  className="text-lg" />
          </Link>
        
         
          
          
        </div>
      )
    }
  ];
  return (
       <div >
      <DataTable
        columns={columns}
        data={data || []}
        isLoading={status === 'loading'}
        error={status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
  )
}

export default SalesPendingList