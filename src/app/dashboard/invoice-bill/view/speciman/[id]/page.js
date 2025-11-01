"use client"
import {useState, useEffect} from 'react'
import axios from 'axios'
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
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

  if(state.status === 'pending'){
    return <div className="text-xl font-semibold text-center py-6">Loading...</div>
  }

  if(state.data === null){
    return <div className="text-xl font-semibold text-center py-6">No Data To Display.</div>
  }
  return (
    <>
    <div className="flex justify-end">
          <Link
            href={`/dashboard/invoice-bill/preview/speciman/${params.id}`}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Preview
          </Link>
        </div>
      <div className="flex justify-center">
      <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
        <h1 className="text-center text-xl font-semibold mb-3">
        Invoice Details
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Date:</h1>
          <h1>{convertDateFormat(state.data.InvoiceMaster.InvoiceDate)}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Invoice No:</h1>
          <h1>{state.data.InvoiceMaster.InvoiceNo}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Challan No:</h1>
          <h1>{state.data.InvoiceMaster.ChallanNo}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Sales Order No:</h1>
          <h1>{state.data.InvoiceMaster.SalesOrderNo}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Employee Name:</h1>
          <h1>{state.data.InvoiceMaster.EmployeeName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Status:</h1>
          <h1>{state.data.InvoiceMaster.StatusName}</h1>
        </div>
      </div>
    </div>
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
                    colSpan="4"
                  ></td>

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

      <h1 className="text-xl font-semibold text-center py-3">Others Expense</h1>
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
                    Particulars
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    QTY
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Price
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
                {state.data.InvoiceExpenseDetails.length &&
                  state.data.InvoiceExpenseDetails.map((item, index) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={index}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ParticularsName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.Quantity}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.UnitPrice}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.Amount))}
                      </td>
                    </tr>
                  ))}
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                    colSpan="3"
                  ></td>

                  <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                    {state.data.InvoiceExpenseDetails.length &&
                      formatAmountWithCommas(state.data.InvoiceExpenseDetails.reduce(
                        (accumulator, currentValue) =>
                          accumulator + Number(currentValue.Amount),
                        0
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default page