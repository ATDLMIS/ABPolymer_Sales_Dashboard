import Link from 'next/link';
import VisitPlan from '@/components/dashboard/VisitPlan';

const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">Visit Plan Requisition</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/visit-plan/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new visit plan
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
      <VisitPlan />
    </div>
  );
};

export default page;
