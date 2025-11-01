import Link from 'next/link';
import PendingList from '@/components/dashboard/visit-plan-approval/PendingList';
import CompleteList from '@/components/dashboard/visit-plan-approval/CompleteList';
import CencelledList from '@/components/dashboard/visit-plan-approval/CencelledList';
import RejectedList from '@/components/dashboard/visit-plan-approval/RejectedList';
const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">
          visit entry approval system
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
      {/* start */}
        <PendingList />
        <CompleteList />
        <RejectedList />
        <CencelledList />
      {/* end */}
      
      
    </div>
  );
};

export default page;
