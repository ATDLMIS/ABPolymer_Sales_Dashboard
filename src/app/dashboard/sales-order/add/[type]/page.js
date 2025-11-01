import SalesOrderForm from '@/components/dashboard/SalesOrderForm';
import SpecimanOrderForm from '@/components/dashboard/SpecimanOrderForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  return params.type === 'sales' ? (
    <SalesOrderForm session={session} />
  ) : (
    <SpecimanOrderForm session={session} />
  );
};

export default page;
