"use client"
import {useState, useEffect} from 'react'
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
import Axios from '@/utils/axios';

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

  // Function to format date as "20 -12 -2025"
  const formatDateWithDashes = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} -${month} -${year}`;
  }

  // Handle print with better styling
  const handlePrint = () => {
    const printContent = document.getElementById('print-area');
    const newWindow = window.open('', '_blank', 'width=900,height=650');
    
    newWindow.document.write(`
      <html>
        <head>
          <title>Delivery Challan - ${state.data?.ChallanMaster?.ChallanNo || 'Challan'}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
              .print-area { box-shadow: none; border: 1px solid #ddd; }
            }
            table { border-collapse: collapse; }
            th, td { border: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="print-area">${printContent.innerHTML}</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            }
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  }

  if(state.status === 'pending'){
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Loading Challan Details...</div>
        </div>
      </div>
    )
  }

  if(state.status === 'error'){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Challan</h2>
          <p className="text-gray-600 mb-4">Error loading data. Please try again.</p>
        </div>
      </div>
    )
  }

  const { ChallanMaster, ChallanDetails } = state.data;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Delivery Challan</h1>
          <p className="text-gray-600 mt-1">View and print delivery challan details</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/delivery-challan/preview/sales/${params.id}`}
            className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </Link>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Main Challan Container */}
      <div id="print-area" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header with Company Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Delivery Challan</h1>
              </div>
              <p className="text-gray-600 text-sm">Asian AB Polymer Ltd.</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-lg font-bold text-blue-600">{ChallanMaster.ChallanNo}</div>
              <div className="text-gray-600 text-sm mt-1">
                Date: {formatDateWithDashes(ChallanMaster.ChallanDate)}
              </div>
            </div>
          </div>

          {/* Challan Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dealer Information Card */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-blue-500 rounded"></div>
                <h3 className="font-semibold text-gray-700">Dealer Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Name:</span>
                  <span className="text-gray-800">
                    {ChallanMaster.PartyCode} - {ChallanMaster.PartyName}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Contact:</span>
                  <span className="text-gray-800">
                    {ChallanMaster.ContactName || 'N/A'}, {ChallanMaster.ContactNumber || 'N/A'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Address:</span>
                  <span className="text-gray-800">{ChallanMaster.PermanentAddress || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Delivery Point Information Card */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-green-500 rounded"></div>
                <h3 className="font-semibold text-gray-700">Delivery Point</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Retailer:</span>
                  <span className="text-gray-800">
                    {ChallanMaster.RetailerCode || 'N/A'} - {ChallanMaster.RetailerName || 'N/A'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Contact:</span>
                  <span className="text-gray-800">
                    {ChallanMaster.ContactPersonName || 'N/A'}, {ChallanMaster.ContactPhone1 || 'N/A'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-600 min-w-[120px]">Address:</span>
                  <span className="text-gray-800">{ChallanMaster.Address || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order and Delivery Information */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Vehicle Type</div>
              <div className="text-lg font-semibold text-gray-800">{ChallanMaster.Own_Hire || 'N/A'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Vehicle No</div>
             <div className="text-lg font-semibold text-gray-800">{ChallanMaster.Vehicle_Number || 'N/A'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Driver Details</div>
                            <div className="text-sm text-gray-700">
                <div className="mb-1"><span className="font-medium">Name:</span> {ChallanMaster.DriverName || 'N/A'}</div>
                <div><span className="font-medium">Contact:</span> {ChallanMaster.Driver_Number || 'N/A'}</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Transport Name</div>
              <div className="text-sm text-gray-700">
                <div><span className="font-medium">Name:</span> {ChallanMaster.HireAgentName || 'N/A'}</div>
              </div>
            </div>
          </div>

         
        </div>

        {/* Product Details Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
            <div className="text-sm text-gray-500">
              Total Items: <span className="font-semibold text-blue-600">{ChallanDetails.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    SL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Order No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ChallanDetails.map((item, index) => (
                  <tr key={item.ChallanDetailID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium border-r border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full text-blue-600">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <span className="font-medium">{item.SalesOrderNo}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                      <div>
                        <div className="font-medium text-gray-800">{item.ProductName || item.ProductNameRepo}</div>
                        {item.FinancialYear && (
                          <div className="text-xs text-gray-500 mt-1">{item.FinancialYear}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                        {formatAmountWithCommas(Number(item.ChallanQty))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Signatures Section */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 flex items-end justify-center">
                <div className="w-48 border-t border-gray-400 pt-2"></div>
              </div>
              <div className="text-lg font-semibold text-gray-700 mt-4">Prepared By</div>
              <div className="text-sm text-gray-600 mt-1">
                {ChallanMaster.UserName || 'N/A'}
                {ChallanMaster.Designation && `, ${ChallanMaster.Designation}`}
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-20 flex items-end justify-center">
                <div className="w-48 border-t border-gray-400 pt-2"></div>
              </div>
              <div className="text-lg font-semibold text-gray-700 mt-4">Verified By</div>
              <div className="text-sm text-gray-600 mt-1">
                {ChallanMaster.EmployeeName || 'N/A'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-20 flex items-end justify-center">
                <div className="w-48 border-t border-gray-400 pt-2"></div>
              </div>
              <div className="text-lg font-semibold text-gray-700 mt-4">Authorized By</div>
              <div className="text-sm text-gray-600 mt-1">
                {ChallanMaster.ApprovedUserName || 'N/A'}
                {ChallanMaster.ApprovedDesignation && `, ${ChallanMaster.ApprovedDesignation}`}
              </div>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              This is a computer generated challan. For any query, contact: +8801847055239
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4 no-print">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Back
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Challan
        </button>
      </div>
    </div>
  )
}

export default Page