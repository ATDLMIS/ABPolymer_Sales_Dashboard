'use client'
import {useState, useEffect} from 'react'
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import axios from 'axios'
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  })
  const getDataById = async id => {
    const res = await Axios.get(`?action=get_InvoiceOrderDetails&InvoiceID=${id}`)
    setState({
      status: 'idle',
      data: res.data
    })
  }

  useEffect(()=>{
    if(params.id){
      getDataById(params.id)
    }
  }, [params.id])

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

  if(state.status === 'pending'){
    return <div className="text-xl font-semibold text-center py-6">Loading...</div>
  }

  if(state.data === null){
    return <div className="text-xl font-semibold text-center py-6">No Data To Display.</div>
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
                Invoice
                </h2>
              </div>
    
              {/* Supplier Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <span className="font-semibold">
                    Employee Name: {state.data.InvoiceMaster.EmployeeName}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">
                      Date: {convertDateFormat(state.data.InvoiceMaster.InvoiceDate)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Invoice No: {state.data.InvoiceMaster.InvoiceNo}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Challan No: {state.data.InvoiceMaster.ChallanNo}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                    Sales Order No: {state.data.InvoiceMaster.SalesOrderNo}
                    </span>
                  </p>
                </div>
              </div>
    
              {/* Table */}
              <h1 className="text-xl font-semibold text-center py-3">Product Details</h1>
    <div className="overflow-x-scroll">
        <div className="inline-block max-w-full w-full pt-5">
          <div>
            <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    FinancialYear
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Unit Price
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.data.InvoiceDetails.length &&
                  state.data.InvoiceDetails.map((item, index) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={index}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.FinancialYear}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ProductName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.Quantity}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.UnitPrice}
                      </td>
                     
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.SubTotal))}
                      </td>
                    </tr>
                  ))}
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                    colSpan="3"
                  ></td>
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                  >Total</td>
                  <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                    {state.data.InvoiceDetails.length &&
                      formatAmountWithCommas(state.data.InvoiceDetails.reduce(
                        (accumulator, currentValue) =>
                          accumulator + Number(currentValue.SubTotal),
                        0
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {
      state.data.InvoiceExpenseDetails.length ? <div className="mt-5">
        {state.data.InvoiceExpenseDetails.map((item,index) =>(
          <div className='grid grid-cols-3 gap-3' key={index}>
          <div>{++index}. {item.ParticularsName}</div>
          <div>{item.QtyRate}</div>
          <div> = {item.Amount}</div>
          </div>
        ))}
        <div className='grid grid-cols-3 gap-3'>
          <div></div>
          <div className="text-right">Total</div>
          <div> = {formatAmountWithCommas(state.data.InvoiceExpenseDetails.reduce((prevValue, currentValue)=> prevValue + Number(currentValue.Amount), 0))}</div>
          </div>

      </div> : <div>No Pariculars Cost Data Available</div>
    }

    <div className='py-4'>
    
    <p className="text-right"> Total Invoice Amount: {formatAmountWithCommas(Number(state.data.InvoiceMaster.Net_Amount))}</p>
                      <p className="capitalize">In-Words: {state.data.InvoiceMaster.Net_Amount_Inword} Only</p>
    </div>
    
              {/* Footer */}
              <div className="grid grid-cols-2 gap-4 mt-20">
                <div className="text-center">
                  <p className="font-semibold">Prepared By</p>
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
  )
}

export default page