


'use client';
import { useEffect, useMemo, useState } from 'react';
import useGetData from '@/utils/useGetData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'];

const Page = () => {
 const [userID, setUserID] = useState(null);
  
    useEffect(() => {
      const storedUserID = localStorage.getItem("UserID") || "defaultID";
      setUserID(storedUserID);
    }, []);
  const { status, data } = useGetData( userID ?`?action=get_user_statistics&UserID=${userID}`:null);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // always define fallback values to avoid conditional hooks
  const safeData = data || {};

  const summaryData = useMemo(() => [
    { name: 'Institution', value: Number(safeData.No_of_Institution || 0) },
    { name: 'Party', value: Number(safeData.No_of_Party || 0) },
    { name: 'Sales Target', value: Number(safeData.Sales_Target || 0) },
    { name: 'Sales Achievement', value: Number(safeData.Sales_Achievement || 0) },
    { name: 'Total Collection', value: Number(safeData.Total_Collection || 0) },
    { name: 'BD Expense', value: Number(safeData.Business_Development_Expense || 0) },
    { name: 'Specimen Expense', value: Number(safeData.Specimen_Expense || 0) },
    { name: 'TA Expense', value: Number(safeData.TA_Expense || 0) },
    { name: 'DA Expense', value: Number(safeData.DA_Expense || 0) },
    { name: 'Others Expense', value: Number(safeData.Others_Expense || 0) },
  ], [safeData]);

  const institutionVisitData = useMemo(
    () => safeData?.Institution_Visits || [],
    [safeData]
  );

  if (status === 'pending') {
    return <div className="text-xl font-semibold text-center py-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">📊 User Statistics Dashboard</h1>

      {/* Summary Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-center mb-2">Overall Summary</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={70} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Institution Visits Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-center mb-2">Institution Visits by Type</h2>
        {institutionVisitData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={institutionVisitData}
                dataKey="No_of_Institute_Visit"
                nameKey="InstitutionType"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {institutionVisitData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-10">No Institution Visit Data</div>
        )}
      </div>
    </div>
  );
};

export default Page;
