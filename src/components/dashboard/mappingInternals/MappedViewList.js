'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const MappedViewList = ({ id }) => {
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMappedData = async () => {
    setLoading(true);
    const res = await Axios.get(
      `?action=get_usermapregion&UserID=${id}`
    );
    console.log(res.data);
    setMappedData([...res.data.data]);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getMappedData();
    }
  }, [id]);

  if (loading) {
    return <div className="text-xl font-semibold text-center">Loading...</div>;
  }

  return (
    <>
      {mappedData.length === 0 ? (
        <div className="text-xl font-semibold text-center">
          User Not Mapped Yet
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold text-center py-3">
            Mapped View List
          </div>
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
                          EmployeeID
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
                          Designation
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          User Role
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          District
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Thana
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Area
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappedData.map(item => (
                        <tr
                          className="border-b border-neutral-200 dark:border-white/10"
                          key={item.EmployeeID}
                        >
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {item.EmployeeID}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                            {item.EmpName}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                            {item.Designation}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                            {item.UserRoleName}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                            {item.District}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                            {item.Thana}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                            {item.Area}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MappedViewList;
