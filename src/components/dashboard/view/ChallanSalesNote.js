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
          <button
            onClick={handlePrint}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 no-print"
          >
            Print
          </button>
          <div
            id="print-area"
            className="p-8 bg-white text-black w-full max-w-5xl mx-auto border border-gray-300"
          >
            {/* Header Section */}
            <div className="border-2 border-black mb-4">
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <img 
                    src="/images/logo.png" 
                    alt="Asian AB Polymer" 
                    className="w-24 h-24" 
                  />
                </div>
                <div className="flex-1 text-center">
                  <h1 className="text-xl font-bold">ASIAN AB POLYMER INDUSTRIES LTD.</h1>
                  <p className="text-xs">(A Zone for Best Quality Products)</p>
                  <p className="text-xs mt-2">House # 41 (level-3), Road #7 Block # F, Banani, Dhaka-1213</p>
                  <p className="text-xs">Tel +9714221385 What's app 0553353185</p>
                  <p className="text-xs">E-mail: saurav@asianabpolymer.com.bd</p>
                </div>
                <div className="flex-1 text-right">
                  <div className="border border-black px-4 py-2 inline-block">
                    <p className="font-semibold">Duplicate Copy</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center bg-gray-100 py-2 border-t-2 border-black">
                <h2 className="text-lg font-bold">DELIVERY CHALLAN</h2>
              </div>
            </div>

            {/* Customer and Order Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Customer Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.PartyName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Address</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.Address}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Contact Person</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ContactNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Contract</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ContractNo || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Hire Agent Name</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.HireAgent || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Own/Hire</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.OwnHire || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Site Delivery</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.SiteDelivery || receiptData.data.ChallanMaster.Address}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold w-32">Order No</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.SalesOrderNo}</span>
                </div>
                {/* <div className="flex">
                  <span className="font-semibold w-32">Order Date</span>
                  <span className="mr-2">:</span>
                  <span>{convertDateFormat(receiptData.data.ChallanMaster.OrderDate)}</span>
                </div> */}
                <div className="flex">
                  <span className="font-semibold w-32">Delivery No</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.ChallanNo}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Delivery Date</span>
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
                  <span>{receiptData.data.ChallanMaster.DriverNumber || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">Vehicle Number</span>
                  <span className="mr-2">:</span>
                  <span>{receiptData.data.ChallanMaster.VehicleNumber || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Product Table */}
            <table className="w-full border-2 border-black text-xs border-collapse mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2 w-12">S.I.</th>
                  <th className="border border-black p-2 w-24">Item Code</th>
                  <th className="border border-black p-2 text-left">Item Name & Description</th>
                  <th className="border border-black p-2 w-16">Unit</th>
                  <th className="border border-black p-2 w-20">Qty</th>
                </tr>
              </thead>
              <tbody>
                {receiptData.data.ChallanDetails.length > 0 && receiptData.data.ChallanDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">{index + 1}</td>
                    <td className="border border-black p-2 text-center">{item.ProductCode || 'N/A'}</td>
                    <td className="border border-black p-2">{item.ProductNameRepo}</td>
                    <td className="border border-black p-2 text-center">{item.Unit || 'PCS'}</td>
                    <td className="border border-black p-2 text-right">{formatAmountWithCommas(Number(item.ChallanQty))}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-bold">Total</td>
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
                <p className="mt-8">{receiptData.data.ChallanMaster.SalesOrderUserName || '_________________'}</p>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Verified By</p>
                <p className="mt-8">{receiptData.data.ChallanMaster.AuthorizedUserName || '_________________'}</p>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="font-semibold">Authorised Signatory</p>
                <p className="mt-8">{receiptData.data.ChallanMaster.ApprovedUserName || '_________________'}</p>
              </div>
            </div>

            {/* Print Source Info */}
            <div className="text-xs text-center mt-8 text-gray-500">
              <p>Print Source: {receiptData.data.ChallanMaster.PrintSource || 'System Generated'}</p>
            </div>
          </div>
        </div>
      );
}

export default ChallanSalesNote;