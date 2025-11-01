'use client'
import Link from "next/link"
import useGetData from "@/utils/useGetData"
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from "@/utils/formatAmountWithCommas"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RejectedList = () => {
    const [userID, setUserID] = useState(501) // Default to 501

    useEffect(() => {
        getSession().then(session => {
            if (session && session.user) {
                setUserID(session.user.id) // Update with actual user ID from session
            }
        })
    }, [])

    const RejectedData = useGetData(`?action=get_MoneyReceiptReject&UserID=${userID}`)

    if (RejectedData.status === 'pending') {
        return <div className="text-xl font-semibold text-center py-5">Loading...</div>
    }

    return (
        <>
            <h1 className="text-2xl capitalize mb-2">Rejected list</h1>
            <div className="flex flex-col">
                <div>
                    <div className="inline-block max-w-full w-full pt-5">
                        <div className="overflow-x-scroll">
                            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr className="bg-text1 text-white">
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">SL</th>
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Receipt No</th>
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Date</th>
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Party Name</th>
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Received Amount</th>
                                        <th className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Approval Status</th>
                                        <th className="px-6 py-4">Approval Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RejectedData.data.length ? RejectedData.data.map(item => (
                                        <tr className="border-b border-neutral-200 dark:border-white/10" key={item.MRID}>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{item.SL}</td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{item.MRNo}</td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{convertDateFormat(item.MRDate)}</td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{item.partyname}</td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{formatAmountWithCommas(Number(item.AmountReceived))}</td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">{item.Status}</td>
                                            <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                                                <Link href={`/dashboard/money-receipt-approval/view/${item.MRID}`}>
                                                    <button className="bg-gray-300 px-1 py-[2px]">View</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="7" className="text-center text-xl font-semibold py-5">No Data to Display</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RejectedList