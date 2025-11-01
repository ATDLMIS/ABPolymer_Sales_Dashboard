'use client'
import useGetData from '@/utils/useGetData';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import convertDateFormat from "@/utils/convertDateFormat"
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const VisitPlan = () => {
  const {status, data} = useGetData('?action=get_visit_plans')
  
  if(status === 'pending'){
    return <div className='text-xl font-semibold text-center py-6'>Loading...</div>
  }
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
                    SL
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Visit Plan No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Visit Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Institution/Party Type
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Institution/Party Name
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
                    Visit User
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    App Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length ? data.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.VisitPlanID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.SL}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.VisitPlanNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {convertDateFormat(item.VisitPlanDate)}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.InstitutionTypeName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.InstituteName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.PurposeName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.VisitUserName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.StatusName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                    <Link href={`/dashboard/visit-plan/view/${item.VisitPlanID}`}>
                    <span className="bg-cyan-500 p-1 inline-block rounded-md">
                        <FaEye className="text-white text-xl" />
                      </span>
                    </Link>
                    {' '}
                      |
                      <Link href={`/dashboard/visit-plan/edit/${item.VisitPlanID}`}>
                      <span className="bg-amber-600 p-1 inline-block rounded-md">
                        <FaRegEdit className="text-white text-xl" />
                      </span>
                      </Link>
                      {' '}
                    </td>
                  </tr>
                )) : <div className='text-xl font-semibold text-center py-3'>No Data To Display</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPlan;
