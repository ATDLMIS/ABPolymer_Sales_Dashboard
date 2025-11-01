"use client"
import {useState, useEffect} from 'react'
import getCurrentDate from '@/utils/getCurrentDate';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import useGetData from '@/utils/useGetData';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const [formData, setFormData] = useState({
    InvoiceNo: '',
    InvoiceDate: getCurrentDate(),
    SalesOrderNo: '',
    ChallanID: '',
    ChallanNo: '',
    TotalAmount: '',
    UserID: '',
    Details: [],
    DetailsCost: [
    {
      id: uuidv4(),
      ParticularsID: '',
      Quantity: '',
      UnitPrice: ''
    }
    ]
  })

  const {data: session} = useSession()

  console.log(formData)

  const [partyName, setPartyName] = useState('')

  const costType = useGetData('?action=get_allparticulars')



  const createInvoiceId = async ()=>{
    const res = await Axios.post('?action=generate_new_invoice_number')
    setFormData( prevData => ({
      ...prevData,
      InvoiceNo: res.data.newInvoiceNo,
    }))
  }

  const getPreviousData = async id =>{
    const res = await Axios.get(`?action=get_ChallanToInvoice&ChallanID=${id}`)
    setFormData( prevData => ({
      ...prevData,
      SalesOrderNo: res.data.ChallanMaster.SalesOrderNo,
      ChallanID: res.data.ChallanMaster.ChallanID,
      ChallanNo: res.data.ChallanMaster.ChallanNo,
      Details: res.data.ChallanDetails.map(item => ({
        id: uuidv4(),
        FinancialYearID: item.FinancialYearID,
        FinancialYear: item.FinancialYear,
        ProductCategoryID: item.ProductCategoryID,
        ProductID: item.ProductID,
        ProductName: item.ProductName,
        Quantity: item.ChallanQty,
        UnitPrice: item.PRate,
        discount: 0,
        Total: item.Total
      }))
    }))
    setPartyName(res.data.ChallanMaster.PartyName)
  }

  useEffect(()=>{
if(session){
  setFormData(prevData =>({
    ...prevData,
    UserID: session.user.id
  }))
}
  }, [session])

  useEffect(()=>{
    createInvoiceId()
  }, [])

  useEffect(()=>{
    if(params.id){
      getPreviousData(params.id)
    }
  }, [params.id])

  const router = useRouter()

