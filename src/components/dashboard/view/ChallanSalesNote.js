'use client'
import { useState, useEffect } from 'react';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Axios from '@/utils/axios';

const Page = ({ params }) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null,
    error: null
  });

  const getDataById = async (id) => {
    try {
      setState(prev => ({ ...prev, status: 'loading' }));
      const res = await Axios.get(`?action=get_InvoiceOrderDetails&InvoiceID=${id}`);
      
      if (res.data) {
        setState({
          status: 'idle',
          data: res.data,
          error: null
        });
      } else {
        setState({
          status: 'idle',
          data: null,
          error: 'No data received from server'
        });
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      setState({
        status: 'idle',
        data: null,
        error: error.message || 'Failed to load invoice data'
      });
    }
  };

  useEffect(() => {
    if (params?.id) {
      getDataById(params.id);
    }
  }, [params?.id]);

  const handlePrint = () => {
    try {
      const printContent = document.getElementById('print-area');
      if (!printContent) {
        console.error('Print area not found');
        return;
      }
      
      const newWindow = window.open('', '_blank', 'width=800,height=600');
      if (!newWindow) {
        alert('Please allow popups to print the invoice');
        return;
      }
      
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice Print - ${state.data?.InvoiceMaster?.InvoiceNo || 'Invoice'}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: 'Arial', sans-serif; 
                font-size: 14px;
                -webkit-print-color-adjust: exact;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-bottom: 20px;
              }
              th, td { 
                border: 1px solid #4a5568; 
                padding: 8px; 
                text-align: center; 
                vertical-align: middle;
              }
              th { 
                background-color: #f7fafc; 
                font-weight: 600;
              }
              .print-hidden { 
                display: none !important; 
              }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
                table { page-break-inside: avoid; }
                .summary-section { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <div>${printContent.innerHTML}</div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 500);
              }
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    } catch (error) {
      console.error('Print error:', error);
      alert('Error printing invoice. Please try again.');
    }
  };

  if (state.status === 'pending' || state.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Loading Invoice...</div>
          <p className="text-gray-500 mt-2">Please wait while we fetch the invoice details.</p>
        </div>
      </div>
    );
  }

  if (state.error || state.data === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Invoice</h2>
          <p className="text-gray-600 mb-4">{state.error || 'Invoice data not found.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if we have the necessary data
  if (!state.data.InvoiceMaster || !state.data.InvoiceDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600">Invalid Invoice Data</div>
          <p className="text-gray-500 mt-2">The invoice data is incomplete or malformed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl  mx-auto px-4 py-6">
      {/* Header with Print Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 no-print">
        <h1 className="text-2xl font-bold text-gray-800">Invoice Details</h1>
        <button 
          onClick={handlePrint} 
          className="px-6 py-2 bg-primary1 text-white rounded-lg  transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Invoice
        </button>
      </div>

      <div id="print-area" className="p-8 bg-white text-black w-full max-w-5xl mx-auto border border-gray-300">
        
        {/* Company Header */}
        <div className=" mb-4 flex justify-evenly items-center pb-2 mt-3">
                <div >
                  <img 
                    src="/images/logo.png" 
                    alt="Asian AB Polymer" 
                    className="w-32 h-16 mb-2"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-xl mb-2">ASIAN AB POLYMER INDUSTRIES LTD.</h1>
                  <p className="text-xs">(A Zone for Best Quality Products)</p>
                  <p className="text-xs mt-2">House # 41 (level-3), Road #7 Block # F, Banani, Dhaka-1213</p>
                  <p className="text-xs">Tel +9714221385 What's app 0553353185</p>
                  <p className="text-xs">E-mail: saurav@asianabpolymer.com.bd</p>
                </div>
                <div className=" ">
                  <div className="border border-black px-4 py-2 inline-block">
                    <p className="font-semibold">Orginal Copy</p>
                  </div>
                </div>
             
              
              
            </div>
   <div className="text-center  py-2 mb-4">
                <h2 className="text-lg font-bold">SALES INVOICE</h2>
              </div>
       

   {/* Customer and Order Details */}
            <div className="flex justify-between mb-6 text-sm">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Party Name</span>
                  <span className="mr-2">:</span>
                  <span>{state.data.InvoiceMaster.PartyName || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Address</span>
                  <span className="mr-2">:</span>
                  <span>{state.data.InvoiceMaster.Address || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Phone</span>
                  <span className="mr-2">:</span>
                  <span>{state.data.InvoiceMaster.ContactNumber || 'N/A'}</span>
                </div>
               
              </div>

              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Invoice No</span>
                  <span className="mr-2">:</span>
                  <span>{state.data.InvoiceMaster.InvoiceNo || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Invoice Date</span>
                  <span className="mr-2">:</span>
                  <span>{convertDateFormat(state.data.InvoiceMaster.InvoiceDate)}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Challan No</span>
                  <span className="mr-2">:</span>
                  <span>{state.data.InvoiceMaster.ChallanNo || 'N/A'}</span>
                </div>
               
                
                {/* {
                  receiptData.data.ChallanMaster.RetailerCode && (
                    <>
                      <div className="flex">
                  <span className="font-semibold w-32">Retailer Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.RetailerName || 'N/A'}</span>
                </div>
                      <div className="flex">
                  <span className="font-semibold w-32">Retailer Code</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.RetailerCode || 'N/A'}</span>
                </div>
                    </>
                  )
                } */}
              </div>
            </div>
        {/* Product Details Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dis. %
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    App.Dis. %
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grand Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.data.InvoiceDetails.map((item, index) => (
                  <tr key={item.InvoiceDetailID || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.ProductName || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {item.Quantity || '0'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatAmountWithCommas(Number(item.UnitPrice) || 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatAmountWithCommas(Number(item.SubTotal) || 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {item.DiscountPercentage || '0'}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatAmountWithCommas(Number(item.NetAmount) || 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {item.AppDisPercent || '0'}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatAmountWithCommas(Number(item.GrandTotal) || 0)}
                    </td>
                  </tr>
                ))}
                  {/* Total Row */}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan="8" className="px-4 py-3 text-right text-sm text-gray-700">
                      Grand Total:
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-green-600">
                      {formatAmountWithCommas(
                      state.data.InvoiceDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0)
                      )}
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Summary */}
        {/* <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200 summary-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Amount in Words:</p>
              <p className="font-semibold text-gray-800 capitalize">
                {(state.data.InvoiceMaster.Net_Amount_Inword || '').toLowerCase()} Only
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Invoice Amount:</p>
              <p className="text-2xl font-bold text-blue-600">
                ৳{formatAmountWithCommas(Number(state.data.InvoiceMaster.Net_Amount) || 0)}
              </p>
            </div>
          </div>
        </div> */}

        
  {/* Footer Signatures */}
            <div className="grid grid-cols-3 gap-8 mt-16 text-center text-sm">
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Prepared By</p>
                <p >{state.data.InvoiceMaster.AuthorizedUserName || 'N/A' }</p>
                  
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Authorized By</p>
                <p >{state.data.InvoiceMaster.AuthorizedUserName || 'N/A' }</p>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Approved By</p>
                <p >{state.data.InvoiceMaster.ApprovedUserName || 'N/A'}</p>
              </div>
            </div>
       
      </div>
    </div>
  );
};

export default Page;