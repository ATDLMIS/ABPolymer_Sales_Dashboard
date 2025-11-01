'use client';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const GoodsReceivedNote = ({ id }) => {
  const receiptData = useGetData(
    `?action=get_ppreceiptall&ProductReceiptID=${id}`
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
         <div className="text-center mb-4 text-sm"> {/* Decreased text font size */}
   <img 
    src="/images/logo.png" 
    alt="Asian AB Polymer" 
    className="w-30 h-30 mx-auto" 
  /> {/* Increased image size */}
  
  <p className='mt-3'>House #3 (Level-3), Road #7,</p>
  <p> Block #F, Banani, Dhaka-1213,</p>
  <p>
    <strong>Phone:</strong> <strong>+8801847055239</strong>
  </p>
  
  <h2 className="text-lg font-semibold underline mt-4"> Goods Received Note</h2>
</div>
          

          {/* Supplier Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <span className="font-semibold">
                  Supplier Name: {receiptData.data.receipt.BindingPartyName}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  Supplier Challan No.: {receiptData.data.receipt.ChallanNumber}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  Supplier Address: {receiptData.data.receipt.Address}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  Phone No.: {receiptData.data.receipt.ContactNumber}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-semibold">
                  Date: {receiptData.data.receipt.ReceiptDate}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  GRN No.: {receiptData.data.receipt.ProductReceiptNo}
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
                  Quantity (Pcs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {receiptData.data.details.map(item => (
                <>
                  {/* <tr>
                    <td className="border border-gray-300 p-2 font-semibold">
                      {item.ProductCategoryName}
                    </td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr> */}
                  <tr>
                    <td className="border border-gray-300 p-2">
                      {item.ProductName}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {item.Quantity}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="grid grid-cols-2 gap-4 mt-20">
            <div className="text-center">
              <p className="font-semibold">Prepared By</p>
              <p>{receiptData.data.receipt.CreatedBy}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Verified By</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsReceivedNote;
