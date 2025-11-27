import { useState, useEffect } from 'react';
import Axios from '@/utils/axios';
import FormSelect from '../fromField/FormSelect';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RetailerById = ({ partyID ,setFormData,fromData, allRetailers, setAllRetailers}) => {
  const getRetailerById = async (partyID) => {
    if (!partyID) {
      return;
    }
    const res = await Axios.get(
      `?action=get_Retailers&PartyID=${partyID}`
    );
    console.log(res?.data);
    setAllRetailers((res?.data?.retailers));
  };

  useEffect(() => {
    if (!partyID) {
      return;
    }
    getRetailerById(partyID);
  }, [partyID, allRetailers]);

  return (
    
    <FormSelect
       onChange={event => setFormData({...fromData, OutletID:event.target.value})}
       disabled={partyID ? false : true}
      required={false}
      labelKey="RetailerName"
      valueKey="RetailerID"
      options={allRetailers}
      placeholder='Retailer name'
    />

  );
};

export default RetailerById;
