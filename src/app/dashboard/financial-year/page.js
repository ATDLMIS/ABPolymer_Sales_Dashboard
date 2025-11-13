"use client";
import DataTable from '@/components/table/DataTable';
import useGetData from '@/utils/useGetData';
const page = () => {
  let url =
    '?action=get_financialyears';

  let { status, data } = useGetData(url);

  // Define table columns
  const columns = [
    {
      key: 'ID',
      header: 'ID',
      width: '10%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'name',
      header: 'Financial Year',
      width: '25%'
    },
    {
      key: 'OpeningDate',
      header: 'FY Opening Date',
      width: '30%'
    },
    {
      key: 'ClosingDate',
      header: 'FY Closing Date',
      width: '30%'
    },
    {
      key: 'YearClosingStatus',
      header: 'FY Closing Status',
      width: '30%'
    },
  
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Financial Year</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
     <DataTable 
      columns={columns}
        data={data}
        isLoading={status === 'pending'}
        error={status === 'error' ? 'Failed to load products' : null}
        emptyMessage="No data found"
     />
    </div>
  );
};

export default page;
