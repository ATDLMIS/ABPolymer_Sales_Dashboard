import Link from 'next/link';
import ExpenseRequisitionList from '@/components/dashboard/ExpenseRequisitionList';
const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl capitalize mb-3">
          Business Development Expence List
        </h1>
        <div className="flex justify-between items-center">
          <Link href="/dashboard/expense-requisition/add">
            <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
              add new Expence List
            </button>
          </Link>
          <form>
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
            />
          </form>
        </div>
      </div>
      <ExpenseRequisitionList />
    </div>
  );
};

export default page;
