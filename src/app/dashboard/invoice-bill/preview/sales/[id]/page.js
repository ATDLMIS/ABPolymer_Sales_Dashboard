'use client'
import { useState, useEffect } from 'react';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import axios from 'axios';
import numberToWords from '@/utils/numberToWords';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({ params }) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  });

  const getDataById = async (id) => {
    const res = await Axios.get(`?action=get_InvoiceOrderDetails&InvoiceID=${id}`);
    console.log("IvoiceBill",res.data);
    setState({
      status: 'idle',
      data: res.data
    });
  };

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, [params.id]);

  const handlePrint = () => {
    const printContent = document.getElementById('print-area');
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; }
            table, th, td { border: 1px solid black; border-collapse: collapse; }
            th, td { padding: 8px; text-align: center; }
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

  if (state.status === 'pending') {
    return <div className="text-xl font-semibold text-center py-6">Loading...</div>;
  }

  if (state.data === null) {
    return <div className="text-xl font-semibold text-center py-6">No Data To Display.</div>;
  }

  return (
    <div>
      <button onClick={handlePrint} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Print
      </button>

      <div id="print-area" className="p-8 bg-white text-black w-full max-w-4xl mx-auto border border-gray-300">
        
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
  
  <h2 className="text-lg font-semibold underline mt-4">Invoice</h2>
</div>


        {/* Supplier Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><span className="font-semibold">Party Name: {state.data.InvoiceMaster.PartyName}</span></p>
            <p>Party Address: {state.data.InvoiceMaster.Address}</p>
            <p>Phone No: {state.data.InvoiceMaster.ContactNumber}</p>
          </div>
          <div className="text-right">
            <p><span className="font-semibold">Date: {convertDateFormat(state.data.InvoiceMaster.InvoiceDate)}</span></p>
            <p>Invoice No: {state.data.InvoiceMaster.InvoiceNo}</p>
            <p>Challan No: {state.data.InvoiceMaster.ChallanNo}</p>
          </div>
        </div>

     
       
        <div>
  {/* First Table - Invoice Details */}
  <table className="w-full border border-black text-center text-sm font-light border-collapse">
    <thead>
      <tr className="border border-black">
        <th className="border border-black p-1 text-left w-[45%]">Product Name</th>
        <th className="border border-black p-1 w-[15%]">Quantity</th>
        <th className="border border-black p-1 w-[15%]">Unit Price</th>
        <th className="border border-black p-1 w-[15%]">Disc %</th> 
        <th className="border border-black p-1 text-right w-[30%]">Total</th> 
      </tr>
    </thead>
    <tbody>
      {state.data.InvoiceDetails.map((item, index) => (
        <tr key={index} className="border border-black">
          <td className="border border-black p-1 text-left">{item.ProductNameRepo}</td>
          <td className="border border-black p-1">{item.Quantity}</td>
          <td className="border border-black p-1">{item.UnitPrice}</td>
          <td className="border border-black p-1">{item.Discount || 0.00} %</td> 
          <td className="border border-black p-1 text-right">{formatAmountWithCommas(Number(item.SubTotal))}</td> 
        </tr>
      ))}
    </tbody>
  </table>

  {/* Second Table - Invoice Expense Details */}
  {state.data.InvoiceExpenseDetails.length > 0 && (
    <table className="w-full border border-black text-center text-sm font-light border-collapse">
      <tbody>
        {state.data.InvoiceExpenseDetails.map((item, index) => (
          <tr key={index} className="border border-black">
            <td className="border border-black p-1 text-right w-[45%]">{item.ParticularsName}</td>
            <td className="border border-black p-1 w-[15%]">{item.QtyRate}</td>
            <td className="border border-black p-1 w-[15%]">{item.UnitPrice}</td>
            <td className="border border-black p-1 w-[15%]"> &nbsp; &nbsp; &nbsp;</td> 
            <td className="border border-black p-1 text-right w-[30%]">{formatAmountWithCommas(Number(item.Amount))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      

        {/* Invoice Summary */}
        <div className="py-4">
          <p className="text-right font-semibold">
            Total Invoice Amount: {formatAmountWithCommas(Number(state.data.InvoiceMaster.Net_Amount))}
          </p>
          <p className="capitalize">In-Words: {state.data.InvoiceMaster.Net_Amount_Inword} Only</p>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-3 gap-4 mt-20">
          <div className="text-center">
            <p className="font-semibold">Prepared By</p>
            <p>{state.data.InvoiceMaster.PreparedUserName}</p>
            <p>{state.data.InvoiceMaster.PreparedDesignation}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Authorized By</p>
            <p>{state.data.InvoiceMaster.AuthorizedUserName}</p>
            <p>{state.data.InvoiceMaster.AuthorizedDesignation}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Approved By</p>
            <p>{state.data.InvoiceMaster.ApprovedUserName}</p>
            <p>{state.data.InvoiceMaster.ApprovedDesignation}</p>
          </div>
        </div>
        <div className="grid grid-cols-1  mt-5">
            
            <p >বিলের তথ্য সম্পর্কে জানার প্রয়োজন হলে: 01729-074052, 01717-261065.</p>
            <p >Note: this is a computer generated invoice. No signature required</p>
          </div>

      </div>
    </div>
  );
};

export default Page;
