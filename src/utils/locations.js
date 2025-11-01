import axios from 'axios';
import Axios from './axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getAllDivision = async () => {
  const res = await Axios.get(
    `?action=get_regionDivision`
  );
  return res.data;
};

export const getDistrict = async id => {
  const res = await Axios.get(
    `?action=get_regionDistrict&ParentRegionID=${id}`
  );
  return res.data;
};

export const getThana = async id => {
  const res = await Axios.get(
    `?action=get_regionThana&ParentRegionID=${id}`
  );
  return res.data;
};
