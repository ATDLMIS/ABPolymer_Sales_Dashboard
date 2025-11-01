import Link from 'next/link';
import SubjectManagement from '@/components/dashboard/SubjectManagement';

const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">subject-Info management</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/subject-management/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new Subject-Info
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
      <SubjectManagement />
    </div>
  );
};

export default page;
