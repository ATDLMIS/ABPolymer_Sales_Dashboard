'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ChallanSpecimanNote = ({id}) => {
    const receiptData = useGetData(
        `?action=get_ChallanOrderDetails&ChallanID=${id}`
      );
      console.log(receiptData)

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
    
      if (typeof receiptData.data !== Object) {
        <div className="text-xl font-semibold text-center py-10">
          No Data To Display
        </div>;
      }
      return (
        <div>
          <button
            onClick={handlePrint}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Print
          </button>
          <div
            id="print-area"
            className="p-8 bg-white text-black w-full max-w-4xl mx-auto border border-gray-300"
          >
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Asian AB Polymer</h1>
            <p className='mt-3'>House #3 (Level-3), Road #7,</p>
              <p> Block #F, Banani, Dhaka-1213,</p>
  <p>
               <strong>Phone:</strong> <strong>+8801847055239</strong>
  </p>
                <h2 className="text-xl font-semibold underline mt-4">
                  Delivery Challan
                </h2>
              </div>
    
              {/* Supplier Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <span className="font-semibold">
                    Employee Name: {receiptData.data.ChallanMaster.EmployeeName}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Address: {receiptData.data.ChallanMaster.Address}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      Phone No: {receiptData.data.ChallanMaster.ContactNumber}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">
                      Date: {convertDateFormat(receiptData.data.ChallanMaster.ChallanDate)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Challan No: {receiptData.data.ChallanMaster.ChallanNo}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Sales Order No: {receiptData.data.ChallanMaster.SalesOrderNo}
                    </span>
                  </p>
                </div>
              </div>
    
              {/* Table */}
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">
                      Product Name
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                    Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.data.ChallanDetails.length && receiptData.data.ChallanDetails.map(item => (
                    <>
                      <tr>
                        <td className="border border-gray-300 p-2 font-semibold">
                          {item.CategoryName}
                        </td>
                        
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          {item.ProductName}
                        </td>
                        
                        <td className="border border-gray-300 p-2 text-right">
                          {formatAmountWithCommas(Number(item.ChallanQty))}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
    
              {/* Footer */}
              <div className="grid grid-cols-3 gap-4 mt-20">
                <div className="text-center">
                  <p className="font-semibold">Prepared By</p>
                  <p>{receiptData.data.ChallanMaster.EmployeeName}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Authorized By</p>
                  <p></p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Approved By</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ChallanSpecimanNote