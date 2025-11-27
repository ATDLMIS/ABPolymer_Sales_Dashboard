'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import numberToWords from '@/utils/numberToWords';
import Loading from '@/components/Loading';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesReceivedNote = ({ id }) => {
  const receiptData = useGetData(
    `?action=get_order&SalesOrderID=${id}`
  );
  console.log("Receipt", receiptData?.data?.order?.TotalAmount);

 const handlePrint = () => {
  const printContent = document.getElementById("print-area");

  const newWindow = window.open("", "_blank", "width=800,height=600");

  newWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

        <style>
          @page {
            size: A4;
            margin: 20mm;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }

          /* Ensures content fits inside A4 */
          .print-container {
            width: 100%;
            box-sizing: border-box;
          }

          /* Page break support */
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>

      <body>
        <div class="print-container">
          ${printContent.innerHTML}
        </div>

        <script>
          window.onload = function () {
            window.print();
            window.close();
          };
        </script>
      </body>
    </html>
  `);

  newWindow.document.close();
};


  if (receiptData.status === 'pending') {
    return (
   <Loading />
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
        className="p-8 bg-white text-black w-full max-w-6xl mx-auto border border-gray-300"
      >
        <div>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="/images/logo.png" 
                alt="Asian AB Polymer" 
                className="w-[120px] h-16 mr-10" 
              />
              <div className="text-center">
                <h1 className="text-xl font-bold">Asian AB Polymer Industries Ltd.</h1>
                <p className="text-sm">House # 41 (level-3), Road #7 Block # F, Banani, Dhaka-1213</p>
              </div>
            </div>
            <h2 className="text-lg font-bold mt-4 text-center">Sales Order</h2>
          </div>

          {/* Customer and Order Info */}
          <div className="flex justify-between gap-8 mb-6 text-sm">
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Name</span>
                <span className="ml-16">: {receiptData.data.order.PartyName}</span>
              </p>
              <p>
                <span className="font-semibold">Customer Code</span>
                <span className="ml-4">: {receiptData.data.order.CustomerCode || 'N/A'}</span>
              </p>
              <p>
                <span className="font-semibold">Address</span>
                <span className="ml-12">: {receiptData.data.order.Address}</span>
              </p>
              <p>
                <span className="font-semibold">Phone</span>
                <span className="ml-14">: {receiptData.data.order.ContactNumber}</span>
              </p>
              <p>
                <span className="font-semibold">Email</span>
                <span className="ml-16">: {receiptData.data.order.Email || ''}</span>
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Order No</span>
                <span className="ml-12">: {receiptData.data.order.SalesOrderNo}</span>
              </p>
              <p>
                <span className="font-semibold">Date</span>
                <span className="ml-20">: {convertDateFormat(receiptData.data.order.OrderDate)}</span>
              </p>
              <p>
                <span className="font-semibold">Ref No</span>
                <span className="ml-16">: {receiptData.data.order.RefNo || 'N/A'}</span>
              </p>
              <p>
                <span className="font-semibold">Sale Center</span>
                <span className="ml-10">: {receiptData.data.order.SaleCenter || 'N/A'}</span>
              </p>
              <p>
                <span className="font-semibold">Delivery Address</span>
                <span className="ml-2">: {receiptData.data.order.DeliveryAddress || 'N/A'}</span>
              </p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border border-black text-xs border-collapse">
            <thead>
              <tr className="border border-black bg-gray-100">
                <th className="border border-black p-2 text-center w-[5%]">SL</th>
                <th className="border border-black p-2 text-center w-[10%]">Item Code</th>
                <th className="border border-black p-2 text-center w-[25%]">Description</th>
                <th className="border border-black p-2 text-center w-[8%]">Unit</th>
                <th className="border border-black p-2 text-center w-[8%]">Qty</th>
                <th className="border border-black p-2 text-center w-[10%]">Unit Price</th>
                <th className="border border-black p-2 text-center w-[10%]">Amount</th>
                <th className="border border-black p-2 text-center w-[8%]">Dis. %</th>
                <th className="border border-black p-2 text-center w-[10%]">Dis. Amount</th>
                <th className="border border-black p-2 text-center w-[10%]">Total Amount</th>
                <th className="border border-black p-2 text-center w-[8%]">Stk Qty</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.data.orderDetails.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center">
                    {index + 1}.
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.ProductCode || 'N/A'}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.ProductNameRepo}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.Unit || 'PCS'}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.Quantity}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatAmountWithCommas(Number(item.Price))}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatAmountWithCommas(Number(item.Amount))}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.DiscountPercent || '0'}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatAmountWithCommas(Number(item.DiscountAmount || 0))}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {Number(item.TotalAmount || item.Amount)}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.StockQty || '0'}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="border border-black p-2 text-right" colSpan="4">
                  Total:
                </td>
                <td className="border border-black p-2 text-center">
                  {receiptData.data.orderDetails.reduce((sum, item) => sum + Number(item.Quantity), 0)}
                </td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2 text-right">
                  {receiptData?.data?.order?.TotalAmount}
                </td>
                <td className="border border-black p-2 text-center">
                  {receiptData.data.order.TotalDiscountPercent || ''}
                </td>
                <td className="border border-black p-2 text-right">
                  {receiptData.data.order.TotalDiscountAmount || 0}
                </td>
                <td className="border border-black p-2 text-right">
                  {receiptData?.data?.order?.GrandTotal || receiptData?.data?.order?.TotalAmount}
                </td>
                <td className="border border-black p-2 text-center">
                  {receiptData.data.orderDetails.reduce((sum, item) => sum + Number(item.StockQty || 0), 0)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Additional Discount and Grand Total */}
          <div className="mt-4 text-sm">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                In Word:N/A
              </p>
              <div className="text-right">
                <p className="font-semibold">
                  Grand Total: <span className="ml-4">{receiptData?.data?.order?.GrandTotal || receiptData?.data?.order?.TotalAmount}</span>
                </p>
              </div>
            </div>
          </div>

    

          {/* Footer Signature Section */}
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
    <div className="flex justify-end items-center mt-2 mr-8">
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
};

export default SalesReceivedNote;