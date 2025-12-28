"use client"
import axios from 'axios'
import {useState, useEffect} from 'react'
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  })
  console.log(state.data)

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
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-xl text-center font-semibold py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
          Loading...
        </div>
      </div>
    )
  }

  if(state.status === 'error'){
    return (
      <div className="text-xl text-center font-semibold py-10 text-red-500">
        Error loading data. Please try again.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Delivery Challan Details</h1>
      </div>

      {state.data && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Date:</h2>
                <p className="text-gray-600">{convertDateFormat(state.data.ChallanMaster.ChallanDate)}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Challan No:</h2>
                <p className="text-gray-600">{state.data.ChallanMaster.ChallanNo}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Sales Order No:</h2>
                <p className="text-gray-600">{state.data.ChallanMaster.SalesOrderNo}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Party Name:</h2>
                <p className="text-gray-600">{state.data.ChallanMaster.PartyName}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
                <p className="text-gray-600">{state.data.ChallanMaster.StatusName}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-700">Contact:</h2>
                <p className="text-gray-600">{state.data.ChallanMaster.ContactNumber}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Address:</h2>
            <p className="text-gray-600">{state.data.ChallanMaster.Address}</p>
          </div>
        </div>
      )}
      
      {state.data && state.data.ChallanDetails && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Financial Year
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.data.ChallanDetails.map((item, index) => (
                  <tr key={item.ChallanDetailID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {item.FinancialYear}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {item.ProductName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatAmountWithCommas(Number(item.ChallanQty))}
                    </td>
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

export default page