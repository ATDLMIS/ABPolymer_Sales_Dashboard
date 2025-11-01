import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import BookByIdV2 from './BookGroupIdV2';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const SpecimanPurpose = ({speciPurpose, setSpeciPurpose, InstitutionID}) => {
    const teachersData = useGetData(
        `?action=get_institutionTeacher&InstitutionID=${InstitutionID}`
      );
      const fiscalYear = useGetData(
        '?action=get_financialyear'
      );
      const bookGroups = useGetData(
        '?action=get_bookscategorys'
      );
      const getSpecimanQty = async (fId, pId, itemId)=>{
        const res = await Axios.get(`?action=get_productSpecimenQty&FinancialYearID=${fId}&ProductID=${pId}&SpecimenUserID=501`)
        setSpeciPurpose(prevData=> prevData.map(data => data.id === itemId ? {...data, AvailableQTY: res.data.AvailQty} : data))
      }
      
      const updateOrderDetails =  (event, itemId) => {
        setSpeciPurpose(prevData => prevData.map(tData => tData.id === itemId ? {...tData, [event.target.name]: event.target.value} : tData));
      };
      const updateOrderDetailsV2 = fId => (event, itemId) => {
        setSpeciPurpose(prevData => prevData.map(tData => tData.id === itemId ? {...tData, [event.target.name]: event.target.value} : tData));
        getSpecimanQty(fId, event.target.value, itemId)
      };
  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full pt-5">
          <div className="overflow-x-scroll">
            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Teacher_Name
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
                    Mobile
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Financial_Year
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Books_Group
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Books_Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Student Count
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Available QTY.
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Speciman QTY.
                  </th>
                  
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {speciPurpose.length &&
                  speciPurpose.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.id}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        <select
                          id="TeacherName"
                          name="TeacherName"
                          className="w-full rounded-md py-[0.40rem]"
                          value={item.TeacherName}
                          onChange={(event) => {
                            const updateTeachersData = (tech, details) => {
                                  const selectedTeacher = tech.filter(
                                    item =>
                                      item.TeacherName == event.target.value
                                  );
                                  if (selectedTeacher.length) {
                                    return {
                                      ...details,
                                      TeacherName:
                                        selectedTeacher[0].TeacherName,
                                      Designation:
                                        selectedTeacher[0].Designation,
                                      ContactPhone:
                                        selectedTeacher[0].ContactPhone,
                                    };
                                  }
                                  return {
                                    ...details,
                                  };
                                };
                            setSpeciPurpose(prevData => prevData.map(tData => tData.id === item.id ? updateTeachersData(teachersData.data, tData) : tData ) )
                          }}
                        >
                          <option value="" disabled></option>
                          {teachersData.data.length &&
                            teachersData.data.map(teach => (
                              <option
                                value={teach.TeacherName}
                                key={teach.InstitutionDetailsID}
                              >
                                {teach.TeacherName}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.Designation}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ContactPhone}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <select
                          id="FinancialYearID"
                          name="FinancialYearID"
                          className="w-full rounded-md py-[0.40rem]"
                          value={item.FinancialYearID}
                          onChange={event => {
                            setSpeciPurpose(prevData => prevData.map(tData => tData.id === item.id ? {...tData, FinancialYearID: event.target.value} : tData))
                          }}
                        >
                          <option value="" disabled></option>
                          {fiscalYear.data.length &&
                            fiscalYear.data.map(item => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <select
                          name="BooksGroupID"
                          id="ProductCategoryID"
                          className="w-full rounded-md py-[0.40rem]"
                          value={item.BooksGroupID}
                          onChange={event => {
                            setSpeciPurpose(prevData => prevData.map(tData => tData.id === item.id ? {...tData, BooksGroupID: event.target.value} : tData))
                          }}
                        >
                          <option value="" disabled={true}></option>
                          {bookGroups.data.length &&
                            bookGroups.data.map(item => (
                              <option value={item.ID} key={item.ID}>
                                {item.CategoryName}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <BookByIdV2
                          name="ProductID"
                          item={item}
                          update={updateOrderDetailsV2(item.FinancialYearID)}
                        />
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <input
                          type="text"
                          name="StudentsCount"
                          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                          onChange={event => {
                            updateOrderDetails(event, item.id);
                          }}
                          value={item.StudentsCount}
                        />
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <input
                          type="text"
                          name="AvailableQTY"
                          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                          value={item.AvailableQTY}
                          readOnly
                        />
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <input
                          type="text"
                          name="SpecimanQTY"
                          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                          onChange={event => {
                            updateOrderDetails(event, item.id);
                          }}
                          value={item.SpecimanQTY}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                        <AiOutlineCloseCircle
                          className="text-4xl text-red-500 cursor-pointer"
                          onClick={() => {
                            setSpeciPurpose(prevData => prevData.filter(data => data.id != item.id));
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium "
                    colSpan="10"
                  >
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-green-300 text-md rounded-md px-4 py-2"
                        onClick={() => {
                          setSpeciPurpose(prevData =>[...prevData, {
                            id: uuidv4(),
                            TeacherName: '',
                            Designation: '',
                            ContactPhone: '',
                            FinancialYearID: '',
                            BooksGroupID: '',
                            ProductID: '',
                            StudentsCount: '',
                            AvailableQTY: '',
                            SpecimanQTY: ''
                          }])
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
  )
}

export default SpecimanPurpose