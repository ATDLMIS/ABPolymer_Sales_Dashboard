"use client"
import axios from 'axios'
import {useState, useEffect} from 'react'
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({params}) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  })

  const getData = async id => {
    try {
      const res = await Axios.get(`?action=get_ChallanOrderDetails&ChallanID=${id}`)
      setState({
        status: "idle",
        data: res.data
      })
    } catch (error) {
      setState({
        status: "error",
        data: null
      })
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    if(params.id){
      getData(params.id)
    }
  }, [params.id])

  if(state.status === 'pending'){
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Challan Details...</h2>
          <p className="text-gray-500 mt-1">Please wait while we fetch the information</p>
        </div>
      </div>
    )
  }

  if(state.status === 'error'){
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-4">We couldn't retrieve the challan details. Please try again later.</p>
          <button 
            onClick={() => getData(params.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with Preview Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Delivery Challan Details</h1>
        <Link
          href={`/dashboard/delivery-challan/preview/speciman/${params.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Preview
        </Link>
      </div>

      {/* Challan Summary Card */}
      {state.data && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-blue-600 px-4 py-3">
            <h2 className="text-lg font-semibold text-white">Challan Information</h2>
          </div>
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <InfoRow label="Date" value={convertDateFormat(state.data.ChallanMaster.ChallanDate)} />
                <InfoRow label="Challan No" value={state.data.ChallanMaster.ChallanNo} />
                <InfoRow label="Sales Order No" value={state.data.ChallanMaster.SalesOrderNo} />
              </div>
              <div className="space-y-3">
                <InfoRow label="Employee Name" value={state.data.ChallanMaster.EmployeeName} />
                <InfoRow label="Status" value={state.data.ChallanMaster.StatusName} />
                <InfoRow label="Contact" value={state.data.ChallanMaster.ContactNumber} />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Address</h3>
              <p className="text-gray-700">{state.data.ChallanMaster.Address}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Challan Items Table */}
      {state.data && state.data.ChallanDetails && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 px-4 py-3">
            <h2 className="text-lg font-semibold text-white">Challan Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Financial Year</TableHeader>
                  <TableHeader>Product Name</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.data.ChallanDetails.map((item, index) => (
                  <tr key={item.ChallanDetailID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <TableCell>{item.FinancialYear}</TableCell>
                    <TableCell>{item.ProductName}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {formatAmountWithCommas(Number(item.ChallanQty))}
                      </span>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Reusable components for better code organization
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
    <span className="text-sm font-medium text-gray-500 min-w-[120px]">{label}</span>
    <span className="text-gray-700 font-medium">{value || '-'}</span>
  </div>
)

const TableHeader = ({ children }) => (
  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
)

const TableCell = ({ children }) => (
  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
    {children}
  </td>
)

export default Page