const handleSubmit = async e =>{
  e.preventDefault()
  const dataWillSubmit = {
    InvoiceNo: formData.InvoiceNo,
    InvoiceDate: formData.InvoiceDate,
    ChallanID: formData.ChallanID,
    UserID: formData.UserID,
    TotalAmount: formData.Details.reduce((accumulator, item) => accumulator + Number(item.Total), 0),
    Inword: 0,
    Details: formData.Details.map(item => ({
      FinancialYearID: item.FinancialYearID,
      ProductCategoryID: item.ProductCategoryID,
      ProductID: item.ProductID,
      Quantity: item.Quantity,
      UnitPrice: item.UnitPrice,
      Discount: item.discount
    })),
    DetailsCost: formData.DetailsCost.map(item =>({
      ParticularsID: item.ParticularsID,
      Quantity: item.Quantity,
      UnitPrice: item.UnitPrice
    }))
  }

 const res = await Axios.post('?action=Create_InvoiceAll', dataWillSubmit)
 router.push('/dashboard/invoice-bill')
}

    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl capitalize mb-3">Add Invoice</h1>
          <form>
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
            />
          </form>
        </div>
        <div className="w-full bg-gray-200 rounded-md px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="designation"
                className="capitalize flex font-semibold text-md py-1"
              >
                Invoice No:
              </label>
              <input
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                value={formData.InvoiceNo}
                readOnly
              />
              <div>
                <label className="capitalize flex font-semibold text-md py-1">
                  Invoice Date:
                </label>
  
                <input
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                value={formData.InvoiceDate}
                readOnly
              />
              </div>
              <label className="capitalize flex font-semibold text-md py-1">Sales Order No:</label>
              <input
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                value={formData.SalesOrderNo}
                readOnly
              />
              <label className="capitalize flex font-semibold text-md py-1">Challan No:</label>
              <input
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                value={formData.ChallanNo}
                readOnly
              />
              
              <label className="capitalize flex font-semibold text-md py-1">Party Name:</label>
              <input
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                value={partyName}
                readOnly
              />
            </div>
            {/* table Start */}
            <div className="flex flex-col">
              <h1 className="text-2xl capitalize my-2">Product Details</h1>
              <div className="overflow-x-auto">
                <div className="inline-block max-w-full w-full pt-5">
                  <div className="overflow-hidden">
                    <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr className="bg-text1 text-white">
                          <th
                            scope="col"
                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                          >
                            Financial Year
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
                            Qty
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
                            Discount
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {formData.Details.length > 0 && formData.Details.map(item =>(
                        <tr className="border-b border-neutral-200 dark:border-white/10" key={item.id}>
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
                          <input
                            type="number"
                            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                            onChange={e=>{
                              setFormData(prevData =>({
                                ...prevData,
                                Details: prevData.Details.map(detail => detail.id == item.id ? {...detail, discount: e.target.value} : detail)
                              }));
                            }}
                            value={item.discount}
                          />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                            {formatAmountWithCommas(Number(item.Total))}
                          </td>
                        </tr>
                      ))}
                        
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td
                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                            colSpan="4"
                          ></td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            Total
                          </td>
  
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                            {formatAmountWithCommas(formData.Details.length > 0 && formData.Details.reduce((accumulator, currentValue) => accumulator + Number(currentValue.Total), 0) || 0.00)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
  
            {/* table Start */}
            <div className="flex flex-col">
              <h1 className="text-2xl capitalize mb-3">Others Expense</h1>
              <div className="overflow-x-auto">
                <div className="inline-block max-w-full w-full pt-5">
                  <div className="overflow-hidden">
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
  
                          <th scope="col" className="px-6 py-4">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.DetailsCost.length > 0 && formData.DetailsCost.map(item =>(
                          <tr className="border-b border-neutral-200 dark:border-white/10" key={item.id}>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          <select
                            className="w-full rounded-md"
                            onChange={e => {
                              setFormData(prevData =>({
                                ...prevData,
                                DetailsCost: prevData.DetailsCost.map(detail => detail.id == item.id ? {...detail, ParticularsID: e.target.value} : detail)
                              }));
                            }}
                            value={item.ParticularsID}
                            required
                          >
                            <option value=""></option>
                            {costType.data.length > 0 &&
                              costType.data.map(item => (
                                <option value={item.ParticularsID} key={item.ParticularsID}>
                                  {item.ParticularsName}
                                </option>
                              ))}
                          </select>
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          <input
                            type="number"
                            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                            onChange={e=>{
                              setFormData(prevData =>({
                                ...prevData,
                                DetailsCost: prevData.DetailsCost.map(detail => detail.id == item.id ? {...detail, Quantity: e.target.value} : detail)
                              }));
                            }}
                            value={item.Quantity}
                          />
                          </td>
  
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          <input
                            type="number"
                            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                            onChange={e=>{
                              setFormData(prevData =>({
                                ...prevData,
                                DetailsCost: prevData.DetailsCost.map(detail => detail.id == item.id ? {...detail, UnitPrice: e.target.value} : detail)
                              }));
                            }}
                            value={item.UnitPrice}
                          />
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {formatAmountWithCommas(item.Quantity && item.UnitPrice ? Number(item.Quantity) * Number(item.UnitPrice) : 0.00)}
                          </td>
  
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                            <AiOutlineCloseCircle
                              className="text-4xl text-red-500 cursor-pointer"
                              onClick={() => {
                                setFormData( prevData =>({
                                  ...prevData,
                                  DetailsCost: formData.DetailsCost.filter(
                                    detail => detail.id !== item.id
                                  ),
                                }));
                              }}
                            />
                          </td>
                        </tr>
                        ))}

                        <tr>
                        <td
                          className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium "
                          colSpan="5"
                        >
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="bg-green-300 text-md rounded-md px-4 py-2"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  DetailsCost: [
                                    ...formData.DetailsCost,
                                    {
                                      id: uuidv4(),
                                      ParticularsID: '',
                                      Quantity: '',
                                      UnitPrice: ''
                                    },
                                  ],
                                });
                              }}
                            >
                              Add New Row
                            </button>
                          </div>
                        </td>
                      </tr>
                       
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td
                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                            colSpan="2"
                          ></td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            Total
                          </td>
  
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                            {formatAmountWithCommas(formData.DetailsCost.length > 0 ? formData.DetailsCost.reduce((accumulator, item) => accumulator + (Number(item.Quantity) * Number(item.UnitPrice)), 0) : 0.00)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="mt-5">
              <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full">
                Save invoice
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  
  export default page;
  