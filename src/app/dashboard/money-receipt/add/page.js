'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import numberToWords from '@/utils/numberToWords';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const [formData, setFormData] = useState({
    MRNo: '',
    PartyID: '',
    MRDate: new Date().toISOString().split('T')[0],
    AmountReceived: '',
    InWord: '',
    PaymentMethodID: '',
    PaymentMethodDetailsID: '',
    ReceivedByUserID: 501,
  });
  const [methodDetail, setMethodInDetails] = useState([]);

  const [remarks, setRemarks] = useState("")
  const [chqDetails, setChqDetails] = useState({
    AccName: '',
    AccNumber: '',
    ChequeNumber: ''
  })

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
    const res = await Axios.post(
      '?action=generate_new_money_receipt_number'
    );
    if (res.data?.NewMRNo) {
      setFormData({
        ...formData,
        MRNo: res.data.NewMRNo,
      });
    }
  };

  const allParties = useGetData(
    `?action=get_parties_users&UserID=501`
  );

  useEffect(() => {
    getMoneyReceipt();
  }, []);

  const paymentMethod = useGetData(
    '?action=get_PaymentMethod'
  );

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

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const dataWillbeSubmitted = {...formData}
    if(formData.PaymentMethodID == 4){
      dataWillbeSubmitted.AccName = chqDetails.AccName
      dataWillbeSubmitted.AccNumber = chqDetails.AccNumber
      dataWillbeSubmitted.ChequeNumber = chqDetails.ChequeNumber
    }
    if(formData.PaymentMethodID == 1 && formData.PaymentMethodDetailsID == 5){
      dataWillbeSubmitted.Remarks = remarks
    }
    const res = await Axios.post(
      '?action=create_moneyreceipt',
      dataWillbeSubmitted
    );
    router.push('/dashboard/money-receipt');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">add money receipt</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="max-w-2xl bg-gray-200 rounded-md px-4 py-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="MRNo" className="capitalize flex font-semibold text-md py-1">
          Receipt Number:
            </label>
          <input
            type="text"
            id="MRNo"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            value={formData.MRNo}
            readOnly
          />
          <div className="w-full">
            <label className="capitalize flex font-semibold text-md py-1">
              Receipt Date:
            </label>

            <DatePicker
              selected={formData.MRDate}
              onChange={date =>
                setFormData({
                  ...formData,
                  MRDate: date.toISOString().split('T')[0],
                })
              }
              className="rounded-md"
            />
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Party Name:
            </label>

            <select
              name="PartyID"
              className="w-full rounded-md"
              onChange={e => {
                setFormData({
                  ...formData,
                  PartyID: e.target.value,
                });
              }}
              value={formData.PartyID}
              required
            >
              <option value=""></option>
              {allParties.data.length &&
                allParties.data.map(item => (
                  <option value={item.PartyID} key={item.PartyID}>
                    {item.PartyName}
                  </option>
                ))}
            </select>
          </div>
          <label
            htmlFor="AmountReceived"
            className="capitalize flex font-semibold text-md py-1"
          >
            Amount Received:
          </label>
          <input
            type="number"
            id="AmountReceived"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            onChange={event => {
              setFormData({
                ...formData,
                AmountReceived: event.target.value,
              });
            }}
            value={formData.AmountReceived}
          />
          <label
            htmlFor="InWord"
            className="capitalize flex font-semibold text-md py-1"
          >
            Amount In word:
          </label>
          <input
            type="text"
            id="InWord"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm capitalize"
            value={formData.InWord}
            readOnly
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Payment Method:
            </label>

            <select
              name="PaymentMethodID"
              className="w-full rounded-md"
              value={formData.PaymentMethodID}
              onChange={event => {
                setFormData({
                  ...formData,
                  PaymentMethodID: event.target.value,
                });
              }}
            >
              <option value="" disabled={true}></option>
              {paymentMethod.data.length &&
                paymentMethod.data.map(method => (
                  <option
                    value={method.PaymentMethodID}
                    key={method.PaymentMethodID}
                  >
                    {method.PMName}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Bank Name/ Purpose:
            </label>

            <select
              name="PaymentMethodDetailsID"
              className="w-full rounded-md"
              value={formData.PaymentMethodDetailsID}
              onChange={event => {
                setFormData({
                  ...formData,
                  PaymentMethodDetailsID: event.target.value,
                });
              }}
              disabled={formData.PaymentMethodID ? false : true}
            >
              <option value="" disabled={true}></option>
              {methodDetail.length &&
                methodDetail.map(method => (
                  <option
                    value={method.PaymentMethodDetailsID}
                    key={method.PaymentMethodDetailsID}
                  >
                    {method.PMDName}
                  </option>
                ))}
            </select>
          </div>
          <div>
          {formData.PaymentMethodID == 1 && formData.PaymentMethodDetailsID == 5 && <>
            <label className="capitalize flex font-semibold text-md py-1">
              Remarks:
            </label>
            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm capitalize"
            value={remarks}
            onChange={event => setRemarks(event.target.value)}
            required
          />
          </>}
          {formData.PaymentMethodID == 4 && <>
            <div className="flex gap-2">
              <div>
              <label className="capitalize flex font-semibold text-md py-1">
              Account Name:
            </label>
            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm capitalize"
            value={chqDetails.AccName}
            onChange={event => setChqDetails(prevData =>({
              ...prevData,
              AccName: event.target.value
            }))}
            required
          />
              </div>
              <div>
              <label className="capitalize flex font-semibold text-md py-1">
              Account Number:
            </label>
            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm capitalize"
            value={chqDetails.AccNumber}
            onChange={event => setChqDetails(prevData =>({
              ...prevData,
              AccNumber: event.target.value
            }))}
            required
          />
              </div>
              <div>
              <label className="capitalize flex font-semibold text-md py-1">
              Cheque Number:
            </label>
            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm capitalize"
            value={chqDetails.ChequeNumber}
            onChange={event => setChqDetails(prevData =>({
              ...prevData,
              ChequeNumber: event.target.value
            }))}
            required
          />
              </div>
            </div>
          </>}
            
          </div>
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              Save Money Receipt
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
