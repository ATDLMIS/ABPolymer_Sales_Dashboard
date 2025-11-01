'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MappedViewList from '../dashboard/mappingInternals/MappedViewList';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Mapping = () => {
  const [land, setLand] = useState('first');
  // user start
  const [userType, setUserType] = useState('');
  const [rsmData, setRsmData] = useState([]);
  const [dsmData, setDsmData] = useState([]);
  const [asmData, setAsmData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [selectedRsm, setSelectedRsm] = useState('');
  const [selectedDsm, setSelectedDsm] = useState('');
  const [selectedAsm, setSelectedAsm] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  //   user end

  //   location start

  const [locationType, setLocationType] = useState('');
  const [divisionData, setDivisionData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [thanaData, setThanaData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [location, setLocation] = useState([]);

  // location end

  // user start
  const getRsmData = async () => {
    const res = await Axios.get(
      '?action=get_userview&PDesignationID=1515'
    );
    setRsmData(res.data.data);
  };

  const getDsmData = async () => {
    const res = await Axios.get(
      `?action=get_userview&PDesignationID=${selectedRsm}`
    );
    setDsmData(res.data.data);
  };

  const getAsmData = async () => {
    const res = await Axios.get(
      `?action=get_userview&PDesignationID=${selectedDsm}`
    );
    setAsmData(res.data.data);
  };

  const getOtherData = async () => {
    const res = await Axios.get(
      `?action=get_userview&PDesignationID=${selectedAsm}`
    );
    setOtherData(res.data.data);
  };

  useEffect(() => {
    if (userType) {
      getRsmData();
    }
  }, [userType]);

  useEffect(() => {
    if (selectedRsm) {
      getDsmData();
    }
  }, [selectedRsm]);

  useEffect(() => {
    if (selectedDsm) {
      getAsmData();
    }
  }, [selectedDsm]);

  useEffect(() => {
    if (selectedAsm) {
      getOtherData();
    }
  }, [selectedAsm]);

  // user end

  //   location start

  const getDivisionData = async () => {
    const res = await Axios.get(
      '?action=get_regionDivision'
    );
    setDivisionData(res.data);
  };

  const getDistrictData = async () => {
    const res = await Axios.get(
      `?action=get_regionDistrict&ParentRegionID=${selectedDivision}`
    );
    setDistrictData(res.data);
  };

  const getThanaData = async () => {
    const res = await Axios.get(
      `?action=get_regionThana&ParentRegionID=${selectedDistrict}`
    );
    setThanaData(res.data);
  };

  const getZoneData = async () => {
    const res = await Axios.get(
      `?action=get_regionArea&ParentRegionID=${selectedThana}`
    );
    setZoneData(res.data);
  };

  useEffect(() => {
    if (locationType) {
      getDivisionData();
    }
  }, [locationType]);

  useEffect(() => {
    if (selectedDivision) {
      getDistrictData();
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      getThanaData();
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedThana) {
      getZoneData();
    }
  }, [selectedThana]);

  const router = useRouter();

  const handleAssign = async () => {
    if (!location.length) {
      return;
    }
    const dataWillBeSubmit = location.map(item => {
      return {
        UserID: employeeData.UserID,
        RegionID: item,
      };
    });
    const res = await Axios.post(
      '?action=create_mapping',
      dataWillBeSubmit
    );
    router.push('/dashboard/mapping');
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Mapping Employee Vs Region</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      {land === 'first' ? (
        <div>
          <h2 className="text-center font-semibold text-xl py-3 capitalize">
            select the employee type
          </h2>
          <div className="max-w-md mx-auto mt-3">
            <select
              name="RSM"
              className="w-full rounded-md"
              value={userType}
              onChange={event => {
                setUserType(event.target.value);
                setEmployeeData(null);
                setSelectedRsm('');
                setSelectedDsm('');
                setSelectedAsm('');
              }}
            >
              <option value="" disabled>
                Choose Employee Type
              </option>
              <option value="rsm">RSM</option>
              <option value="dsm">DSM</option>
              <option value="asm">ASM</option>
              <option value="zsm">ZSM</option>
            </select>
          </div>
          {userType && (
            <div className="max-w-md mx-auto">
              {userType === 'rsm' ? (
                <div>
                  <h1 className="capitalize py-2 pl-2 font-semibold">
                    List of the Employee:
                  </h1>
                  {rsmData.length &&
                    rsmData.map(item => (
                      <div key={item.UserID}>
                        <label>
                          <input
                            type="checkbox"
                            value={item}
                            checked={
                              employeeData && employeeData.UserID == item.UserID
                            }
                            onChange={e => {
                              setEmployeeData(item);
                            }}
                            className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {item.EmpName}
                        </label>
                      </div>
                    ))}
                </div>
              ) : userType === 'dsm' ? (
                <div>
                  {rsmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="RSM"
                          className="w-full rounded-md"
                          value={selectedRsm}
                          onChange={event => {
                            setSelectedRsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select RSM
                          </option>
                          {rsmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedRsm && dsmData.length && (
                    <h1 className="capitalize py-2 pl-2 font-semibold">
                      List of the Employee:
                    </h1>
                  )}
                  {selectedRsm &&
                    dsmData.length &&
                    dsmData.map(item => (
                      <div key={item.UserID}>
                        <label>
                          <input
                            type="checkbox"
                            value={item}
                            checked={
                              employeeData && employeeData.UserID == item.UserID
                            }
                            onChange={e => {
                              setEmployeeData(item);
                            }}
                            className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {item.EmpName}
                        </label>
                      </div>
                    ))}
                </div>
              ) : userType === 'asm' ? (
                <div>
                  {rsmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="RSM"
                          className="w-full rounded-md"
                          value={selectedRsm}
                          onChange={event => {
                            setSelectedRsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select RSM
                          </option>
                          {rsmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedRsm && dsmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="DSM"
                          className="w-full rounded-md"
                          value={selectedDsm}
                          onChange={event => {
                            setSelectedDsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select DSM
                          </option>
                          {dsmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedDsm && asmData.length && (
                    <h1 className="capitalize py-2 pl-2 font-semibold">
                      List of the Employee:
                    </h1>
                  )}
                  {selectedDsm &&
                    asmData.length &&
                    asmData.map(item => (
                      <div key={item.UserID}>
                        <label>
                          <input
                            type="checkbox"
                            value={item}
                            checked={
                              employeeData && employeeData.UserID == item.UserID
                            }
                            onChange={e => {
                              setEmployeeData(item);
                            }}
                            className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {item.EmpName}
                        </label>
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  {rsmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="RSM"
                          className="w-full rounded-md"
                          value={selectedRsm}
                          onChange={event => {
                            setSelectedRsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select RSM
                          </option>
                          {rsmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedRsm && dsmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="DSM"
                          className="w-full rounded-md"
                          value={selectedDsm}
                          onChange={event => {
                            setSelectedDsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select DSM
                          </option>
                          {dsmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedDsm && asmData.length && (
                    <div>
                      <div className="max-w-md mx-auto mt-3">
                        <select
                          name="ASM"
                          className="w-full rounded-md"
                          value={selectedAsm}
                          onChange={event => {
                            setSelectedAsm(event.target.value);
                            setEmployeeData(null);
                          }}
                        >
                          <option value="" disabled>
                            Select ASM
                          </option>
                          {asmData.map(item => (
                            <option
                              value={item.DesignationID}
                              key={item.UserID}
                            >
                              {item.EmpName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedAsm && otherData.length && (
                    <h1 className="capitalize py-2 pl-2 font-semibold">
                      List of the Employee:
                    </h1>
                  )}
                  {selectedAsm &&
                    otherData.length &&
                    otherData.map(item => (
                      <div key={item.UserID}>
                        <label>
                          <input
                            type="checkbox"
                            value={item}
                            checked={
                              employeeData && employeeData.UserID == item.UserID
                            }
                            onChange={e => {
                              setEmployeeData(item);
                            }}
                            className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {item.EmpName}
                        </label>
                      </div>
                    ))}
                </div>
              )}
              <div className="flex justify-end pt-6">
                <button
                  className="px-6 py-1 bg-primary1 text-lg text-white rounded-md"
                  disabled={employeeData ? false : true}
                  onClick={() => {
                    setLand('area');
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="max-w-md mx-auto mt-3 bg-gray-200 py-3 px-3 rounded-md">
            <h1 className="font-semibold">{employeeData.EmpName}</h1>
            <h1>{employeeData.Designation}</h1>
            <h1>will be assign</h1>
          </div>
          <h2 className="text-center font-semibold text-xl py-3 capitalize">
            select the Location type
          </h2>
          <div className="max-w-md mx-auto mt-3">
            <select
              name="RSM"
              className="w-full rounded-md"
              value={locationType}
              onChange={event => {
                setLocationType(event.target.value);
                setLocation([]);
              }}
            >
              <option value="" disabled>
                Choose Location Type
              </option>
              <option value="division">Division</option>
              <option value="district">District</option>
              <option value="thana">Thana</option>
              <option value="zone">Zone</option>
            </select>
          </div>
          {locationType && (
            <div className="max-w-md mx-auto">
              {locationType === 'division' ? (
                <div>
                  <h1 className="capitalize py-2 pl-2 font-semibold">
                    List of the Region:
                  </h1>
                  {divisionData.length &&
                    divisionData.map(item => (
                      <div key={item.RegionID}>
                        <label>
                          <input
                            type="checkbox"
                            value={item.RegionID}
                            checked={location.includes(item.RegionID)}
                            onChange={e => {
                              if (location.includes(item.RegionID)) {
                                setLocation(
                                  location.filter(ele => ele != item.RegionID)
                                );
                              } else {
                                setLocation([
                                  ...location,
                                  Number(e.target.value),
                                ]);
                              }
                            }}
                            className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {item.RegionName}
                        </label>
                      </div>
                    ))}
                </div>
              ) : locationType === 'district' ? (
                <div>
                  <div className="max-w-md mx-auto mt-3">
                    <select
                      name="Division"
                      className="w-full rounded-md"
                      value={selectedDivision}
                      onChange={event => {
                        setSelectedDivision(event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Division
                      </option>
                      {divisionData.map(item => (
                        <option value={item.RegionID} key={item.RegionID}>
                          {item.RegionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDivision && districtData.length && (
                    <div>
                      <h1 className="capitalize py-2 pl-2 font-semibold">
                        List of the District:
                      </h1>
                      {districtData.map(item => (
                        <div key={item.RegionID}>
                          <label>
                            <input
                              type="checkbox"
                              value={item.RegionID}
                              checked={location.includes(item.RegionID)}
                              onChange={e => {
                                if (location.includes(item.RegionID)) {
                                  setLocation(
                                    location.filter(ele => ele != item.RegionID)
                                  );
                                } else {
                                  setLocation([
                                    ...location,
                                    Number(e.target.value),
                                  ]);
                                }
                              }}
                              className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            {item.RegionName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : locationType === 'thana' ? (
                <div>
                  <div className="max-w-md mx-auto mt-3">
                    <select
                      name="Division"
                      className="w-full rounded-md"
                      value={selectedDivision}
                      onChange={event => {
                        setSelectedDivision(event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Division
                      </option>
                      {divisionData.map(item => (
                        <option value={item.RegionID} key={item.RegionID}>
                          {item.RegionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDivision && districtData.length && (
                    <div className="max-w-md mx-auto mt-3">
                      <select
                        name="Division"
                        className="w-full rounded-md"
                        value={selectedDistrict}
                        onChange={event => {
                          setSelectedDistrict(event.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {districtData.map(item => (
                          <option value={item.RegionID} key={item.RegionID}>
                            {item.RegionName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedDistrict && thanaData.length && (
                    <div>
                      <h1 className="capitalize py-2 pl-2 font-semibold">
                        List of the Thana:
                      </h1>
                      {thanaData.map(item => (
                        <div key={item.RegionID}>
                          <label>
                            <input
                              type="checkbox"
                              value={item.RegionID}
                              checked={location.includes(item.RegionID)}
                              onChange={e => {
                                if (location.includes(item.RegionID)) {
                                  setLocation(
                                    location.filter(ele => ele != item.RegionID)
                                  );
                                } else {
                                  setLocation([
                                    ...location,
                                    Number(e.target.value),
                                  ]);
                                }
                              }}
                              className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            {item.RegionName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="max-w-md mx-auto mt-3">
                    <select
                      name="Division"
                      className="w-full rounded-md"
                      value={selectedDivision}
                      onChange={event => {
                        setSelectedDivision(event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Division
                      </option>
                      {divisionData.map(item => (
                        <option value={item.RegionID} key={item.RegionID}>
                          {item.RegionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDivision && districtData.length && (
                    <div className="max-w-md mx-auto mt-3">
                      <select
                        name="Division"
                        className="w-full rounded-md"
                        value={selectedDistrict}
                        onChange={event => {
                          setSelectedDistrict(event.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {districtData.map(item => (
                          <option value={item.RegionID} key={item.RegionID}>
                            {item.RegionName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedDistrict && thanaData.length && (
                    <div className="max-w-md mx-auto mt-3">
                      <select
                        name="Division"
                        className="w-full rounded-md"
                        value={selectedThana}
                        onChange={event => {
                          setSelectedThana(event.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select Thana
                        </option>
                        {thanaData.map(item => (
                          <option value={item.RegionID} key={item.RegionID}>
                            {item.RegionName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedThana && zoneData.length && (
                    <div>
                      <h1 className="capitalize py-2 pl-2 font-semibold">
                        List of the Zone:
                      </h1>
                      {zoneData.map(item => (
                        <div key={item.RegionID}>
                          <label>
                            <input
                              type="checkbox"
                              value={item.RegionID}
                              checked={location.includes(item.RegionID)}
                              onChange={e => {
                                if (location.includes(item.RegionID)) {
                                  setLocation(
                                    location.filter(ele => ele != item.RegionID)
                                  );
                                } else {
                                  setLocation([
                                    ...location,
                                    Number(e.target.value),
                                  ]);
                                }
                              }}
                              className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            {item.RegionName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end pt-6">
            <button
              className="px-6 py-1 bg-primary1 text-lg text-white rounded-md"
              onClick={handleAssign}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapping;
