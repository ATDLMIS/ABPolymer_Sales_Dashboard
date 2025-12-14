'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import numberToWords from '@/utils/numberToWords';
import Axios from '@/utils/axios';
import FormInput from '@/components/fromField/FormInput';
import FormSelect from '@/components/fromField/FormSelect';
import FormFileUpload from '@/components/fromField/FormFileUpload';
import FormDatePicker from '@/components/fromField/FormDatePicker';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const Page = () => {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
    useEffect(() => {
      const storedUserID = localStorage.getItem("UserID") || "defaultID";
      setUserID(storedUserID);
    }, []);
  const [formData, setFormData] = useState({
    MRNo: '',
    PartyID: '',
    MRDate: new Date(),
    AmountReceived: '',
    InWord: '',
    PaymentMethodID: '',
    PaymentMethodDetailsID: '',
    ReceivedByUserID: '',
    ChallanCopyPath: null,
    TransactionsNumber: '',
    MobileNumber: '',
    BranchName: '',
    DepositeName: '',
    Remarks: '',
  });
  const [methodDetail, setMethodInDetails] = useState([]);
  useEffect(() => {
    if (formData.AmountReceived) {
      const receiveText = numberToWords(Number(formData.AmountReceived));
      setFormData(prevData => ({
        ...prevData,
        InWord: receiveText,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        InWord: '',
      }));
    }
  }, [formData.AmountReceived]);

  const getMoneyReceipt = async () => {
    const res = await Axios.post('?action=generate_new_money_receipt_number');
    if (res.data?.NewMRNo) {
      setFormData(prev => ({
        ...prev,
        MRNo: res.data.NewMRNo,
      }));
    }
  };

  const allParties = useGetData(`?action=get_parties_users&UserID=${userID}`);
  const paymentMethod = useGetData('?action=get_PaymentMethod');

  useEffect(() => {
    getMoneyReceipt();
  }, []);

  const getMethodInDetail = async id => {
    setFormData(prevData => ({
      ...prevData,
      PaymentMethodDetailsID: '',
    }));
    const res = await Axios.get(
      `?action=get_PaymentMethodCash&PaymentMethodID=${id}`
    );
    setMethodInDetails(res.data);
  };

  useEffect(() => {
    if (formData.PaymentMethodID) {
      getMethodInDetail(formData.PaymentMethodID);
    }
  }, [formData.PaymentMethodID]);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit =  async e => {
    e.preventDefault();
    try {
      const dataWillBeSubmitted = new FormData();
      dataWillBeSubmitted.append('MRNo', formData.MRNo);
      dataWillBeSubmitted.append('PartyID', formData.PartyID);
      dataWillBeSubmitted.append('MRDate', formData.MRDate.toISOString().split('T')[0]);
      dataWillBeSubmitted.append('AmountReceived', formData.AmountReceived);
      dataWillBeSubmitted.append('InWord', formData.InWord);
      dataWillBeSubmitted.append('PaymentMethodID', formData.PaymentMethodID);
      dataWillBeSubmitted.append('PaymentMethodDetailsID', formData.PaymentMethodDetailsID);
      dataWillBeSubmitted.append('ReceivedByUserID', userID);
      if(formData.PaymentMethodID == 2){
         dataWillBeSubmitted.append('DepositSlip', formData.ChallanCopyPath);
      dataWillBeSubmitted.append('TranNumber', formData.TransactionsNumber);
      dataWillBeSubmitted.append('MobileNumber', formData.MobileNumber);
      dataWillBeSubmitted.append('BranchName', formData.BranchName);
      dataWillBeSubmitted.append('DepositeName', formData.DepositeName);
      dataWillBeSubmitted.append('Remarks', formData.Remarks);
      
      }
      
    

      const res = await Axios.post(
        '?action=create_moneyreceipt',
        dataWillBeSubmitted,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res?.data);
      if (res.status === 200) {
        router.push('/dashboard/money-receipt');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create money receipt. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Money Receipt
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Create and manage money receipts
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
                  label="Receipt Number"
                  id="MRNo"
                  value={formData.MRNo}
                  readOnly={true}
                />

                <FormDatePicker
                  label="Receipt Date"
                  selected={formData.MRDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, MRDate: date }))}
                  required={true}
                />

                <FormSelect
                  label="Party Name"
                  id="PartyID"
                  value={formData.PartyID}
                  onChange={handleInputChange('PartyID')}
                  options={allParties.data || []}
                  valueKey="PartyID"
                  labelKey="PartyName"
                  required={true}
                />

                <FormInput
                  label="Amount Received"
                  id="AmountReceived"
                  type="number"
                  value={formData.AmountReceived}
                  onChange={handleInputChange('AmountReceived')}
                  placeholder="0.00"
                  required={true}
                />

                <FormInput
                  label="Amount In Words"
                  id="InWord"
                  value={formData.InWord}
                  readOnly={true}
                  className="capitalize"
                />
              </div>

              {/* Right Column */}
              <div>
                <FormSelect
                  label="Payment Method"
                  id="PaymentMethodID"
                  value={formData.PaymentMethodID}
                  onChange={handleInputChange('PaymentMethodID')}
                  options={paymentMethod.data || []}
                  valueKey="PaymentMethodID"
                  labelKey="PMName"
                  required={true}
                />

                <FormSelect
                  label="Bank Name / Purpose"
                  id="PaymentMethodDetailsID"
                  value={formData.PaymentMethodDetailsID}
                  onChange={handleInputChange('PaymentMethodDetailsID')}
                  options={methodDetail || []}
                  valueKey="PaymentMethodDetailsID"
                  labelKey="PMDName"
                  disabled={!formData.PaymentMethodID}
                />

                {/* Conditional Fields for Payment Method 2 */}
                {formData.PaymentMethodID == 2 && (
                  <>
                    <FormInput
                      label="Branch Name"
                      id="BranchName"
                      value={formData.BranchName}
                      onChange={handleInputChange('BranchName')}
                      placeholder="Enter branch name"
                    />

                    <FormFileUpload
                      label="Challan Copy Upload"
                      id="ChallanCopyPath"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData(prev => ({ ...prev, ChallanCopyPath: file }));
                      }}
                    />

                    <FormInput
                      label="Transaction Number"
                      id="TransactionsNumber"
                      value={formData.TransactionsNumber}
                      onChange={handleInputChange('TransactionsNumber')}
                      placeholder="Enter transaction number"
                    />

                    <FormInput
                      label="Mobile Number"
                      id="MobileNumber"
                      type="tel"
                      value={formData.MobileNumber}
                      onChange={handleInputChange('MobileNumber')}
                      placeholder="Enter mobile number"
                    />

                    <FormInput
                      label="Deposite Name"
                      id="Deposite Name"
                      value={formData.DepositeName}
                      onChange={handleInputChange('DepositeName')}
                      placeholder="Enter deposite Name"
                    />
                    <FormInput
                      label="Remarks"
                      id="Remarks"
                      value={formData.Remarks}
                      onChange={handleInputChange('Remarks')}
                      placeholder="Enter remarks"
                    />
                  </>
                )}
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
                Save Money Receipt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;