'use client';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FormInput from '@/components/fromField/FormInput';
import FormDatePicker from '@/components/fromField/FormDatePicker';
import FormSelect from '@/components/fromField/FormSelect';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
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

  const getMoneyReceipt = async () => {
    const res = await Axios.post('?action=generate_new_TripSchedule_number');
    if (res.data?.NewTripNo) {
      setFormData(prev => ({
        ...prev,
        TripNo: res.data.NewTripNo,
      }));
    }
  };


  useEffect(() => {
    getMoneyReceipt();
  }, []);
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
  

  const handleSubmit =  async e => {
   await e.preventDefault();
    console.log('Form submitted with data:', formData);
    try {
      const response = await Axios.post('?action=create_TripSchedule', formData);
       console.log('Response from server:', response.data);
      if (response.data?.message === 'Trip schedule created successfully') { 
        router.push('/dashboard/trip-register');
      } else {
        alert('Failed to create trip register. Please try again.');
      }
    }
       catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create trip register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-lg font-bold text-gray-900">
                Add Trip Register
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Fill in the details below to create a new trip register.
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
                {/* <FormSelect
                  label="Party Name"
                  id="PartyID"
                  value={formData.PartyID}
                  onChange={handleInputChange('PartyID')}
                  options={allParties.data || []}
                  valueKey="PartyID"
                  labelKey="PartyName"
                  required={true}
                /> */}

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
            

                {/* <FormSelect
                  label="Bank Name / Purpose"
                  id="PaymentMethodDetailsID"
                  value={formData.PaymentMethodDetailsID}
                  onChange={handleInputChange('PaymentMethodDetailsID')}
                  options={methodDetail || []}
                  valueKey="PaymentMethodDetailsID"
                  labelKey="PMDName"
                  disabled={!formData.PaymentMethodID}
                /> */}

               
                    <FormInput
                      label="Transport Name"
                      id="TransportName"
                      value={formData.TransportName}
                      onChange={handleInputChange('TransportName')}
                      placeholder="Enter transport name"
                    />

                    {/* <FormFileUpload
                      label=" Slip Upload"
                      id="DepositSlip"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData(prev => ({ ...prev, DepositSlip: file }));
                      }}
                    /> */}

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
                onClick={() => router.push('/dashboard/money-receipt')}
                className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-white bg-[#FF6F0B] rounded-lg font-medium hover:bg-[#E66309] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F0B] transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;