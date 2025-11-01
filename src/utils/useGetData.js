import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Axios from './axios';

const useGetData = url => {
  const [resData, setResData] = useState({
    status: 'pending',
    data: [],
  });

  useEffect(() => {
     if(!url) return
    const getData = async () => {
     
    const res = await Axios.get(url);
    if (res.status === 200) {
      setResData({
        status: 'idle',
        data: res.data,
      });
    } else {
      setResData({
        status: 'error',
        data: [],
      });
    }
  };
    getData();
  }, [url]);

  
  

  return resData;
};

export default useGetData;
