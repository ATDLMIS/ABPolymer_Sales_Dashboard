"use client"
import {useState, useEffect, use} from 'react'
import getCurrentDate from '@/utils/getCurrentDate';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
import convertDateFormat from '@/utils/convertDateFormat';
import useGetData from '@/utils/useGetData';
import Loading from '@/components/Loading';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const page = ({params}) => {
  const {data: session} = useSession()
  const[isLoading, setIsLoading] = useState(false)
  const [invoiceNo, setInvoiceNo] = useState('');
  const [challanData, setChallanData] = useState();
 const [invoiceDate, setInvoiceDate] = useState()
  const createInvoiceId = async ()=>{
    const res = await Axios.post('?action=generate_new_invoice_number')
    setInvoiceNo(res.data.newInvoiceNo)
  }

    useEffect(()=>{
      setInvoiceDate(getCurrentDate())
    }, [params.id])

  const getPreviousData = async id =>{
    setIsLoading(true)
    const res = await Axios.get(`?action=get_ChallanToInvoice&ChallanID=${id}`)
       setChallanData(res.data);
       setIsLoading(false)
  }

  useEffect(()=>{
    if(params.id){
      getPreviousData(params.id)
    }
  }, [params.id])

  useEffect(()=>{
    createInvoiceId()
  }, [])



  const router = useRouter()

  const handleSubmit = async e =>{
    e.preventDefault()
    

    const dataWillSubmit = {
      InvoiceNo: invoiceNo,
      InvoiceDate: invoiceDate,
      ChallanID: params.id,
      UserID: session.user.id,
      TotalAmount:   challanData?.ChallanDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0),
  Inword: 0
};

    console.log('Submitting data:', dataWillSubmit); // For debugging

    try {
      const res = await Axios.post('?action=Create_InvoiceAll', dataWillSubmit);
      console.log('Invoice creation response:', res.data);
      if (res.data.error) {
        alert(`Error: ${res.data.error}`);
      } else {
        alert('Invoice created successfully!');
        router.push('/dashboard/invoice-bill');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice. Please try again.');
    }
  }

 
if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <p className="text-gray-600"><Loading/></p>
      </div>
    </div>;
  }
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Create Invoice</h1>
        <div className="w-full lg:w-auto">
          <input
            name="search"
            type="text"
            placeholder="Search..."
            className="w-full lg:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic Information Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Challan No
              </label>
              <div className="text-sm font-semibold">{challanData?.ChallanMaster.ChallanNo}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm   text-gray-500 mb-1">
                Challan Date
              </label>
              <div className="text-sm font-semibold text-gray-700">
                {challanData?.ChallanMaster.ChallanDate}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm   text-gray-500 mb-1">
                Sales Order No
              </label>
              <div className="text-sm font-semibold text-gray-700">
                {challanData?.ChallanMaster.SalesOrderNo}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Invoice No
              </label>
              <div className="text-sm font-semibold text-gray-700">
                {invoiceNo}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Invoice Date
              </label>
              <div className="text-sm font-semibold text-gray-700">
                {invoiceDate}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Party Information
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-500">Party Name</span>
                    <div className="font-medium text-gray-800">
                      {challanData?.ChallanMaster.PartyName || 'N/A'}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-500">Contacts</span>
                    <div>
                      {challanData?.ChallanMaster.ContactName || 'N/A'}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-500">Address</span>
                    <div>{challanData?.ChallanMaster.PresentAddress || 'N/A'}</div>
                  </div>
                </div>
              </div>

               {challanData?.ChallanMaster.RetailderName && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Retailer Information
                </h3>

               
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Retailer Name</span>
                      <div className="font-medium text-gray-800">
                         {challanData?.ChallanMaster.RetailderName || 'N/A'}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Contacts</span>
                      <div>
                        {challanData?.ChallanMaster.RetailerContactPerson || 'N/A'}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Address</span>
                      <div>{challanData?.ChallanMaster.RetailerAddress || 'N/A'}</div>
                    </div>
                  </div>
                
              </div>
            )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales Order
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sub Total
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dis. %
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Amount
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      App.Dis. %
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grand Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Directly map groupedItems (which is now an array) */}
                  {challanData?.ChallanDetails.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.SalesOrderNo}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.ProductName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {item.OrderQty}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatAmountWithCommas(Number(item.price))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatAmountWithCommas(Number(item.subTotal))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {item.DiscountPercentage}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatAmountWithCommas(Number(item.NetAmount))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {item.AppDisPercent}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatAmountWithCommas(Number(item.GrandTotal))}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Total Row */}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan="8" className="px-4 py-3 text-right text-sm text-gray-700">
                      Grand Total:
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-green-600">
                      {formatAmountWithCommas(
                        challanData?.ChallanDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary1 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;