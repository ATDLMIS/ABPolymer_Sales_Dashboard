import ExpenceRequisitionView from "@/components/dashboard/view/ExpenceRequisitionView"
const page = ({params}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">
Business Development Expense Requisition Details
        </h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <ExpenceRequisitionView id={params.id} />
    </div>
  )
}

export default page