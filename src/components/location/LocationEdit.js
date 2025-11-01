import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const LocationEdit = ({ updateState, regionId = '', division }) => {
  const [locationID, setLocationID] = useState({
    divisionID: '',
    districtID: '',
    thanaID: '',
    areaID: '',
  });
  const { status, data } = division;

  async function getPrevLocation() {
    if (regionId) {
      const res = await Axios.get(
        `?action=get_singlearealocation&RegionID=${regionId}`
      );
      if (res.data.data.length) {
        const locData = res.data.data[0];
        console.log(locData);
        setLocationID({
          ...locationID,
          divisionID: locData.DivisionID,
          districtID: locData.DistrictID,
          thanaID: locData.ThanaID,
          areaID: locData.AreaID,
        });
      }
    }
  }

  useEffect(() => {
    getPrevLocation();
  }, [data]);

  const [district, setDistrict] = useState([]);
  const [thana, setThana] = useState([]);
  const [area, setArea] = useState([]);

  const getLocationData = async (url, id, cb) => {
    const res = await Axios.get(`${url}${id}`);
    cb([...res.data]);
  };

  useEffect(() => {
    if (locationID.divisionID) {
      getLocationData(
        '?action=get_regionDistrict&ParentRegionID=',
        locationID.divisionID,
        setDistrict
      );
    }
  }, [locationID.divisionID]);

  useEffect(() => {
    if (locationID.districtID) {
      getLocationData(
        '?action=get_regionThana&ParentRegionID=',
        locationID.districtID,
        setThana
      );
    }
  }, [locationID.districtID]);

  useEffect(() => {
    if (locationID.thanaID) {
      getLocationData(
        '?action=get_regionArea&ParentRegionID=',
        locationID.thanaID,
        setArea
      );
    }
  }, [locationID.thanaID]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {/* Division */}
        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="Division">
            Division:
          </label>
          <select
            className="w-full rounded-md"
            id="Division"
            name="division"
            value={locationID.divisionID}
            onChange={e => {
              setLocationID({
                ...locationID,
                divisionID: e.target.value,
                districtID: '',
                thanaID: '',
                areaID: '',
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

        {/* District */}
        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="District">
            District:
          </label>
          <select
            id="District"
            name="District"
            className="w-full rounded-md"
            value={locationID.districtID}
            onChange={e => {
              setLocationID({
                ...locationID,
                districtID: e.target.value,
                thanaID: '',
                areaID: '',
              });
            }}
            disabled={!locationID.divisionID}
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

        {/* Area (moved up before Thana) */}
        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="Area">
            Area:
          </label>
          <select
            id="Area"
            name="Area"
            className="w-full rounded-md"
            value={locationID.areaID}
            onChange={e => {
              setLocationID({
                ...locationID,
                areaID: e.target.value,
              });
              updateState(e.target.value);
            }}
            disabled={!locationID.thanaID}
          >
            <option value="" disabled={true} selected></option>
            {area.length &&
              area.map(item => (
                <option value={item.RegionID} key={item.RegionID}>
                  {item.RegionName}
                </option>
              ))}
          </select>
        </div>

        {/* Thana (moved down) */}
        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="Thana">
            Thana:
          </label>
          <select
            id="Thana"
            name="Thana"
            className="w-full rounded-md"
            value={locationID.thanaID}
            onChange={e => {
              setLocationID({
                ...locationID,
                thanaID: e.target.value,
                areaID: '',
              });
            }}
            disabled={!locationID.districtID}
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
    </>
  );
};

export default LocationEdit;

