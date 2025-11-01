'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useGetData from '@/utils/useGetData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookByIdV2 from '@/components/dashboard/BookGroupIdV2';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const [formData, setFormData] = useState({
    BDExpReqNo: '',
    BDExpUserID: '',
    BDExpReqDate: new Date().toISOString().split('T')[0],
    InstitutionTypeID: '',
    InstitutionID: '',
    TotalAmount: '',
    UserID: '',
    BDExpReqDetails: [
      {
        id: uuidv4(),
        TeacherName: '',
        Designation: '',
        ContactPhone: '',
        BooksGroupID: '',
        ProductID: '',
        StudentsCount: '',
        DonationAmount: '',
        FinancialYearID: '',
        Total: '',
      },
    ],
  });

  const [intName, setIntName] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fiscalYear = useGetData(
    '?action=get_financialyear'
  );
  const bookGroups = useGetData(
    '?action=get_bookscategorys'
  );

  console.log(formData);

  const getBDExpReqNo = async () => {
    const res = await Axios.post(
      '?action=generate_new_BDExpReq_number'
    );
    if (res.data.newBDExpReqNo) {
      setFormData({
        ...formData,
        BDExpReqNo: res.data.newBDExpReqNo,
      });
    }
  };

  useEffect(() => {
    const total = formData.BDExpReqDetails.reduce(
      (sum, item) => sum + Number(item.Total || 0),
      0
    );

    setFormData(prevState => ({
      ...prevState,
      TotalAmount: total,
    }));
  }, [formData.BDExpReqDetails]);

  useEffect(() => {
    getBDExpReqNo();
  }, []);

  const getInstutionName = async id => {
    const res = await Axios.get(
      `?action=get_institutionName&InstitutionTypeID=${id}`
    );
    if (res.data.length) {
      setIntName(res.data);
    }
  };

  useEffect(() => {
    if (formData.InstitutionTypeID) {
      getInstutionName(formData.InstitutionTypeID);
    }
  }, [formData.InstitutionTypeID]);

  const getTeachers = async id => {
    const res = await Axios.get(
      `?action=get_institutionTeacher&InstitutionID=${id}`
    );
    if (res.data.length) {
      setTeachers(res.data);
    }
  };

  useEffect(() => {
    if (formData.InstitutionID) {
      getTeachers(formData.InstitutionID);
    }
  }, [formData.InstitutionID]);
  const institution = useGetData(
    '?action=get_institutiontypes'
  );

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateOrderDetails = (event, itemId) => {
    setFormData({
      ...formData,
      BDExpReqDetails: formData.BDExpReqDetails.map(detail =>
        detail.id === itemId
          ? { ...detail, [event.target.name]: event.target.value }
          : detail
      ),
    });
  };

  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    const dataWillbeSubmitted = {
      BDExpReq: {
        BDExpReqNo: formData.BDExpReqNo,
        BDExpUserID: 501,
        BDExpReqDate: formData.BDExpReqDate,
        InstitutionTypeID: formData.InstitutionTypeID,
        InstitutionID: formData.InstitutionID,
        TotalAmount: formData.TotalAmount,
        UserID: 501,
      },
      BDExpReqDetails: formData.BDExpReqDetails.map(item => {
        return {
          TeacherName: item.TeacherName,
          Designation: item.Designation,
          FinancialYearID: item.FinancialYearID,
          ContactPhone: item.ContactPhone,
          BooksGroupID: item.BooksGroupID,
          ProductID: item.ProductID,
          StudentsCount: item.StudentsCount,
          DonationAmount: item.Total,
        };
      }),
    };
    const res = await Axios.post(
      '?action=create_BDExpReqAll',
      dataWillbeSubmitted
    );
    router.push('/dashboard/expense-requisition');
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">
          Add Business Development Expense Requisition
        </h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="BDExpReqNo" className="capitalize flex font-semibold text-md py-1">
        BD Exp Req No:
        </label>
        <input
          type="text"
          id="BDExpReqNo"
          name="BDExpReqNo"
          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          readOnly
          value={formData.BDExpReqNo}
        />
        <div className="w-full">
          <label className="capitalize flex font-semibold text-md py-1">
            Date:
          </label>

          <DatePicker
            selected={formData.BDExpReqDate}
            onChange={date =>
              setFormData({
                ...formData,
                BDExpReqDate: date.toISOString().split('T')[0],
              })
            }
            className="rounded-md"
          />
        </div>

        <div>
          <label className="capitalize flex font-semibold text-md py-1">
            Institution Type:
          </label>

          <select
            name="InstitutionTypeID"
            className="w-full rounded-md"
            defaultValue=""
            onChange={handleChange}
            value={formData.InstitutionTypeID}
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
        <div>
          <label className="capitalize flex font-semibold text-md py-1">
            Institution Name:
          </label>

          <select
            name="InstitutionID"
            className="w-full rounded-md"
            defaultValue=""
            onChange={handleChange}
            value={formData.InstitutionID}
            required
            disabled={formData.InstitutionTypeID ? false : true}
          >
            <option value="" disabled={true} selected></option>
            {intName.length &&
              intName.map(item => (
                <option value={item.InstitutionID} key={item.InstitutionID}>
                  {item.InstitutionName}
                </option>
              ))}
          </select>
        </div>
        {/* table start */}
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
                        Total
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.BDExpReqDetails.length &&
                      formData.BDExpReqDetails.map(item => (
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
                              onChange={event => {
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
                                setFormData({
                                  ...formData,
                                  BDExpReqDetails: formData.BDExpReqDetails.map(
                                    detail =>
                                      detail.id === item.id
                                        ? updateTeachersData(teachers, detail)
                                        : detail
                                  ),
                                });
                              }}
                            >
                              <option value="" disabled></option>
                              {teachers.length &&
                                teachers.map(teach => (
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
                              onChange={event =>
                                updateOrderDetails(event, item.id)
                              }
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
                              onChange={event =>
                                updateOrderDetails(event, item.id)
                              }
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
                              update={updateOrderDetails}
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
                              type="number"
                              id="Total"
                              name="Total"
                              className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                              onChange={event => {
                                updateOrderDetails(event, item.id);
                              }}
                              value={item.Total}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                            <AiOutlineCloseCircle
                              className="text-4xl text-red-500 cursor-pointer"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  BDExpReqDetails:
                                    formData.BDExpReqDetails.filter(
                                      info => info.id !== item.id
                                    ),
                                });
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td
                        className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                        colSpan="6"
                      ></td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        Total
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                        {formData.TotalAmount}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium "
                        colSpan="9"
                      >
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-green-300 text-md rounded-md px-4 py-2"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                BDExpReqDetails: [
                                  ...formData.BDExpReqDetails,
                                  {
                                    id: uuidv4(),
                                    TeacherName: '',
                                    Designation: '',
                                    ContactPhone: '',
                                    BooksGroupID: '',
                                    ProductID: '',
                                    StudentsCount: '',
                                    DonationAmount: '',
                                    FinancialYearID: '',
                                    Total: '',
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
            className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full"
            type="submit"
          >
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
