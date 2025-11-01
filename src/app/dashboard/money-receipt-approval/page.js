import PendingOrderList from "@/components/moneyApproval/PendingOrderList"
import CompleteOrderList from "@/components/moneyApproval/CompleteOrderList"
import RejectedList from "@/components/moneyApproval/RejectedList"
import CencelledList from "@/components/moneyApproval/CencelledList"

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