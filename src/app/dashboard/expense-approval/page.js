import PendingOrderList from "@/components/expenseApproval/PendingOrderList"
import CompleteOrderList from "@/components/expenseApproval/CompleteOrderList"
import RejectedList from "@/components/expenseApproval/RejectedList"
import CencelledList from "@/components/expenseApproval/CencelledList"
const page = () => {
  return (
    <div>
        <PendingOrderList />
        <CompleteOrderList />
        <RejectedList />
        <CencelledList />
    </div>
  )
}

export default page