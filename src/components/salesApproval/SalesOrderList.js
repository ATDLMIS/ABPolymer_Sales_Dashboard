'use client'
import useGetData from "@/utils/useGetData"
import PendingList from "./PendingList"
import CompletedList from "./CompletedList"
import RejectedList from "./RejectedList"
import CencelledList from "./CencelledList"
import { useEffect, useState } from "react"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesOrderList = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("UserID") || "defaultID";
    setUserID(storedUserID);
  }, []);

  // ✅ Always call the hooks — even if userID isn’t ready yet
  const pendingData = useGetData(
    userID ? `?action=get_salesordersApproval&UserID=${userID}` : null
  );
  const completedData = useGetData(
    userID ? `?action=get_salesordersComplete&UserID=${userID}` : null
  );
  const rejectedData = useGetData(
    userID ? `?action=get_salesordersReject&UserID=${userID}` : null
  );
  const cancelledData = useGetData(
    userID ? `?action=get_salesordersCancelled&UserID=${userID}` : null
  );

  // ✅ You can safely show loading after all hooks are called
  if (!userID) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PendingList pendingData={pendingData||[]} type="sales" />
      <CompletedList completedData={completedData||[]} type="sales" />
      <RejectedList rejectedData={rejectedData||[]} type="sales" />
      <CencelledList cancelledData={cancelledData||[]} type="sales" />
    </>
  );
};

export default SalesOrderList;
