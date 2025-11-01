'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationEdit from '@/components/location/LocationEdit';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const InstitutionManagementEdit = ({ id }) => {
  const [formData, setFormData] = useState({
    institutionType: '',
    institutionName: '',
    totalStudent: '',
    contactPersonName: '',
    designation: '',
    phone: '',
    address: '',
    regionArea: '',
    status: '',
    teachers: [
      {
        id: uuidv4(),
        teacherName: '',
        designation: '',
        phone: '',
        classNameInfo: '',
        subjectName: '',
      },
    ],
  });

  const [newRegion, setNewRegion] = useState('');

  const division = useGetData(
    '?action=get_regionDivision'
  );

  const { status, data } = useGetData(
    `?action=get_institution&institutionID=${id}`
  );

  useEffect(() => {
    if (newRegion) {
      setFormData({
        ...formData,
        regionArea: newRegion,
      });
    }
  }, [newRegion]);

  useEffect(() => {
    if (data.InstitutionID) {
      setFormData({
        institutionType: data.InstitutionTypeID,
        institutionName: data.InstitutionName,
        eiinNo: data.EIINNo,
        totalStudent: data.TotalStudents,
        contactPersonName: data.ContactPersonName,
        designation: data.Designation,
        phone: data.ContactPhone,
        address: data.Address,
        regionArea: data.RegionID,
        status: data.status,
        teachers: data.details.length
          ? data.details.map(item => {
              return {
                id: uuidv4(),
                teacherName: item.TeacherName,
                designation: item.Designation,
                phone: item.ContactPhone,
                classNameInfo: item.sndClassID,
                subjectName: item.sndSubjectID,
              };
            })
          : {
              id: uuidv4(),
              teacherName: '',
              designation: '',
              phone: '',
              classNameInfo: '',
              subjectName: '',
            },
      });
    }
  }, [data]);

  const classInfo = useGetData(
    '?action=get_bookscategorys'
  );
  const subjectInfo = useGetData(
    '?action=get_productcategorywise&Categoryid=176'
  );
  const institution = useGetData(
    '?action=get_institutiontypes'
  );

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateTeacher = (event, itemId) => {
    setFormData({
      ...formData,
      teachers: formData.teachers.map(teacher =>
        teacher.id === itemId
          ? { ...teacher, [event.target.name]: event.target.value }
          : teacher
      ),
    });
  };

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    let dataWillBeSubmit = {
      institutionTypeID: formData.institutionType,
      institutionName: formData.institutionName,
      EIINNo: formData.eiinNo,
      ContactPersonName: formData.contactPersonName,
      TotalStudents: formData.totalStudent,
      Designation: formData.designation,
      ContactPhone: formData.phone,
      Address: formData.address,
      RegionID: formData.regionArea,
      details: [],
    };
    formData.teachers.forEach((teacher, index) => {
      let modifiedData = {
        TeacherName: teacher.teacherName,
        Designation: teacher.designation,
        ContactPhone: teacher.phone,
        sndClassID: teacher.classNameInfo,
        sndSubjectID: teacher.subjectName,
      };
      dataWillBeSubmit.details = [...dataWillBeSubmit.details, modifiedData];
    });

    const res = await Axios.put(
      `?action=update_institutionwithoutimage&institutionID=${id}`,
      dataWillBeSubmit
    );
    router.push('/dashboard/institution');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Institution Management</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="bg-gray-200 rounded-md px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          Update Institution
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Institution Type:
            </label>

            <select
              name="institutionType"
              className="w-full rounded-md"
              defaultValue=""
              onChange={handleChange}
              value={formData.institutionType}
            >
              <option value="" disabled={true} selected></option>
              {institution.data.length &&
                institution.data.map(item => (
                  <option value={item.ID} key={item.ID}>
                    {item.CategoryName}
                  </option>
                ))}
            </select>
          </div>
          <label
            htmlFor="InstitutionName"
            className="block text-sm font-bold mb-1"
          >
            Institution Name :
          </label>
          <input
            type="text"
            id="InstitutionName"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="institutionName"
            onChange={handleChange}
            value={formData.institutionName}
          />
          <label htmlFor="EiinNo" className="block text-sm font-bold mb-1">
            Institution EIIN number :
          </label>
          <input
            type="text"
            id="EiinNo"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="eiinNo"
            onChange={handleChange}
            value={formData.eiinNo}
            required
          />
          <label
            className="block text-sm font-bold mb-1"
            htmlFor="TotalStudent"
          >
            Total Students:
          </label>
          <input
            id="TotalStudent"
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="totalStudent"
            onChange={handleChange}
            value={formData.totalStudent}
          />
          <label
            className="block text-sm font-bold mb-1"
            htmlFor="ContactPersonName"
          >
            Contact Person Name:
          </label>
          <input
            id="ContactPersonName"
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="contactPersonName"
            onChange={handleChange}
            value={formData.contactPersonName}
          />
          <label className="block text-sm font-bold mb-1" htmlFor="Designation">
            Designation:
          </label>
          <input
            id="Designation"
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="designation"
            onChange={handleChange}
            value={formData.designation}
          />
          <label className="block text-sm font-bold mb-1" htmlFor="Phone">
            Phone:
          </label>
          <input
            id="Phone"
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
          />
          <label className="block text-sm font-bold mb-1" htmlFor="Address">
            Address:
          </label>
          <input
            id="Address"
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
            name="address"
            onChange={handleChange}
            value={formData.address}
          />
          {/* <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Region/Area:
            </label>

            <select
              name="regionArea"
              className="w-full rounded-md"
              defaultValue=""
              onChange={handleChange}
              value={formData.regionArea}
            >
              <option value="" disabled={true} selected></option>
              {regionsData.length &&
                regionsData.map(item => (
                  <option value={item.AreaID} key={item.AreaID}>
                    {item.AreaName}
                  </option>
                ))}
            </select>
          </div> */}

          {division.status !== 'pending' && (
            <LocationEdit
              updateState={setNewRegion}
              regionId={formData.regionArea}
              division={division}
            />
          )}

          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Status:
            </label>

            <select
              name="status"
              className="w-full rounded-md"
              value={formData.status}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="1">Active</option>
              <option value="0">Disable</option>
            </select>
          </div>
          {/* start */}

          <h2 className="text-lg font-semibold my-2 capitalize">
            add teachers
          </h2>

          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block max-w-full w-full pt-5">
                <div className="overflow-hidden">
                  <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr className="bg-text1 text-white">
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Teacher Name
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Designation
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Mobile Number
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Product Type
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Product Name
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.teachers.length &&
                        formData.teachers.map(item => (
                          <tr
                            className="border-b border-neutral-200 dark:border-white/10"
                            key={item.id}
                          >
                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="teacherName"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={item.teacherName}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="designation"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={item.designation}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="phone"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={item.phone}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              <select
                                name="classNameInfo"
                                className="w-full rounded-md"
                                defaultValue=""
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={item.classNameInfo}
                              >
                                <option
                                  value=""
                                  disabled={true}
                                  selected
                                ></option>
                                {classInfo.data.length &&
                                  classInfo.data.map(item => (
                                    <option value={item.ID} key={item.ID}>
                                      {item.CategoryName}
                                    </option>
                                  ))}
                              </select>
                            </td>
                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium ">
                              <select
                                name="subjectName"
                                className="w-full rounded-md"
                                defaultValue=""
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={item.subjectName}
                              >
                                <option
                                  value=""
                                  disabled={true}
                                  selected
                                ></option>
                                {subjectInfo.data.length &&
                                  subjectInfo.data.map(item => (
                                    <option
                                      value={item.ProductID}
                                      key={item.ProductID}
                                    >
                                      {item.ProductName}
                                    </option>
                                  ))}
                              </select>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                              <AiOutlineCloseCircle
                                className="text-4xl text-red-500 cursor-pointer"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    teachers: formData.teachers.filter(
                                      info => info.id !== item.id
                                    ),
                                  });
                                }}
                              />
                            </td>
                          </tr>
                        ))}

                      <tr>
                        <td
                          className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium "
                          colSpan="6"
                        >
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="bg-green-300 text-md rounded-md px-4 py-2"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  teachers: [
                                    ...formData.teachers,
                                    {
                                      id: uuidv4(),
                                      teacherName: '',
                                      designation: '',
                                      phone: '',
                                      classNameInfo: '',
                                      subjectName: '',
                                    },
                                  ],
                                });
                              }}
                            >
                              Add New Row
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="capitalize bg-primary1 px-5 py-1 text-white rounded-md"
              type="submit"
            >
              Update Institution
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InstitutionManagementEdit;
