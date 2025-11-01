'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import convertDateFormat from "@/utils/convertDateFormat"
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({ params }) => {
  const [pendingData, setPendingData] = useState({
    status: 'pending',
    data: [],
  });
  const [completedData, setCompletedData] = useState({
    status: 'pending',
    data: [],
  });

  const [cencelledData, setCencelledData] = useState({
    status: 'pending',
    data: [],
  });

  const getPendingData = async id => {
    const res = await Axios.get(
      `?action=get_VisitPlanApproval&UserID=${id}`
    );
    setPendingData({
      status: 'idle',
      data: res.data?.length ? res.data : [],
    });
  };

  const getcompletedData = async id => {
    const res = await Axios.get(
      `?action=get_VisitPlanComplete&UserID=${id}`
    );
    setCompletedData({
      status: 'idle',
      data: res.data?.length ? res.data : [],
    });
  };

  const getcencelledData = async id => {
    const res = await Axios.get(
      `?action=get_VisitPlanCancelled&UserID=${id}`
    );
    setCencelledData({
      status: 'idle',
      data: res.data?.length ? res.data : [],
    });
  };

  useEffect(() => {
    if (params.id) {
      getPendingData(params.id);
      getcompletedData(params.id);
      getcencelledData(params.id)
    }
  }, [params.id]);

  // VisitUserName
  // Status
  return (
    <div>
      {/* pending data table */}
      {pendingData.status === 'pending' ? (
        <div className="text-xl font-semibold text-center py-6">Loading...</div>
      ) : pendingData.data.length ? (
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold py-2">Pending Approval List</h1>
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
                        SL
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan No.
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan Date
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Employee Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Type
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Purpose Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingData.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.VisitPlanID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SL}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {convertDateFormat(item.VisitPlanDate)}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {item.VisitUserName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteType}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.PurposeName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Status}
                        </td>
                        <td className="whitespace-nowrap">
                          <Link
                            className="font-semibold hover:underline"
                            href={`/dashboard/visit-approval/approve-cencel/${item.VisitPlanID}`}
                          >
                            <button className="px-3 py-2 bg-gray-600 rounded-md text-white">
                              Approve/Cencel
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-center py-6">
          No Data To Display
        </div>
      )}
      {/* completed data table */}
      {completedData.status === 'pending' ? (
        <div className="text-xl font-semibold text-center py-6">Loading...</div>
      ) : completedData.data.length ? (
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold py-2">
            Approved List
          </h1>
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
                        SL
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan No.
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan Date
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Employee Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Type
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Purpose Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedData.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.VisitPlanID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SL}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {convertDateFormat(item.VisitPlanDate)}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          <Link
                            className="text-blue-600 font-semibold hover:underline"
                            href={`/dashboard/visit-approval/view/${item.VisitPlanID}`}
                          >
                            {item.VisitUserName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteType}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.PurposeName}
                        </td>
                        <td className="whitespace-nowrap">{item.Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-center py-6">
          No Data To Display
        </div>
      )}
      {/* Cencelled table */}
      {cencelledData.status === 'pending' ? (
        <div className="text-xl font-semibold text-center py-6">Loading...</div>
      ) : cencelledData.data.length ? (
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold py-2">
            Cencelled List
          </h1>
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
                        SL
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan No.
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Visit Plan Date
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Employee Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Type
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Institute/party Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Purpose Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cencelledData.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.VisitPlanID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SL}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {convertDateFormat(item.VisitPlanDate)}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          <Link
                            className="text-blue-600 font-semibold hover:underline"
                            href={`/dashboard/visit-approval/view/${item.VisitPlanID}`}
                          >
                            {item.VisitUserName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteType}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.PurposeName}
                        </td>
                        <td className="whitespace-nowrap">{item.Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-center py-6">
          No Data To Display
        </div>
      )}
    </div>
  );
};

export default page;
