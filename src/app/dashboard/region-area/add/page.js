'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const LocationImput = ({ name, label, handleChange, value }) => {
  return (
    <div>
      <label
        htmlFor="PlaceImput"
        className="block text-md font-bold mb-1 mt-1 text-semibold"
      >
        {label}
      </label>
      <input
        type="text"
        id="PlaceImput"
        className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
        name={name}
        onChange={handleChange}
        value={value}
        required
      />
    </div>
  );
};

const DisplayDivisionList = ({ handleChange, formData }) => {
  const { status, data } = useGetData(
    '?action=get_regionDivision'
  );
  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">
        Select Divison:
      </label>
      <select
        className="w-full rounded-md"
        name="division"
        defaultValue=""
        onChange={handleChange}
        value={formData.division}
      >
        <option value="" disabled></option>
        {data.length &&
          data.map(item => (
            <option value={item.RegionID} key={item.RegionID}>
              {item.RegionName}
            </option>
          ))}
      </select>
    </div>
  );
};

const DisplayDistrictList = ({ handleChange, formData, id }) => {
  const { status, data } = useGetData(
    `?action=get_regionDistrict&ParentRegionID=${id}`
  );
  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">
        Select District:
      </label>
      <select
        className="w-full rounded-md"
        name="district"
        defaultValue=""
        onChange={handleChange}
        value={formData.district}
      >
        <option value="" disabled></option>
        {data.length &&
          data.map(item => (
            <option value={item.RegionID} key={item.RegionID}>
              {item.RegionName}
            </option>
          ))}
      </select>
    </div>
  );
};

const DisplayThanaList = ({ handleChange, formData, id }) => {
  const { status, data } = useGetData(
    `?action=get_regionThana&ParentRegionID=${id}`
  );

  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">
        Select Thana:
      </label>
      <select
        className="w-full rounded-md"
        name="thana"
        defaultValue=""
        onChange={handleChange}
        value={formData.thana}
      >
        <option value="" disabled></option>
        {data.length &&
          data.map(item => (
            <option value={item.RegionID} key={item.RegionID}>
              {item.RegionName}
            </option>
          ))}
      </select>
    </div>
  );
};

const page = () => {
  const router = useRouter();
  const [baseData, setBaseData] = useState();
  const [conditionCase, setConditionCase] = useState('');

  const [formData, setFormData] = useState({
    regionType: '',
    division: '',
    district: '',
    thana: '',
    area: '',
  });

  const { regionType } = formData;

  const { status, data } = useGetData(
    '?action=get_regiontype1'
  );

  useEffect(() => {
    if (baseData) {
      const dataWillbeUseConditioning = data.filter(
        item => item.id === Number(baseData)
      )[0].CategoryName;
      setConditionCase(dataWillbeUseConditioning);
    }
  }, [baseData]);

  useEffect(() => {
    setFormData({
      regionType: formData.regionType,
      division: '',
      district: '',
      thana: '',
      area: '',
    });
  }, [regionType]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let sumbitAbleData = {};
    if (conditionCase === 'Division') {
      sumbitAbleData.RegionTypeID = formData.regionType;
      sumbitAbleData.ParentRegionID = data.filter(
        item => item.CategoryName === 'Bangladesh'
      )[0].id;
      sumbitAbleData.RegionName = formData.division;
    } else if (conditionCase === 'District') {
      sumbitAbleData.RegionTypeID = formData.regionType;
      sumbitAbleData.ParentRegionID = formData.division;
      sumbitAbleData.RegionName = formData.district;
    } else if (conditionCase === 'Thana') {
      sumbitAbleData.RegionTypeID = formData.regionType;
      sumbitAbleData.ParentRegionID = formData.district;
      sumbitAbleData.RegionName = formData.thana;
    } else if (conditionCase === 'Area') {
      sumbitAbleData.RegionTypeID = formData.regionType;
      sumbitAbleData.ParentRegionID = formData.thana;
      sumbitAbleData.RegionName = formData.area;
    } else {
      sumbitAbleData = null;
    }

    if (sumbitAbleData) {
      const res = await Axios.post(
        '?action=create_region',
        sumbitAbleData
      );
      if (res.status === 200) {
        router.push('/dashboard/region-area');
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Region management</h1>
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
        <h2 className="text-lg font-semibold mb-2 capitalize">
          add new Region
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Select The Type You Want To Add:
            </label>
            <select
              className="w-full rounded-md"
              name="regionType"
              defaultValue=""
              onChange={e => {
                setBaseData(e.target.value);
                handleChange(e);
              }}
              value={formData.regionType}
            >
              <option value="" disabled></option>
              {data.length &&
                data.map(item => (
                  <option
                    value={item.id}
                    key={item.id}
                    disabled={item.CategoryName === 'Bangladesh'}
                  >
                    {item.CategoryName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            {conditionCase && conditionCase === 'Division' ? (
              <LocationImput
                name="division"
                label="Enter The Division Name:"
                handleChange={handleChange}
                value={formData.division}
              />
            ) : conditionCase === 'District' ? (
              <div>
                <DisplayDivisionList
                  handleChange={handleChange}
                  formData={formData}
                />
                {formData.division && (
                  <LocationImput
                    name="district"
                    label="Enter The District Name:"
                    handleChange={handleChange}
                    value={formData.district}
                  />
                )}
              </div>
            ) :  conditionCase === 'Area' ? (
              <div>
                <DisplayDivisionList
                  handleChange={handleChange}
                  formData={formData}
                />
                {formData.division && (
                  <DisplayDistrictList
                    handleChange={handleChange}
                    formData={formData}
                    id={formData.division}
                  />
                )}
                {formData.district && (
                  <DisplayThanaList
                    handleChange={handleChange}
                    formData={formData}
                    id={formData.district}
                  />
                )}
                {formData.thana && (
                  <LocationImput
                    name="area"
                    label="Enter The Area Name:"
                    handleChange={handleChange}
                    value={formData.area}
                  />
                )}
              </div>
            ) : conditionCase === 'Thana' ? (
              <div>
                <DisplayDivisionList
                  handleChange={handleChange}
                  formData={formData}
                />
                {formData.division && (
                  <DisplayDistrictList
                    handleChange={handleChange}
                    formData={formData}
                    id={formData.division}
                  />
                )}
                {formData.district && (
                  <LocationImput
                    name="thana"
                    label="Enter The Thana Name:"
                    handleChange={handleChange}
                    value={formData.thana}
                  />
                )}
              </div>
            ) :(
              ''
            )}
          </div>

          <div className="mt-5" type="submit">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              save region-type
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
