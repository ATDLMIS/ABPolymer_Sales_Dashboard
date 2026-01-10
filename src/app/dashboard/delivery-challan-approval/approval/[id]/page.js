

"use client"
import {useState, useEffect} from 'react'
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import { Printer, Download, Search, FileText, Calendar, User, MapPin, Package, Eye, Tractor, Phone,People, PersonStanding, TypeIcon, Calendar1 } from 'lucide-react'
import Axios from '@/utils/axios';
import BackButton from '@/components/BackButton/BackButton';
import { useRouter } from 'next/navigation';
import InfoCard from '@/components/Card/InfoCard';
import { BsPeople } from 'react-icons/bs';
import { PiVideoConferenceThin } from 'react-icons/pi';
import { HiReceiptTax, HiStatusOnline } from 'react-icons/hi';
import RetailerCard from '@/components/Card/RetailerCard';
import PartyCard from '@/components/Card/PartyCard';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Page = ({params}) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null
  })
 const router = useRouter();
  const { data: session } = useSession();
       const userID = session?.user?.id;
  
 const [formData, setFormData] = useState({
    ApprovalComments: '',
  });
  const handleChecked = async () => {
    const userData = {
        ChallanID: state.data?.ChallanMaster.ChallanID,
        CheckedComments: null,
        AuthComments: null,
        CheckedComments: formData.ApprovalComments,
        UserID: userID
      };
    const res = await Axios.post(
      `?action=create_sndApprovalDetailsChallan&ChallanID=${params.id}`,
      userData
    );
    console.log('Approval Response:', res.data)
    router.push('/dashboard/delivery-challan-approval');
  };
  const getData = async id => {
    try {
      const res = await Axios.get(`?action=get_ChallanOrderDetails&ChallanID=${id}`)
      setState({
        status: "idle",
        data: res.data
      })
    } catch (error) {
      setState({
        status: "error",
        data: null
      })
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    if(params.id){
      getData(params.id)
    }
  }, [params.id])

  // Function to format date as "20 -12 -2025"
  const formatDateWithDashes = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} -${month} -${year}`;
  }

 

  if(state.status === 'pending'){
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Loading Challan Details...</div>
        </div>
      </div>
    )
  }

  if(state.status === 'error'){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Challan</h2>
          <p className="text-gray-600 mb-4">Error loading data. Please try again.</p>
        </div>
      </div>
    )
  }

  const { ChallanMaster, ChallanDetails } = state.data;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
          <BackButton router={router} title="Delivery Challan Approval" />
        </div>

      {/* Main Challan Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header with Company Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
         
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                 <InfoCard
                         label="Challan No"
                     value={ChallanMaster.ChallanNo}
                     icon={<FileText className="w-5 h-5 text-white" />}
                       color="blue"
                      />
                 <InfoCard
                        label="Challan Date"
                    value={formatDateWithDashes(ChallanMaster.ChallanDate)}
                    icon={<Calendar1 className="w-5 h-5 text-white" />}
                      color="indigo"
                     />
             
                           
                               <InfoCard
                        label="Hire Type"
                    value={ChallanMaster.Own_Hire || 'N/A'}
                    icon={<HiReceiptTax className="w-5 h-5 text-white" />}
                      color="orange"
                     />
                               <InfoCard
                        label="Status"
                    value={'Challan Pending'}
                    icon={<HiStatusOnline className="w-5 h-5 text-white" />}
                      color="green"
                     />
                               <InfoCard
                        label="Vehicle No"
                    value={ChallanMaster.Vehicle_Number || 'N/A'}
                    icon={<PiVideoConferenceThin className="w-5 h-5 text-white" />}
                      color="orange"
                     />
                               <InfoCard
                        label="Driver Name"
                    value={ChallanMaster.DriverName || 'N/A'}
                    icon={<BsPeople className="w-5 h-5 text-white" />}
                      color="blue"
                     />
                               <InfoCard
                        label="Driver Mobile"
                    value={ChallanMaster.Driver_Number || 'N/A'}
                    icon={<Phone className="w-5 h-5 text-white" />}
                      color="purple"
                     />
                               <InfoCard
                        label="Transport Name"
                    value={ChallanMaster.HireAgentName || 'N/A'}
                    icon={<Tractor className="w-5 h-5 text-white" />}
                      color="blue"
                     />
            </div>
          {/* Challan Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Party Information Card */}
                      
    <PartyCard
  data={{
    partyName:  ChallanMaster.PartyName,
    contactName: ChallanMaster.ContactNumber || 'N/A',
    address: ChallanMaster.PermanentAddress || 'N/A'
  }}
/>

            {/* Delivery Point Information Card */}
           {
            ChallanMaster.RetailerCode && (<>
                <RetailerCard
                title={"Retailer Information"}
  data={{
    partyName:ChallanMaster.RetailerName || 'N/A',
    contactName:ChallanMaster.ContactPhone || 'N/A',
    address: ChallanMaster.Address|| 'N/A'
  }}
/>
             </>)
           }
          </div>
        </div>

     

        {/* Product Details Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
            <div className="text-sm text-gray-500">
              Total Items: <span className="font-semibold text-blue-600">{ChallanDetails.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          SL
                        </th>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          Order No
                        </th>
                        <th className="px-4 py-4 text-left text-xs text-white  tracking-wider">
                          Product Name
                        </th>
                        <th className="px-4 py-4 text-right text-xs  text-white  tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ChallanDetails.map((item, index) => (
                  <tr key={item.ChallanDetailID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {item.SalesOrderNo}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {item.ProductName || item.ProductNameRepo}
                    </td>
                    <td className="text-right px-4 py-4 text-sm font-medium text-gray-900">
                        {formatAmountWithCommas(Number(item.ChallanQty))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       
      </div>
     {/* Approval Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200   mt-6 ">
        
        <div className="p-4">
          <div className="mb-4">
            <label
              htmlFor="ApprovalComments"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Approval Comment
            </label>
            <textarea
              id="ApprovalComments"
              className="w-full px-4 py-3  border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors duration-200 resize-none"
              name="ApprovalComments"
              rows="4"
              placeholder="Enter your comments here..."
              value={formData.ApprovalComments}
              onChange={e => {
                setFormData({
                  ...formData,
                  ApprovalComments: e.target.value,
                });
              }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
           
            <button
              className="px-6 py-3 bg-primary1 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={handleChecked}
            >
              Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page