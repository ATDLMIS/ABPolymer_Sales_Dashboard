import { useEffect, useState } from 'react';
import useGetData from '@/utils/useGetData';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Location = ({ formData, setFormData }) => {
  const [locations, setLocations] = useState({
    division: '',
    district: '',
    thana: '',
  });
  const [district, setDistrict] = useState([]);
  const [thana, setThana] = useState([]);
  const { status, data } = useGetData(
    '?action=get_regionDivision'
  );

  const regions = useGetData(
    '?action=get_regions'
  );

  useEffect(() => {
    const filteredItem = regions.data.filter(
      item => item.AreaID === formData.RegionID
    );
    console.log(filteredItem);
  }, [regions]);

  const getLocationData = async (url, id, cb) => {
    const res = await Axios.get(`${url}${id}`);
    cb([...res.data]);
  };

  useEffect(() => {
    if (locations.division) {
      getLocationData(
        '?action=get_regionDistrict&ParentRegionID=',
        locations.division,
        setDistrict
      );
    }
  }, [locations.division]);

  useEffect(() => {
    if (locations.district) {
      getLocationData(
        '?action=get_regionThana&ParentRegionID=',
        locations.district,
        setThana
      );
    }
  }, [locations.district]);

  if (status === 'pending') {
    <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="Division">
          Region:
        </label>
        <select
          className="w-full rounded-md"
          id="Division"
          name="division"
          onChange={e => {
            setLocations({
              ...locations,
              division: e.target.value,
            });
          }}
        >
          <option value="" disabled={true} selected></option>
          {data.length &&
            data.map(item => (
              <option value={item.RegionID} key={item.RegionID}>
                {item.RegionName}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="District">
          Base:
        </label>
        <select
          id="District"
          name="District"
          className="w-full rounded-md"
          value={formData.thana}
          onChange={e => {
            setLocations({
              ...locations,
              district: e.target.value,
            });
          }}
          disabled={locations.division ? false : true}
        >
          <option value="" disabled={true} selected></option>
          {district.length &&
            district.map(item => (
              <option value={item.RegionID} key={item.RegionID}>
                {item.RegionName}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="Thana">
          District:
        </label>
        <select
          id="Thana"
          name="Thana"
          className="w-full rounded-md"
          onChange={e => {
            setLocations({
              ...locations,
              thana: e.target.value,
            });
            setFormData({
              ...formData,
              RegionID: e.target.value,
            });
          }}
          disabled={locations.district ? false : true}
        >
          <option value="" disabled={true} selected></option>
          {thana.length &&
            thana.map(item => (
              <option value={item.RegionID} key={item.RegionID}>
                {item.RegionName}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Location;
