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
  console.log("Receipt", receiptData?.data);

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
    return <Loading />;
  }

  if (typeof receiptData.data !== 'object') {
    return (
      <div className="text-xl font-semibold text-center py-10">
        No Data To Display
      </div>
    );
  }

  // Calculate totals
  const totalQuantity = receiptData.data.orderDetails.reduce(
    (sum, item) => sum + Number(item.Quantity), 
    0
  );

  const totalAmount = receiptData.data.orderDetails.reduce(
    (sum, item) => sum + (Number(item.Price) * Number(item.Quantity)), 
    0
  );

  const grandTotal = receiptData?.data?.order?.TotalAmount 
    ? parseFloat(receiptData.data.order.TotalAmount.replace(/,/g, ''))
    : totalAmount;

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
                <span className="font-semibold">Address</span>
                <span className="ml-12">: {receiptData.data.order.Address}</span>
              </p>
              <p>
                <span className="font-semibold">Phone</span>
                <span className="ml-14">: {receiptData.data.order.ContactNumber}</span>
              </p>
              <p>
                <span className="font-semibold">Status</span>
                <span className="ml-15">: {receiptData.data.order.Status}</span>
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Order No</span>
                <span className="ml-8">: {receiptData.data.order.SalesOrderNo}</span>
              </p>
              <p>
                <span className="font-semibold">Date</span>
                <span className="ml-16">: {convertDateFormat(receiptData.data.order.OrderDate)}</span>
              </p>
              <p>
                <span className="font-semibold">User</span>
                <span className="ml-16">: {receiptData.data.order.UserName}</span>
              </p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border border-black text-xs border-collapse">
            <thead>
              <tr className="border border-black bg-gray-100">
                <th className="border border-black p-2 text-center w-[5%]">SL</th>
                <th className="border border-black p-2 text-center w-[15%]">Category</th>
                <th className="border border-black p-2 text-center w-[25%]">Product Name</th>
                <th className="border border-black p-2 text-center w-[15%]">Retailer</th>
                <th className="border border-black p-2 text-center w-[8%]">Qty</th>
                <th className="border border-black p-2 text-center w-[12%]">Unit Price</th>
                <th className="border border-black p-2 text-center w-[12%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.data.orderDetails.map((item, index) => (
                <tr key={item.SalesOrderDetailID}>
                  <td className="border border-black p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.CategoryName}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.ProductName}
                  </td>
                  <td className="border border-black p-2 text-left text-xs">
                    {item.OutletID === 0 ? (
                      <span className="text-gray-400 italic">No Retailer</span>
                    ) : (
                      <div>
                        <div className="font-medium">{item.RetailerName || 'N/A'}</div>
                        {item.RetailerCode && (
                          <div className="text-xs text-gray-600">({item.RetailerCode})</div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.Quantity}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatAmountWithCommas(Number(item.Price))}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatAmountWithCommas(Number(item.Price) * Number(item.Quantity))}
                  </td>
                </tr>
              ))}
              
              {/* Total Row */}
              <tr className="font-semibold bg-gray-50">
                <td className="border border-black p-2 text-right" colSpan="4">
                  Total:
                </td>
                <td className="border border-black p-2 text-center">
                  {totalQuantity}
                </td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2 text-right">
                  {formatAmountWithCommas(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Summary Section */}
          <div className="mt-6 text-sm">
            <div className="flex justify-between items-start">
              <div className="w-2/3">
                <p className="font-semibold mb-1">Amount in Words:</p>
                <p className="text-xs italic">
                  {numberToWords(grandTotal)} Taka Only
                </p>
              </div>
              <div className="text-right w-1/3">
                <div className="space-y-2 border-t-2 pt-2">
                  {receiptData.data.order.DiscountAmount && (
                    <p>
                      <span className="font-semibold">Discount:</span>
                      <span className="ml-4">
                        {receiptData.data.order.DiscountAmount}
                      </span>
                    </p>
                  )}
                  {receiptData.data.order.NetAmount && (
                    <p>
                      <span className="font-semibold">Net Amount:</span>
                      <span className="ml-4">
                        {receiptData.data.order.NetAmount}
                      </span>
                    </p>
                  )}
                  <p className="text-lg font-bold border-t-2 pt-2">
                    <span>Grand Total:</span>
                    <span className="ml-4">
                      {receiptData.data.order.TotalAmount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {(receiptData.data.order.Outstanding || 
            receiptData.data.order.OrderPending || 
            receiptData.data.order.TotalDeliveredAmount || 
            receiptData.data.order.TotalCollection) && (
            <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-semibold text-sm mb-2">Order Status:</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                {receiptData.data.order.Outstanding && (
                  <p>
                    <span className="font-semibold">Outstanding Balance:</span>
                    <span className="ml-2">{receiptData.data.order.Outstanding}</span>
                  </p>
                )}
                {receiptData.data.order.OrderPending && (
                  <p>
                    <span className="font-semibold">Order Pending:</span>
                    <span className="ml-2">{receiptData.data.order.OrderPending}</span>
                  </p>
                )}
                {receiptData.data.order.TotalDeliveredAmount && (
                  <p>
                    <span className="font-semibold">Total Delivered:</span>
                    <span className="ml-2">{receiptData.data.order.TotalDeliveredAmount}</span>
                  </p>
                )}
                {receiptData.data.order.TotalCollection && (
                  <p>
                    <span className="font-semibold">Total Collection:</span>
                    <span className="ml-2">{receiptData.data.order.TotalCollection}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer Signature Section */}
          <div className="grid grid-cols-3 gap-4 mt-16">
            <div className="text-center border-t-2 border-black pt-2">
              <p className="font-semibold text-sm">Prepared By</p>
              <p className="text-xs mt-1">{receiptData.data.order.UserName}</p>
            </div>
            <div className="text-center border-t-2 border-black pt-2">
              <p className="font-semibold text-sm">Authorized By</p>
              <p className="text-xs mt-1">
                {receiptData.data.approvals?.AuthBy || 'Pending'}
              </p>
            </div>
            <div className="text-center border-t-2 border-black pt-2">
              <p className="font-semibold text-sm">Approved By</p>
              <p className="text-xs mt-1">
                {receiptData.data.approvals?.AppBy || 'Pending'}
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-xs text-gray-600">
            <p>Thank you for your business!</p>
            <p className="mt-1">This is a computer-generated document and does not require a signature.</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end items-center mt-2 mr-8">
        <button 
          onClick={handlePrint} 
          className="bg-primary1 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 hover:opacity-90"
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