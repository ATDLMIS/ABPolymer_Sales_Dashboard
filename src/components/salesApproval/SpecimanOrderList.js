'use client'
import { useEffect, useState } from "react";
import useGetData from "@/utils/useGetData";
import PendingList from "./PendingList";
import CompletedList from "./CompletedList";
import RejectedList from "./RejectedList";
import CencelledList from "./CencelledList";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SpecimanOrderList = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("UserID") || "defaultID";
    setUserID(storedUserID);
  }, []);

  // ✅ Always call hooks (even when userID is null)
  const pendingData = useGetData(
    userID ? `?action=get_salesordersSpecimanApproval&UserID=${userID}` : null
  );
  const completedData = useGetData(
    userID ? `?action=get_salesordersSpecimanComplete&UserID=${userID}` : null
  );
  const rejectedData = useGetData(
    userID ? `?action=get_salesordersSpecimanReject&UserID=${userID}` : null
  );
  const cancelledData = useGetData(
    userID ? `?action=get_salesordersSpecimanCancelled&UserID=${userID}` : null
  );

  // ✅ Show loading after all hooks are called
  if (!userID) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PendingList pendingData={pendingData||[]} type="speciman" />
      <CompletedList completedData={completedData||[]} type="speciman" />
      <RejectedList rejectedData={rejectedData|[]} type="speciman" />
      <CencelledList cancelledData={cancelledData||[]} type="speciman" />
    </>
  );
};

export default SpecimanOrderList;

