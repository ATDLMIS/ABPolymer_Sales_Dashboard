'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import numberToWords from '@/utils/numberToWords';
import Loading from '@/components/Loading';
import BackButton from '@/components/BackButton/BackButton';
import { useRouter } from 'next/navigation';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesReceivedNote = ({ id }) => {
  const receiptData = useGetData(
    `?action=get_order&SalesOrderID=${id}`
  );
const router=useRouter();
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

            .dist-point-section {
              background-color: #f0f9ff !important;
              border: 1px solid #7dd3fc !important;
              border-radius: 4px;
              margin-top: 12px;
            }
          </style>
        </head>

        <body>
          <div class="print-container">
            ${printContent.innerHTML}
          </div>

          <script>
            // Wait for all resources (images, styles) to load
            window.onload = function () {
              // Add a small delay to ensure everything is rendered
              setTimeout(function() {
                window.print();
                
                // Don't auto-close - let user close manually after printing
                // Or close after print dialog is dismissed
                window.onafterprint = function() {
                  window.close();
                };
              }, 250);
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

  const { order, orderDetails, approvals } = receiptData.data;
  
  // Calculate totals from order details
  const subtotal = orderDetails.reduce(
    (sum, item) => sum + (parseFloat(item.Price) * parseInt(item.Quantity)),
    0
  );

  const discountPercentage = parseInt(order.DiscountPercentage) || 0;
  const discountAmount = parseInt(order.DiscountAmount) || 0;
  const netAmount =  parseFloat(order.NetAmount.replace(/,/g, ''))
  const approvedDiscountPercentage = parseInt(order.AppDisPercent) || 0;
  const grandTotal =  parseFloat(order.GrandTotal.replace(/,/g, ''))
  console.log(grandTotal,netAmount)
  // Calculate approved discount amount
 const approvedDiscountAmount = approvedDiscountPercentage > 0 ? 
 netAmount * (approvedDiscountPercentage / 100) : 0;

  // Format retailer name with code
  const retailerDisplay = order.RetailerName && order.RetailerCode 
    ? `${order.RetailerName} (${order.RetailerCode})`
    : order.RetailerName || null;

  return (
    <div>
       <div className="no-print flex justify-between items-center">
                  <BackButton router={router} />
                   <div className="flex justify-end items-center mb-5">
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
      <div
        id="print-area"
        className="p-8 bg-white text-black w-full max-w-6xl mx-auto border border-gray-300"
      >
        <div>
            {/* Header Section */}
            <div className=" mb-4 flex justify-between items-center pb-2 mt-3">
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
                  <div className="border border-black px-4 py-2 inline-block rounded-md">
                     <p className="font-semibold">Orginal Copy</p>
                  </div>
                </div>
             
              
              
            </div>
               <div className="text-center  py-2 mb-4">
                <h2 className="text-lg font-bold">SALES ORDER</h2>
              </div>
          {/* Customer and Order Info - Two Column Layout */}
          <div className="flex justify-between items-center mb-6 text-sm">
            {/* Left Column - Order Details */}
            <div className="space-y-1">
               <p>
                  <span className="font-semibold">Dealer Name:</span>
                  <span className="ml-2">
                    {order.PartyName}
                    {order.PartyCode && <span className="text-blue-600"> ({order.PartyCode})</span>}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Address:</span>
                  <span className="ml-2">{order.Address}</span>
                </p>
                <p>
                  <span className="font-semibold">Contact Number:</span>
                  <span className="ml-2">{order.ContactNumber}</span>
                </p>
            </div>

            {/* Right Column - Dealer Details & Distribution Points */}
            <div className="space-y-1">
              {/* Dealer Info */}
              <div className="mb-4">
               <p>
                <span className="font-semibold">Order No:</span>
                <span className="ml-2">{order.SalesOrderNo}</span>
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>
                <span className="ml-2">{convertDateFormat(order.OrderDate)}</span>
              </p>
                 {/* Distribution Points - Only show if available */}
              {retailerDisplay && (
                  <>
                    <p>
                      <span className="font-semibold">Retailer Name: </span>
                      <span>{retailerDisplay}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Address: </span>
                      <span>{order.RetailerAddress || order.Address}</span>
                    </p>
                  </>
              )}
              </div>
            </div>
          </div>

          {/* Table - 6 COLUMNS */}
          <table className="w-full border border-black text-xs border-collapse">
            <thead>
              <tr className="border border-black bg-gray-100">
                <th className="border border-black p-2 text-center w-[5%]">SL</th>
                <th className="border border-black p-2 text-center w-[50%]">Product Description</th>
                <th className="border border-black p-2 text-center w-[8%]">Unit</th>
                <th className="border border-black p-2 text-center w-[8%]">Qty</th>
                <th className="border border-black p-2 text-center w-[14%]">Unit Price</th>
                <th className="border border-black p-2 text-center w-[15%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={item.SalesOrderDetailID}>
                  <td className="border border-black p-2 text-center">
                    {index + 1}.
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.ProductName || item.ProductNameRepo}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.Unit || 'PCS'}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.Quantity}
                  </td>
                  <td className="border border-black p-2 text-right">
                    ৳{formatAmountWithCommas(parseFloat(item.Price))}
                  </td>
                  <td className="border border-black p-2 text-right">
                    ৳{formatAmountWithCommas(parseFloat(item.Price) * parseInt(item.Quantity))}
                  </td>
                </tr>
              ))}
              
              {/* Total Rows - Complete Discount Breakdown */}
              <tr className="font-semibold bg-gray-100">
                <td className="border border-black p-2 text-right" colSpan="5">
                  Total Amount:
                </td>
                <td className="border border-black p-2 text-right">
                  ৳{formatAmountWithCommas(subtotal)}
                </td>
              </tr>

              {discountPercentage > 0 && (
                <tr className="font-semibold bg-gray-100">
                  <td className="border border-black p-2 text-right" colSpan="5">
                    Discount ({discountPercentage}%):
                  </td>
                  <td className="border border-black p-2 text-right text-red-600">
                    -৳{formatAmountWithCommas(discountAmount)}
                  </td>
                </tr>
              )}

              <tr className="font-semibold bg-blue-50">
                <td className="border border-black p-2 text-right" colSpan="5">
                  Net Amount:
                </td>
                <td className="border border-black p-2 text-right text-blue-700">
                  ৳{order?.NetAmount}
                </td>
              </tr>

              {approvedDiscountPercentage > 0 && (
                <tr className="font-semibold bg-purple-50">
                  <td className="border border-black p-2 text-right" colSpan="5">
                    Approved Discount ({approvedDiscountPercentage}%):
                  </td>
                  <td className="border border-black p-2 text-right text-purple-600">
                    -৳{formatAmountWithCommas(approvedDiscountAmount)}
                  </td>
                </tr>
              )}

              <tr className="font-semibold bg-gray-200">
                <td className="border border-black p-2 text-right font-bold" colSpan="5">
                  Grand Total:
                </td>
                <td className="border border-black p-2 text-right font-bold text-green-700">
                  ৳{order?.GrandTotal}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words */}
          {/* <div className="mt-6 text-sm">
            <p className="font-semibold">
              In Word: {numberToWords(grandTotal)} Only
            </p>
          </div> */}

          {/* Terms & Conditions */}
          <div className="mt-8 text-xs">
            <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Prices are subject to change without prior notice.</li>
              <li>Goods once sold will not be taken back.</li>
              <li>Payment should be made within the credit period.</li>
              <li>All disputes are subject to Dhaka jurisdiction.</li>
            </ol>
          </div>

          {/* Footer Signature Section */}
          <div className="grid grid-cols-3 gap-4 mt-20 pt-8 border-t">
            <div className="text-center">
              <div className="mb-2 border-t border-black pt-2">
                {/* Line for signature */}
              </div>
              <p className="font-semibold">Prepared By</p>
              <p>{order.UserName}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 border-t border-black pt-2">
                {/* Line for signature */}
              </div>
              <p className="font-semibold">Authorized By</p>
              <p>{approvals?.AuthBy || ''}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 border-t border-black pt-2">
                {/* Line for signature */}
              </div>
              <p className="font-semibold">Approved By</p>
              <p>{approvals?.AppBy || ''}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SalesReceivedNote;