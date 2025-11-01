'use client'
import Link from 'next/link';
import useGetData from '@/utils/useGetData';
import convertDateFormat from "@/utils/convertDateFormat";
import formatAmountWithCommas from "@/utils/formatAmountWithCommas";
import { useSession } from 'next-auth/react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PendingOrderList = () => {
    const { data: session } = useSession();
    const userID = session?.user?.id || 501; // Fallback to 501 if session is not available

    const pendingData = useGetData(`?action=get_MoneyReceiptApproval&UserID=${userID}`);

    // Handle loading state properly
    if (!pendingData || pendingData?.status === 'pending') {
        return (
            <div className="text-xl font-semibold text-center py-5">Loading...</div>
        );
    }

    return (
        <>
            <h1 className="text-2xl capitalize mb-2">Pending list</h1>
            <div className="flex flex-col">
                <div>
                    <div className="inline-block max-w-full w-full pt-5">
                        <div className="overflow-x-scroll">
                            <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
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
                                    {pendingData?.data?.length > 0 ? (
                                        pendingData.data.map(item => (
                                            <tr className="border-b border-neutral-200 dark:border-white/10" key={item.SL}>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {item.SL}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {item.MRNo}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {convertDateFormat(item.MRDate)}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {item.PartyName}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {formatAmountWithCommas(Number(item.AmountReceived))}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                                                    {item.Status}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                                                    {item.AppStatus === 1 ? (
                                                        <Link href={`/dashboard/money-receipt-approval/check/${item.MRID}`}>
                                                            <button className="bg-gray-300 px-1 py-[2px]">Check</button>
                                                        </Link>
                                                    ) : item.AppStatus === 2 ? (
                                                        <Link href={`/dashboard/money-receipt-approval/authorized/${item.MRID}`}>
                                                            <button className="bg-gray-300 px-1 py-[2px]">Authorize</button>
                                                        </Link>
                                                    ) : (
                                                        <Link href={`/dashboard/money-receipt-approval/approval/${item.MRID}`}>
                                                            <button className="bg-gray-300 px-1 py-[2px]">Approval</button>
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center text-xl font-semibold py-5">
                                                No Data to Display
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PendingOrderList;
