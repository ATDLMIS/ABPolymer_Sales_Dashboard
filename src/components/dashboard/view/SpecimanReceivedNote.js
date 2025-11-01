'use client'
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SpecimanReceivedNote = ({id}) => {
    const receiptData = useGetData(
        `?action=get_order&SalesOrderID=${id}`
      );
    
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
                <h1 className="text-2xl font-bold">Kazal Brothers Ltd.</h1>
                <p>Dr. Nawab Ali Tower, 6th floor,</p>
                <p>24 Puran Paltan, Dhaka-1000.</p>
                <p>Phone : 088-02-9515301, 088-02-9515302.</p>
                <h2 className="text-xl font-semibold underline mt-4">
                  Specimen Order
                </h2>
              </div>
    
              {/* Supplier Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <span className="font-semibold">
                      Specimen User Name: {receiptData.data.order.SpecimenUserName}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Specimen User Address: {receiptData.data.order.SpecimenUserAddress}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      Phone No: {receiptData.data.order.SpecimenUserPhone}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">
                      Date: {convertDateFormat(receiptData.data.order.OrderDate)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      Sales Order No: {receiptData.data.order.SalesOrderNo}
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
                    <th className="border border-gray-300 p-2">Qty.</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.data.orderDetails.map(item => (
                    <>
                      <tr>
                        <td className="border border-gray-300 p-2 font-semibold">
                          {item.CategoryName}
                        </td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          {item.ProductName}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          {item.Quantity}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          {item.Price}
                        </td>
                        <td className="border border-gray-300 p-2 text-right">
                          {formatAmountWithCommas(Number(item.Amount))}
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr className="bg-gray-200">
                    <td className="border border-gray-300 p-2 text-right" colSpan="3">
                      Total:
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                    {formatAmountWithCommas(Number(receiptData.data.order.TotalAmount))}
                    </td>
                  </tr>
                </tbody>
              </table>
    
              {/* Footer */}
              <div className="grid grid-cols-3 gap-4 mt-20">
                <div className="text-center">
                  <p className="font-semibold">Prepared By</p>
                  <p>{receiptData.data.order.UserName}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Authorized By</p>
                  <p>{receiptData.data.approvals.AuthBy}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Approved By</p>
                  <p>{receiptData.data.approvals.AppBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SpecimanReceivedNote