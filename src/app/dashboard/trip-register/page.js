'use client';
import Link from 'next/link';
import { FaEye, FaRegEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import DataTable from '@/components/table/DataTable';
import useGetData from '@/utils/useGetData';
import Axios from '@/utils/axios';

const page = () => {
  const url = '?action=get_TripSchedules'
  
   const { status, data } = useGetData(url);

const handleDeactive = async (item) => {
    const url = `?action=update_TripSchedule`;
    const res = await Axios.put(url, { Status: 1, TripID: item.TripID });
    console.log(res.data);
    if (res.status === 200) {
      window.location.reload();
    }
  };


  // Define table columns

  const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'TripNo',
      header: 'Trip No.',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'DeliverySalesDate',
      header: 'Delivery Date',
      width: '15%'
    },
    {
      key: 'DriverName',
      header: 'Driver Name',
      width: '15%'
    },
    {
      key: 'DriverMobile',
      header: 'Driver Mobile',
      width: '15%'
    },
    {
      key: 'VehicleNo',
      header: 'Vehicle Number',
      width: '15%'
    },
    
   
    {
      key: 'actions',
      header: 'Actions',
      width: '25%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <>
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`/dashboard/trip-register/view/${row.TripID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
             title="View Details"
          >
            <FaEye className="text-lg" />
          </Link>
          
          <Link
            href={`/dashboard/trip-register/edit/${row.TripID}`}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <FaRegEdit className="text-lg" />
          </Link>
           {row.Status === 0 ? (
                      <FaToggleOn
                        onClick={() => handleDeactive(row)}
                        style={{ color: 'green', cursor: 'pointer', fontSize: '2.5rem' }}
                        title="Toggle Inactive"
                      />
                    ) : (
                      <FaToggleOff
                        style={{ color: 'red', cursor: 'pointer', fontSize: '2.5rem' }}
                        title="Toggle Active"
                      />
                    )}
        </div>
        </>
      )
    }
  ];
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3 ml-3">Trip Register</h1>
      <div className="flex justify-between items-center ml-3">
        <Link href="/dashboard/trip-register/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new trip register
          </button>
        </Link>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[250px] text-sm mr-5"
          />
        </form>
      </div>
      <div className="container mx-auto px-4 py-6">

      <DataTable
        columns={columns}
        data={data || []}
        isLoading={status === 'pending'}
        error={status === 'error' ? 'Failed to load products' : null}
        emptyMessage="No products found"
      />
    </div>
    </div>
  );
};

export default page;
