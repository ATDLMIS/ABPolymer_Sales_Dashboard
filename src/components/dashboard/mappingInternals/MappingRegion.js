import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const MappingRegion = ({ mappingUser, setMappingUser }) => {
  const [allArea, setAllArea] = useState({
    division: '',
    district: '',
    thana: '',
    location: [],
  });

  const [district, setDistrict] = useState([]);
  const [thana, setThana] = useState([]);
  const [locations, setLocations] = useState([]);

  const { status, data } = useGetData(
    '?action=get_regionDivision'
  );

  const getUserDataById = async (url, id, cb) => {
    const res = await Axios.get(`${url}${id}`);
    cb(res.data);
  };


  const getlocations = async (url, id, cb) => {
    const res = await Axios.get(`${url}${id}`);
    cb(res.data);
  };

  useEffect(() => {
    if (allArea.division) {
      getUserDataById(
        `?action=get_regionDistrict&ParentRegionID=`,
        allArea.division,
        setDistrict
      );
    }
  }, [allArea.division]);

  useEffect(() => {
    if (allArea.district) {
      getUserDataById(
        `?action=get_regionThana&ParentRegionID=`,
        allArea.district,
        setThana
      );
    }
  }, [allArea.district]);

  useEffect(() => {
    if (allArea.thana) {
      getlocations(
        `?action=get_regionArea&ParentRegionID=`,
        allArea.thana,
        setLocations
      );
    }
  }, [allArea.thana]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label className="capitalize flex font-semibold text-md py-1">
          Region:
        </label>

        <select
          name="Division"
          className="w-full rounded-md"
          defaultValue=""
          onChange={e => {
            setAllArea({
              ...allArea,
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
        <label className="capitalize flex font-semibold text-md py-1">
          Base:
        </label>

        <select
          name="Division"
          className="w-full rounded-md"
          defaultValue=""
          onChange={e => {
            setAllArea({
              ...allArea,
              district: e.target.value,
            });
          }}
          disabled={district.length ? false : true}
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
        <label className="capitalize flex font-semibold text-md py-1">
          District:
        </label>

        <select
          name="Thana"
          className="w-full rounded-md"
          defaultValue=""
          onChange={e => {
            setAllArea({
              ...allArea,
              thana: e.target.value,
            });
          }}
          disabled={thana.length ? false : true}
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
      <div>
        <h1 className="text-lg font-semibold">List of the Location:</h1>
        <div>
          {locations.length > 0 &&
            locations.map(item => (
              <div key={item.RegionID}>
                <label>
                  <input
                    type="checkbox"
                    value={item.AreaID}
                    checked={allArea.location.includes(item.RegionID)}
                    onChange={() => {
                      if (allArea.location.includes(item.RegionID)) {
                        setAllArea({
                          ...allArea,
                          location: allArea.location.filter(
                            ele => ele !== item.RegionID
                          ),
                        });
                        setMappingUser({
                          ...mappingUser,
                          region: '',
                        });
                      } else {
                        setAllArea({
                          ...allArea,
                          location: [...allArea.location, item.RegionID],
                        });
                        setMappingUser({
                          ...mappingUser,
                          region: item.RegionID,
                        });
                      }
                    }}
                    className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {item.RegionName}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MappingRegion;
