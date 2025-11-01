import { getServerSession } from 'next-auth/next';
import AddVisitPlan from '@/components/dashboard/AddVisitPlan';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const page = async () => {
  const session = await getServerSession(authOptions);
  return <AddVisitPlan session={session} />
  
};

export default page;
