'use client';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter, useSearchParams } from 'next/navigation';
import FormInput from '@/components/fromField/FormInput';
import FormDatePicker from '@/components/fromField/FormDatePicker';
import FormSelect from '@/components/fromField/FormSelect';
import Axios from '@/utils/axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({params}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    TripNo: '',
    DeliverySalesDate: new Date().toISOString().split('T')[0],
    TripType: '',
    DriverName: '',
    DriverMobile: '',
    TransportName: '',
    VehicleNo: '',
    DepotName: '',
    LastPoint: '',
  });
 
  const [loading, setLoading] = useState(true);

  // Fetch existing trip data
  const fetchTripData = async () => {
    if (params.id == null ) {
      alert('No trip ID provided');
      router.push('/dashboard/trip-register');
      return;
    }

    try {
      setLoading(true);
      const res = await Axios.get(`?action=get_TripSchedule&TripID=${params.id}`);
      if (res.data) {
        const tripData = res.data;
        setFormData({
          TripNo: tripData?.TripNo || '',
          DeliverySalesDate: tripData?.DeliverySalesDate || new Date().toISOString().split('T')[0],
          TripType: tripData?.TripType || '',
          DriverName: tripData?.DriverName || '',
          DriverMobile: tripData?.DriverMobile || '',
          TransportName: tripData?.TransportName || '',
          VehicleNo: tripData?.VehicleNo || '',
          DepotName: tripData?.DepotName || '',
          LastPoint: tripData?.LastPoint || '',
        });
         console.log(formData);
      } else {
        alert('Trip not found');
        router.push('/dashboard/trip-register');
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
      alert('Failed to load trip data. Please try again.');
      router.push('/dashboard/trip-register');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripData();
  }, [params.id]);

  const tripTypes = [
    { TripTypeID: '1', TripTypeName: 'Own' },
    { TripTypeID: '2', TripTypeName: 'Hired' },
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    
    try {
      const response = await Axios.put('?action=update_TripSchedule_full', {
        TripID: params.id,
        ...formData
      });
      
      console.log('Response from server:', response.data);
      
      if (response.data?.message === 'Trip updated successfully') {
        router.push('/dashboard/trip-register');
      } else {
        alert('Failed to update trip register. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update trip register. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F0B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-lg font-bold text-gray-900">
                Update Trip Register
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Update the details below to modify the trip register.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <FormInput
                  label="Trip No"
                  id="TripNo"
                  value={formData.TripNo}
                  readOnly={true}
                />

                <FormDatePicker
                  label="Trip Date"
                  selected={formData.DeliverySalesDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, DeliverySalesDate: date }))}
                  required={true}
                />

                <FormSelect
                  label="Trip Type"
                  id="TripType"
                  value={formData.TripType}
                  onChange={handleInputChange('TripType')}
                  options={tripTypes}
                  valueKey="TripTypeName"
                  labelKey="TripTypeName"
                  required={true}
                />

                <FormInput
                  label="Driver Name"
                  id="DriverName"
                  value={formData.DriverName}
                  onChange={handleInputChange('DriverName')}
                  placeholder="Enter driver name"
                  required={true}
                />

                <FormInput
                  label="Driver Mobile"
                  id="DriverMobile"
                  type="number"
                  value={formData.DriverMobile}
                  onChange={handleInputChange('DriverMobile')}
                  placeholder="Enter driver mobile number"
                  required={true}
                />
              </div>

              {/* Right Column */}
              <div>
                <FormInput
                  label="Transport Name"
                  id="TransportName"
                  value={formData.TransportName}
                  onChange={handleInputChange('TransportName')}
                  placeholder="Enter transport name"
                />

                <FormInput
                  label="Vehicle Number"
                  id="VehicleNo"
                  value={formData.VehicleNo}
                  onChange={handleInputChange('VehicleNo')}
                  placeholder="Enter vehicle number"
                />

                <FormInput
                  label="Depot Name"
                  id="DepotName"
                  value={formData.DepotName}
                  onChange={handleInputChange('DepotName')}
                  placeholder="Enter depot name"
                />

                <FormInput
                  label="Last Point"
                  id="LastPoint"
                  value={formData.LastPoint}
                  onChange={handleInputChange('LastPoint')}
                  placeholder="Enter last point"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => router.push('/dashboard/trip-register')}
                className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-white bg-[#FF6F0B] rounded-lg font-medium hover:bg-[#E66309] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F0B] transition-colors shadow-sm"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
