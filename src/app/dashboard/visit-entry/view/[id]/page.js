'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import convertDateFormat from '@/utils/convertDateFormat'
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
    const [state, setState] = useState({
        status: 'pending',
        data: null
    })

    const getData = async id =>{
        const res = await Axios.get(`?action=get_visit_entryall&VisitPlanID=${id}`)
        setState({
            status: 'idle',
            data: res.data
        })
    }
console.log(state.data)
    useEffect(()=>{
        if(params.id){
            getData(params.id)
        }
    }, [params.id])

    if(state.status === 'pending'){
        return <div className="text-xl font-semibold text-center py-6">Loading...</div>
    }
    if(state.data === null){
        return <div className='text-xl font-semibold text-center py-6'>No Data TO Display</div>
    }
  return (
    <>
        <div className="flex justify-center">
            <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
                <h1 className="text-center text-xl font-semibold mb-3">
                Visit Entry Details
                </h1>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Date:</h1>
                    <h1>{convertDateFormat(state.data.VisitPlan.VisitPlanDate)}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Visit Plan No:</h1>
                    <h1>{state.data.VisitPlan.VisitPlanNo}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Institution Type:</h1>
                    <h1>{state.data.VisitPlan.InstitutionTypeName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Institute Name:</h1>
                    <h1>{state.data.VisitPlan.InstituteName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Purpose Name:</h1>
                    <h1>{state.data.VisitPlan.PurposeName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Visit User Name:</h1>
                    <h1>{state.data.VisitPlan.VisitUserName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Check In Time:</h1>
                    <h1>{state.data.VisitPlan.CheckInTime.date}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Check Out Time:</h1>
                    <h1>{state.data.VisitPlan.CheckOutTime.date}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Latitude:</h1>
                    <h1>{state.data.VisitPlan.Latitude}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Longitude:</h1>
                    <h1>{state.data.VisitPlan.Longitude}</h1>
                </div>
            </div>
        </div>
        {state.data.Details.length > 0 && <div>
            <h1 className="text-xl font-semibold text-center pt-3">Teachers Details</h1>
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
                    Books_Name
                  </th>
                  {state.data.VisitPlan.PurposeID === 79 && <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Donation Amount
                  </th>}
                  {state.data.VisitPlan.PurposeID === 124 && <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Specimen Qty
                  </th>}
                  <th scope="col" className="px-6 py-4">
                    Student Count
                  </th>
                </tr>
              </thead>
              <tbody>
                { state.data.Details.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.VisitPlanDetailID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.TeacherName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.Designation}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.Phone}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.FinancialYear}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.ProductName}
                      </td>
                      {state.data.VisitPlan.PurposeID === 79 && <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.DonationAmount}
                      </td>}
                      {state.data.VisitPlan.PurposeID === 124 && <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.SpecimenQty}
                      </td>}
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                      {item.StudentNo}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        </div>}
        {state.data.TADADetails.length > 0 && <div>
            <h1 className="text-xl font-semibold text-center pt-3">TA/DA Details</h1>
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
                    TA/DA Allowance Type
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Thansport Media
                  </th>
                  <th scope="col" className="px-6 py-4">
                  Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                { state.data.TADADetails.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.sndVisitPlanTADADetailsID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.TADACategory}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.ThansportMedia}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                      {item.Amount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        </div>}
    </>
  )
}

export default page