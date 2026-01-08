"use client"
import { useState, useEffect } from 'react'
import { Save, Search, FileText, Calendar, User, MapPin, Package, AlertCircle, ShoppingCart,Phone,PartyPopper } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Axios from '@/utils/axios'
import getCurrentDate from '@/utils/getCurrentDate'
import formatAmountWithCommas from '@/utils/formatAmountWithCommas'
import Loading from '@/components/Loading'
import InfoCard from '@/components/Card/InfoCard'
import PartyCard from '@/components/Card/PartyCard'
import RetailerCard from '@/components/Card/RetailerCard'
import BackButton from '@/components/BackButton/BackButton'

const CreateInvoicePage = ({ params }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceNo, setInvoiceNo] = useState('')
  const [challanData, setChallanData] = useState(null)
  const [invoiceDate, setInvoiceDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const createInvoiceId = async () => {
    try {
      const res = await Axios.post('?action=generate_new_invoice_number')
      setInvoiceNo(res.data.newInvoiceNo)
    } catch (error) {
      console.error('Error generating invoice number:', error)
    }
  }

  useEffect(() => {
    setInvoiceDate(getCurrentDate())
  }, [params?.id])

  const getPreviousData = async (id) => {
    setIsLoading(true)
    try {
      const res = await Axios.get(`?action=get_ChallanToInvoice&ChallanID=${id}`)
      setChallanData(res.data)
    } catch (error) {
      console.error('Error fetching challan data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (params?.id) {
      getPreviousData(params.id)
    }
  }, [params?.id])

  useEffect(() => {
    createInvoiceId()
  }, [])

  const handleSubmit = async () => {
    const dataWillSubmit = {
      InvoiceNo: invoiceNo,
      InvoiceDate: invoiceDate,
      ChallanID: params.id,
      UserID: session?.user?.id,
      TotalAmount: challanData?.ChallanDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0),
      Inword: 0
    }

    console.log('Submitting data:', dataWillSubmit)

    try {
      const res = await Axios.post('?action=Create_InvoiceAll', dataWillSubmit)
      console.log('Invoice creation response:', res.data)
      if (res.data.error) {
        alert(`Error: ${res.data.error}`)
      } else {
        alert('Invoice created successfully!')
        router.push('/dashboard/invoice-bill')
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      alert('Failed to create invoice. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (!challanData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Challan Data Found</h2>
          <p className="text-gray-600 mb-6">Unable to load challan information.</p>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const grandTotal = challanData?.ChallanDetails.reduce((acc, item) => acc + Number(item.GrandTotal), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <BackButton router={router} title="Create Invoice" />

        {/* Main Invoice Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
           
            {/* Invoice and Challan Numbers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

            <InfoCard
           label="Challan No"
       value={challanData?.ChallanMaster.ChallanNo}
       icon={<FileText className="w-5 h-5 text-white" />}
         color="blue"
        />

                  <InfoCard
           label="Challan Date"
       value={challanData?.ChallanMaster.ChallanDate}
       icon={<FileText className="w-5 h-5 text-white" />}
         color="purple"
        />

               <InfoCard
           label="Sales Order"
       value={challanData?.ChallanMaster.SalesOrderNo}
       icon={<FileText className="w-5 h-5 text-white" />}
         color="green"
        />
             
                  <InfoCard
           label="Invoice No"
       value={invoiceNo}
       icon={<FileText className="w-5 h-5 text-white" />}
         color="indigo"
        />

              
                  <InfoCard
           label="Invoice Date"
       value={invoiceDate}
       icon={<FileText className="w-5 h-5 text-white" />}
         color="orange"
        />
            </div>

            {/* Party Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Party Information */}
             
    <PartyCard
  data={{
    partyName: challanData?.ChallanMaster.PartyName || 'N/A',
    contactName: challanData?.ChallanMaster.ContactName || 'N/A',
    address: challanData?.ChallanMaster.PresentAddress || 'N/A'
  }}
/>
              {/* Retailer Information */}
              {challanData?.ChallanMaster.RetailderName && (
                   <RetailerCard
  data={{
    partyName: challanData?.ChallanMaster.RetailderName || 'N/A',
    contactName: challanData?.ChallanMaster.RetailerContactPerson || 'N/A',
    address: challanData?.ChallanMaster.RetailerAddress || 'N/A'
  }}
/>
              )}
            </div>

            {/* Product Details Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary1 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
              </div>
              
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          Sales Order No
                        </th>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          Product Name
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Qty
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          U.Price
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white tracking-wider">
                          Sub.T
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Disc%
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white tracking-wider">
                          N.Amount
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Add. 
                          Disc %
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          G.Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {challanData?.ChallanDetails.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {item.SalesOrderNo}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {item.ProductName}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                            {item.OrderQty}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right">
                            {formatAmountWithCommas(Number(item.price) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                            {formatAmountWithCommas(Number(item.subTotal) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-orange-600 text-right font-medium">
                            {item.DiscountPercentage || '0'}%
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 text-right font-medium">
                            {formatAmountWithCommas(Number(item.NetAmount) || 0)}
                          </td>
                          <td className="px-4 py-4 text-sm text-orange-600 text-right font-medium">
                            {item.AppDisPercent || '0'}%
                          </td>
                          <td className="px-4 py-4 text-sm text-blue-600 text-right font-bold">
                            {formatAmountWithCommas(Number(item.GrandTotal) || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                   <tfoot className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <tr>
                        <td colSpan="8" className="px-4 py-4 text-sm font-semibold text-black text-right ">
                          Grand Total:
                        </td>
                        <td className="px-4 py-4 text-sm text-blue-600 text-right font-bold ">
                         {formatAmountWithCommas(grandTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2  bg-primary1 text-white rounded-lg  transition-colors shadow-lg font-medium"
              >
                <Save className="w-5 h-5" />
                Save Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateInvoicePage