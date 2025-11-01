'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useGetData from '@/utils/useGetData';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Locations from '@/components/location/Locations';
import { useSession } from "next-auth/react"
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const { data: session, status } = useSession()

  console.log(session)
  const classInfo = useGetData(
    '?action=get_bookscategorys'
  );
  const subjectInfo = useGetData(
    '?action=get_productcategorywise&Categoryid=176'
  );

  const institution = useGetData(
    '?action=get_institutiontypes'
  );

  const [formData, setFormData] = useState({
    institutionType: '',
    institutionName: '',
    eiinNo: '',
    totalStudent: '',
    contactPersonName: '',
    designation: '',
    phone: '',
    address: '',
    regionArea: '',
    institutionImage: '',
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

    // Create FormData object
    let dataWillBeSubmit = new FormData();
    dataWillBeSubmit.append('institutionName', formData.institutionName);
    dataWillBeSubmit.append('EIINNo', formData.eiinNo);
    dataWillBeSubmit.append('institutionTypeID', formData.institutionType);
    dataWillBeSubmit.append('RegionID', formData.regionArea);
    if(session.user){
      dataWillBeSubmit.append('UserID', session.user.id);
    }
    dataWillBeSubmit.append('RegionID', formData.regionArea);
    if (formData.totalStudent) {
      dataWillBeSubmit.append('TotalStudents', formData.totalStudent);
    }
    if (formData.contactPersonName) {
      dataWillBeSubmit.append('ContactPersonName', formData.contactPersonName);
    }
    if (formData.designation) {
      dataWillBeSubmit.append('Designation', formData.designation);
    }
    if (formData.phone) {
      dataWillBeSubmit.append('ContactPhone', formData.phone);
    }
    if (formData.address) {
      dataWillBeSubmit.append('Address', formData.address);
    }

    // Handle institution image
    if (formData.institutionImage) {
      dataWillBeSubmit.append(
        'InstitutionScanImage',
        formData.institutionImage,
        formData.institutionImage.name
      );
    }

    // Append teacher details dynamically
    formData.teachers.forEach((teacher, index) => {
      dataWillBeSubmit.append(
        `details[${index}][TeacherName]`,
        teacher.teacherName
      );
      dataWillBeSubmit.append(
        `details[${index}][Designation]`,
        teacher.designation
      );
      dataWillBeSubmit.append(`details[${index}][ContactPhone]`, teacher.phone);
      dataWillBeSubmit.append(
        `details[${index}][sndClassID]`,
        teacher.classNameInfo
      );
      dataWillBeSubmit.append(
        `details[${index}][sndSubjectID]`,
        teacher.subjectName
      );
    });

    // Use axios for the POST request
    const res = await Axios.post(
      '?action=create_institution',
      dataWillBeSubmit,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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
          add new Institution
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
              required
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
            required
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
          <Locations
            updateState={(key, value) =>
              setFormData(prevState => ({
                ...prevState,
                [key]: value,
              }))
            }
            fieldKey="regionArea"
          />

          <div>
            <label
              className="capitalize flex font-semibold text-md py-1"
              htmlFor="InstitutionImage"
            >
              Institution Image:
            </label>
            <div className="border-[1px] border-[#6b7280] p-1 rounded-md bg-white">
              <input
                id="InstitutionImage"
                type="file"
                name="institutionImage"
                className="w-full rounded-md mb-1"
                onChange={e => {
                  const file = e.target.files[0];
                  setFormData({ ...formData, institutionImage: file });
                }}
              />
            </div>
          </div>
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
                            <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="teacherName"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={formData.teachers.teacherName}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="designation"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={formData.teachers.designation}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                              <input
                                type="text"
                                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                                name="phone"
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={formData.teachers.phone}
                              />
                            </td>

                            <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                              <select
                                name="classNameInfo"
                                className="w-full rounded-md"
                                defaultValue=""
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={formData.teachers.classNameInfo}
                              >
                                <option value="" disabled={true}></option>
                                {classInfo.data.length &&
                                  classInfo.data.map(item => (
                                    <option value={item.ID} key={item.ID}>
                                      {item.CategoryName}
                                    </option>
                                  ))}
                              </select>
                            </td>
                            <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium ">
                              <select
                                name="subjectName"
                                className="w-full rounded-md"
                                defaultValue=""
                                onChange={event =>
                                  updateTeacher(event, item.id)
                                }
                                value={formData.teachers.subjectName}
                              >
                                <option value="" disabled={true}></option>
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
              Save Institution
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
