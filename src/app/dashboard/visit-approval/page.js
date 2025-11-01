import VisitApproval from '@/components/dashboard/VisitApproval';

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Visit plan approval system</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <VisitApproval />
    </div>
  );
};

export default page;
