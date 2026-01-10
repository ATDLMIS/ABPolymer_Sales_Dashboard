'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import convertDateFormat from '@/utils/convertDateFormat';
import getCurrentDate from '@/utils/getCurrentDate';
import { FiSearch, FiSave, FiChevronLeft } from 'react-icons/fi';
import Axios from '@/utils/axios';
import Loading from '@/components/Loading';
import InfoCard from '@/components/Card/InfoCard';
import { Printer, Download, Search, FileText, Calendar, User, MapPin, Package, Eye, CalendarCheck2 } from 'lucide-react'
import PartyCard from '@/components/Card/PartyCard';
import RetailerCard from '@/components/Card/RetailerCard';
import BackButton from '@/components/BackButton/BackButton';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({ params }) => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    ChallanNo: '',
    ChallanDate: getCurrentDate(),
    SalesOrderIDs: [],
    OrderTypeID: '',
    UserID: '',
    PartyID: '',
    PartyName: '',
    ContactName: '',
    ContactNumber: '',
    PresentAddress: '',
    HireAgentName: '',
    DriverName: '',
    Own_Hire: '',
    Driver_Number: '',
    Vehicle_Number: '',
    Details: [],
  });
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [salesOrderNos, setSalesOrderNos] = useState([]);
  
  // New state for trips
  const [allTrips, setAllTrips] = useState([]);
  const [selectedTripID, setSelectedTripID] = useState('');
  const [loadingTrips, setLoadingTrips] = useState(false);

  const getSelectedIDs = () => {
    if (params?.id) {
      return params.id.split(',').map(id => id.trim());
    }
    return [];
  };

  // Fetch all trips
  const fetchAllTrips = async () => {
    try {
      setLoadingTrips(true);
      const res = await Axios.get('?action=get_TripSchedules');
      if (res.data && Array.isArray(res.data)) {
        setAllTrips(res.data);
      }
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoadingTrips(false);
    }
  };

  // Fetch specific trip details and auto-fill
  const fetchTripDetails = async (tripID) => {
    if (!tripID) return;
    
    try {
      setLoadingTrips(true);
      const res = await Axios.get(`?action=get_TripSchedule&TripID=${tripID}`);
      
      if (res.data) {
        const tripData = res.data;
        
        // Auto-fill the transport fields
        setFormData(prevData => ({
          ...prevData,
          HireAgentName: tripData.TransportName || '',
          DriverName: tripData.DriverName || '',
          Own_Hire: tripData.TripType || '',
          Driver_Number: tripData.DriverMobile || '',
          Vehicle_Number: tripData.VehicleNo || '',
        }));
      }
    } catch (err) {
      console.error('Error fetching trip details:', err);
      alert('Failed to load trip details');
    } finally {
      setLoadingTrips(false);
    }
  };

  // Handle trip selection
  const handleTripChange = (e) => {
    const tripID = e.target.value;
    setSelectedTripID(tripID);
    
    if (tripID) {
      fetchTripDetails(tripID);
    } else {
      // Clear transport fields if no trip selected
      setFormData(prevData => ({
        ...prevData,
        HireAgentName: '',
        DriverName: '',
        Own_Hire: '',
        Driver_Number: '',
        Vehicle_Number: '',
      }));
    }
  };

  const getChalanNumber = async () => {
    try {
      const res = await Axios.post('?action=generate_new_Challan_number');
      setFormData(prevData => ({
        ...prevData,
        ChallanNo: res.data.NewChallanNo,
      }));
    } catch (err) {
      setError('Failed to generate challan number');
      console.error(err);
    }
  };

  const getOrderDetails = async (ids) => {
    try {
      setLoading(true);
      
      const response = await Axios.get(`?action=get_orderforchallan&SalesOrderID=${ids.join(',')}`);
      const allOrdersData = response.data;
      
      const ordersArray = Array.isArray(allOrdersData) ? allOrdersData : [allOrdersData];
      
      setOrdersData(ordersArray);

      const orderNos = ordersArray
        .map(o => o.order?.SalesOrderNo)
        .filter(Boolean);

      setSalesOrderNos(orderNos);
      
      const firstOrder = ordersArray[0]?.order;

      const retailerExists = firstOrder?.RetailerCode || firstOrder?.RetailerName;
      
      const allSameParty = ordersArray.every(order => 
        order.order.PartyID === firstOrder.PartyID
      );
      
      if (!allSameParty && ordersArray.length > 1) {
        setError('Selected orders have different parties. Please select orders with the same party for bulk challan.');
        return;
      }
      
      const allSameRetailer = ordersArray.every(order => 
        order.order.RetailerCode === firstOrder.RetailerCode
      );
      
      if (!allSameRetailer && ordersArray.length > 1) {
        setError('Selected orders have different retailers. Please select orders with the same retailer for bulk challan.');
        return;
      }
      
      const allOrderDetails = ordersArray.flatMap((data, index) => 
        data.orderDetails.map(item => ({
          ...item,
          SalesOrderNo: data.order.SalesOrderNo,
          SalesOrderID: data.order.SalesOrderID,
          OrderIDIndex: index,
        }))
      );

      if (status === 'authenticated' && session?.user?.id) {
        setFormData(prevData => ({
          ...prevData,
          SalesOrderIDs: ids,
          PartyName: firstOrder?.PartyName || '',
          PartyID: firstOrder?.PartyID || '',
          OrderTypeID: firstOrder?.OrderTypeID || '',
          ContactName: firstOrder?.ContactName || '',
          ContactNumber: firstOrder?.ContactNumber || '',
          PresentAddress: firstOrder?.PresentAddress || '',
          OutletID: firstOrder?.OutletID || null,
          RetailerCode: firstOrder?.RetailerCode || '',
          RetailerName: firstOrder?.RetailerName || '',
          RetailerContactPerson: firstOrder?.ContactPersonName || '',
          RetailerContactPhone: firstOrder?.ContactPhone1 || '',
          RetailerAddress: firstOrder?.Address || '',
          HireAgentName: firstOrder?.HireAgentName || '',
          DriverName: firstOrder?.DriverName || '',
          TripType: firstOrder?.TripType || '',
          Driver_Number: firstOrder?.Driver_Number || '',
          Vehicle_Number: firstOrder?.Vehicle_Number || '',
          UserID: session.user.id,
          Details: allOrderDetails.map(item => ({
            SL: item.SL,
            FinancialYear: item.FinancialYear,
            FinancialYearID: item.FinancialYearID,
            ProductCategoryID: item.ProductCategoryID,
            CategoryName: item.CategoryName,
            ProductID: item.ProductID,
            ProductName: item.ProductName,
            SalesOrderNo: item.SalesOrderNo,
            SalesOrderID: item.SalesOrderID,
            OrderQty: item.Quantity,
           ChallanQty: Math.min(item.AvailableQty, item.Quantity),
            AvailQty: item.AvailableQty,
          })),
        }));
      }
    } catch (err) {
      setError('Failed to load order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ids = getSelectedIDs();
    if (ids.length > 0) {
      getOrderDetails(ids);
    }
  }, [params.id]);

  useEffect(() => {
    getChalanNumber();
    fetchAllTrips();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       // Validate trip selection
    if (!selectedTripID) {
      alert('Please select a trip before creating the challan');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ChallanNo: formData.ChallanNo,
        ChallanDate: formData.ChallanDate,
        SalesOrderNo: salesOrderNos.join(', '),
        PartyID: Number(formData.PartyID),
        TripID: selectedTripID ? Number(selectedTripID) : null,
        OrderTypeID: Number(formData.OrderTypeID),
        OutletID: Number(formData.OutletID),
        UserID: Number(formData.UserID),
        HireAgentName: formData.HireAgentName,
        DriverName: formData.DriverName,
        Own_Hire: formData.Own_Hire,
        Driver_Number: formData.Driver_Number,
        Vehicle_Number: formData.Vehicle_Number,
        Details: formData.Details.map(d => ({
          FinancialYearID: Number(d.FinancialYearID),
          SalesOrderID: Number(d.SalesOrderID),
          ProductCategoryID: Number(d.ProductCategoryID),
          ProductID: Number(d.ProductID),
          OrderQty: Number(d.OrderQty),
          ChallanQty: Number(d.ChallanQty),
          AvailQty: Number(d.AvailQty)
        }))
      };

      const response = await Axios.post('?action=Create_DeliveryChallanAll',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          maxBodyLength: Infinity
        }
      );
console.log(response.data);
      if (!response.data?.success) {
        throw new Error(response.data?.error || 'API failed');
      }

      alert(
        `Delivery Challan Created Successfully\nChallan No: ${response.data.ChallanNo}`
      );

      router.push('/dashboard/delivery-challan');

    } catch (error) {
      console.error('API ERROR:', error);
      alert(
        error.response?.data?.error ||
        error.message ||
        'Failed to save challan'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChallanQtyChange = (e, item) => {
    const value = e.target.value;
    const availQty = Number(item.AvailQty);
    const orderQty = Number(item.OrderQty);

    if (
      value === '' ||
      (Number(value) >= 0 && Number(value) <= Math.min(availQty, orderQty))
    ) {
      setFormData(prevData => ({
        ...prevData,
        Details: prevData.Details.map(detail => {
          if (detail.SL === item.SL && detail.SalesOrderID === item.SalesOrderID) {
            return {
              ...detail,
              ChallanQty: value,
            };
          }
          return detail;
        }),
      }));
    }
  };


  if (status === 'loading') {
    return (
       <Loading />
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Please log in to access this page
          <button
            onClick={() => router.push('/api/auth/signin')}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block w-full"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary1"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => router.back()}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block w-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackButton router={router} title="Create Delivery Challan" />
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InfoCard
                         label="Challan No"
                     value={formData.ChallanNo}
                     icon={<FileText className="w-5 h-5 text-white" />}
                       color="blue"
                      />

               <InfoCard
                         label="Challan Date"
                     value= {convertDateFormat(formData.ChallanDate)}
                     icon={<Calendar className="w-5 h-5 text-white" />}
                       color="orange"
                      />
   <InfoCard
                        label="Sales Order No"
                    value=  {salesOrderNos.join(', ')}
                    icon={<CalendarCheck2 className="w-5 h-5 text-white" />}
                      color="purple"
                     />
             
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Party Information */} 
    <PartyCard
  data={{
    partyName:formData.PartyName || 'N/A',
    contactName: formData.ContactNumber || 'N/A',
    address: formData.PresentAddress || 'N/A'
  }}
/>
               {formData.RetailerCode && (
               <RetailerCard
                title={"Retailer Information"}
  data={{
    partyName:formData.RetailerCode - formData.RetailerName|| 'N/A',
    contactName:formData.RetailerContactPhone || 'N/A',
    address: formData.RetailerAddress || 'N/A'
  }}
/>
            )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales Order
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PRODUCT
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ORDERED
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider mr-10">
                          CHALLAN QTY
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          AVAILABLE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.Details.length > 0 ? (
                        formData.Details.map((item, index) => (
                          <tr key={`${item.SalesOrderID}-${item.SL}`} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                              {item.SalesOrderNo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <div>
                                <div className="font-medium">{item.ProductName}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Category: {item.CategoryName}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                              {item.OrderQty} Pcs
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap  text-sm text-gray-700">
                              <input
                                type="number"
                                min="0"
                                max={Math.min(item.AvailQty, item.OrderQty)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent text-right"
                                value={item.ChallanQty}
                                onChange={e => handleChallanQtyChange(e, item)}
                                required
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                              {item.AvailQty} Pcs
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Transport Information Section with Trip Dropdown */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Transport Information</h2>
            
            {/* Trip Selection Dropdown */}
            <div className="w-[40%] mb-4 ">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Trip (Auto-fills transport details)
              </label>
              <select
                value={selectedTripID}
                onChange={handleTripChange}
                disabled={loadingTrips}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
              >
                <option value="">-- Select a Trip --</option>
                {allTrips.map(trip => (
                  <option key={trip.TripID} value={trip.TripID}>
                    {trip.TripNo} - {trip.DriverName} ({trip.VehicleNo})
                  </option>
                ))}
              </select>
              {loadingTrips && (
                <p className="text-sm text-gray-500 mt-2">Loading trip details...</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transport Name
                </label>
                <input
                  type="text"
                  name="HireAgentName"
                  value={formData.HireAgentName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
                  placeholder="Enter transport name"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  name="DriverName"
                  value={formData.DriverName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
                  placeholder="Enter driver name"
                   readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Trip Type 
                </label>
                <input
                  type="text"
                  name="Own_Hire"
                  value={formData.Own_Hire}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
                  placeholder="Enter own/hire"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver Number
                </label>
                <input
                  type="text"
                  name="Driver_Number"
                  value={formData.Driver_Number}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
                  placeholder="Enter driver number"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  name="Vehicle_Number"
                  value={formData.Vehicle_Number}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
                  placeholder="Enter vehicle number"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary1 hover:bg-primary1-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary1 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Challan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;