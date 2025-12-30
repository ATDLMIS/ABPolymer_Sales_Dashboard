'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ChallanSalesNote = ({id}) => {
    const receiptData = useGetData(
        `?action=get_ChallanOrderDetails&ChallanID=${id}`
      );
      console.log("Challan Data",receiptData)

      const handlePrint = () => {
        const printContent = document.getElementById('print-area');
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        newWindow.document.write(`
            <html>
              <head>
                <title>Print</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style>
                  body {
                    margin: 0;
                    padding: 20px;
                    font-family: sans-serif;
                  }
                  @media print {
                    .no-print { display: none; }
                  }
                </style>
              </head>
              <body>
                <div>${printContent.innerHTML}</div>
              </body>
            </html>
          `);
        newWindow.document.close();
        newWindow.print();
      };
      
      if (receiptData.status === 'pending') {
        return (
          <div className="text-xl font-semibold text-center py-10">Loading...</div>
        );
      }
    
      if (typeof receiptData.data !== 'object') {
        return (
          <div className="text-xl font-semibold text-center py-10">
            No Data To Display
          </div>
        );
      }

      return (
        <div>
          <div
            id="print-area"
            className="p-8 bg-white text-black w-full max-w-5xl mx-auto border border-gray-300"
          >
            {/* Header Section */}
            <div className=" mb-4 flex justify-between items-center pb-2 mt-3">
                <div >
                  <img 
                    src="/images/logo.png" 
                    alt="Asian AB Polymer" 
                    className="w-auto h-16 mb-2"
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
                    <p className="font-semibold">Duplicate Copy</p>
                  </div>
                </div>
             
              
              
            </div>
                   <div className="text-center  py-2 mb-4">
                <h2 className="text-lg font-bold">DELIVERY CHALLAN</h2>
              </div>
            {/* Customer and Order Details */}
            <div className="flex justify-between mb-6 text-sm">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Party Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.PartyName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Party Code </span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.PartyCode}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Address</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.PermanentAddress}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Contact Person</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ContactNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Transport Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.HireAgentName || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Trip Type</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.Own_Hire || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Challan No</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ChallanNo}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Challan Date</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ChallanDate}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Driver Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.DriverName || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Driver Number</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.Driver_Number || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Vehicle Number</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.Vehicle_Number || 'N/A'}</span>
                </div>
                {
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
                }
              </div>
            </div>

                 <div className="text-start mb-4">
                <h2 className="text-lg font-bold">Order Details</h2>
              </div>
            {/* Product Table */}
            <table className="w-full border-2 border-black text-xs border-collapse mb-4">
              <thead>
                 <tr className="bg-gray-100">
                  <th className="border border-black p-2 w-[5%]">S.L</th>
                   <th className="border border-black p-2 w-[10%]">Sales Order No</th>
                  <th className="border border-black p-2 w-[10%]">Item Code</th>
                  <th className="border border-black p-2 text-center w-[40%]">Item Name & Description</th>
                  <th className="border border-black p-2 w-[5%] text-center">Unit</th>
                  <th className="border border-black p-2 w-[7%] text-center">Qty</th>
                </tr>
              </thead>
              <tbody>
                {receiptData.data.ChallanDetails.length > 0 && receiptData.data.ChallanDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">{index + 1}</td>
                       <td className="border border-black p-2 text-center">{item.SalesOrderNo || 'N/A'}</td>
                    <td className="border border-black p-2 text-center">{item.ProductName?.split('-')?.[0]?.trim() || 'N/A'}</td>
                    <td className="border border-black p-2">{item.ProductName}</td>
                    <td className="border border-black p-2 text-center">{item.Unit || 'PCS'}</td>
                    <td className="border border-black p-2 text-right">{formatAmountWithCommas(Number(item.ChallanQty))}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-bold"></td>
                  <td className="border border-black p-2 text-right font-bold">
                   Total
                  </td>
                  <td className="border border-black p-2 text-right font-bold">
                    {formatAmountWithCommas(
                      receiptData.data.ChallanDetails.reduce((sum, item) => sum + Number(item.ChallanQty), 0)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
               

            {/* Footer Signatures */}
            <div className="grid grid-cols-3 gap-8 mt-16 text-center text-sm">
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Prepared By</p>
                <p >{receiptData.data.ChallanMaster.SalesOrderUserName }</p>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Verified By</p>
                <p >{receiptData.data.ChallanMaster.AuthorizedUserName }</p>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Authorized By</p>
                <p >{receiptData.data.ChallanMaster.ApprovedUserName }</p>
              </div>
            </div>

            
            {
             receiptData.data.PendingSalesOrderDetails.length > 0 && (
                <>
                  <div className="text-start mb-4 mt-8">
                <h2 className="text-lg font-bold">Pending Delivery</h2>
              </div>
            {/* Product Table */}
            <table className="w-full border-2 border-black text-xs border-collapse mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2 w-[5%]">S.L</th>
                  <th className="border border-black p-2 w-[10%]">Sales Order No</th>
                  <th className="border border-black p-2 w-[10%]">Item Code</th>
                  <th className="border border-black p-2 text-center w-[40%]">Item Name & Description</th>
                  <th className="border border-black p-2 w-[5%] text-center">Unit</th>
                  <th className="border border-black p-2 w-[7%] text-center">Qty</th>
                </tr>
              </thead>
              <tbody>
                {receiptData.data.PendingSalesOrderDetails.length > 0 && receiptData.data.PendingSalesOrderDetails.map((item, index) => (
                 
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">{index + 1}</td>
                      <td className="border border-black p-2 text-center">{item.SalesOrderNo || 'N/A'}</td>
                    <td className="border border-black p-2 text-center">{item.ProductName?.split('-')?.[0]?.trim() || 'N/A'}</td>
                    <td className="border border-black p-2">{item.ProductName}</td>
                    <td className="border border-black p-2 text-center">{item.Unit || 'PCS'}</td>
                    <td className="border border-black p-2 text-right">{formatAmountWithCommas(Number(item.Quantity))}</td>
                  </tr>
                
                ))}
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-bold"></td>
                  <td  className="border border-black p-2 text-right font-bold">Total</td>
                  <td className="border border-black p-2 text-right font-bold">
                    {formatAmountWithCommas(
                      receiptData.data.PendingSalesOrderDetails.reduce((sum, item) => sum + Number(item.Quantity), 0)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
                </>
              )
            }
          </div>
          
           <div className="flex justify-end items-center mt-2 mr-3">
        <button 
          onClick={handlePrint} 
          className="bg-primary1 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>
        </div>
      );
}

export default ChallanSalesNote;