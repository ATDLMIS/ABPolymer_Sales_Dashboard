"use client"
import { useState, useEffect } from 'react'
import { Printer, Download, Search, FileText, Calendar, User, MapPin, Package, Eye } from 'lucide-react'
import Axios from '@/utils/axios'
import Link from 'next/link'
import Loading from '@/components/Loading'
import InfoCard from '@/components/Card/InfoCard'
import PartyCard from '@/components/Card/PartyCard'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton/BackButton'

const formatAmountWithCommas = (amount) => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const InvoicePage = ({ params }) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  })
  const router = useRouter();

  const getDataById = async (id) => {
    try {
      const res = await Axios.get(`?action=get_InvoiceOrderDetails&InvoiceID=${id}`)
      console.log("InvoiceBill", res.data)
      setState({
        status: 'idle',
        data: res.data
      })
    } catch (error) {
      console.error("Error fetching invoice data:", error)
      setState({
        status: 'error',
        data: null
      })
    }
  }

  useEffect(() => {
    if (params?.id) {
      getDataById(params.id)
    }
  }, [params?.id])

  if (state.status === 'pending') {
    return (
      <Loading />
    )
  }

  if (state.status === 'error' || !state.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-800 font-semibold text-lg mb-2">Failed to load invoice</p>
          <p className="text-gray-600">Please try again or contact support</p>
        </div>
      </div>
    )
  }

  const grandTotal = state.data.InvoiceDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <BackButton router={router} title="Invoice Details" />
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link 
              href={`/dashboard/invoice-bill/preview/sales/${params.id}`}
               className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary1 text-white rounded-lg  transition-colors shadow-sm font-medium">
                <Eye className="w-5 h-5" />
                Preview
              </Link>
             
            </div>
          </div>
        </div>

        {/* Main Invoice Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          

          <div className="p-8">
            {/* Invoice Numbers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                 <InfoCard
                         label="Challan No"
                     value={state.data.InvoiceMaster.ChallanNo}
                     icon={<FileText className="w-5 h-5 text-white" />}
                       color="blue"
                      />
                 <InfoCard
                        label="Invoice No"
                    value={state.data.InvoiceMaster.InvoiceNo}
                    icon={<FileText className="w-5 h-5 text-white" />}
                      color="indigo"
                     />
             
                           
                               <InfoCard
                        label="Invoice Date"
                    value={state.data.InvoiceMaster.InvoiceDate}
                    icon={<FileText className="w-5 h-5 text-white" />}
                      color="orange"
                     />
            </div>

            
                {/* Party Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Party Information */}
             
    <PartyCard
  data={{
    partyName: state.data.InvoiceMaster.PartyName || 'N/A',
    contactName: state.data.InvoiceMaster.ContactName || 'N/A',
    address: state.data.InvoiceMaster.PresentAddress || 'N/A'
  }}
/>
              {/* Retailer Information */}
              {state.data.InvoiceMaster.RetailderName && (
                   <RetailerCard
  data={{
    partyName:state.data.InvoiceMaster.RetailderName || 'N/A',
    contactName:state.data.InvoiceMaster.RetailerContactPerson || 'N/A',
    address: state.data.InvoiceMaster.RetailerAddress || 'N/A'
  }}
/>
              )}
            </div>
            

            {/* Product Details Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary1 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold  text-gray-900">Product Details</h2>
              </div>
              
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          SL
                        </th>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          Product Name
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Qty
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          U.Price
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white tracking-wider">
                          Sub.T
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Disc%
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white tracking-wider">
                          N.Amount
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Add. 
                          Disc %
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          G.Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.data.InvoiceDetails.map((item, index) => (
                        <tr key={item.InvoiceDetailID || index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {item.ProductName || 'N/A'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                            {item.Quantity || '0'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right">
                           {formatAmountWithCommas(Number(item.UnitPrice) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                           {formatAmountWithCommas(Number(item.SubTotal) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-orange-600 text-right font-medium">
                            {item.DiscountPercentage || '0'}%
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                           {formatAmountWithCommas(Number(item.NetAmount) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-orange-600 text-right font-medium">
                            {item.AppDisPercent || '0'}%
                          </td>
                          <td className="px-4 py-4 text-sm text-blue-600 text-right font-bold ">
                           {formatAmountWithCommas(Number(item.GrandTotal) || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <tr>
                        <td colSpan="8" className="px-4 py-4 text-sm font-semibold text-black text-right ">
                          Grand Total:
                        </td>
                        <td className="px-4 py-4 text-sm text-blue-600 text-right font-bold ">
                         {formatAmountWithCommas(grandTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePage