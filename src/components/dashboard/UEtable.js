'use client';
import { FaEye, FaRegEdit, FaToggleOn, FaToggleOff} from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Axios from '@/utils/axios';
import DataTable from '../table/DataTable';
import FormInput from '../fromField/FormInput';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UEtable = ({ userId }) => {
  const url = `?action=sndListoftheUserview&UserID=${userId}`;
  const { status, data } = useGetData(url);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleDeactive = async (item) => {
    const url = `?action=update_sndUserStatus&UserID=${item.UserID}`;
    const res = await Axios.put(url, { Status: false });
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const handleActive = async (item) => {
    const url = `?action=update_sndUserStatus&UserID=${item.UserID}`;
    const res = await Axios.put(url, { Status: true });
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const columns = [
    {
      key: 'SL',
      header: 'SL',
      width: '5%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center'
    },
    {
      key: 'EmployeeID',
      header: 'Employee ID',
      width: '10%'
    },
    {
      key: 'EmpName',
      header: 'Employee Name',
      width: '15%'
    },
    {
      key: 'Designation',
      header: 'Designation',
      width: '10%'
    },
    {
      key: 'Username',
      header: 'User ID',
      width: '5%'
    },
    {
      key: 'ReportingToUserID',
      header: 'Reporting To',
      width: '15%'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`/dashboard/user-employee/view/${row.UserID}`}
            className="inline-flex items-center gap-2 bg-bgIcon text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="View Details"
          >
            <FaEye className="text-lg" />
          </Link>
          
          <Link
            href={`/dashboard/user-employee/edit/${row.UserID}`}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-1 py-1 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="Edit Product"
          >
            <FaRegEdit className="text-lg" />
          </Link>
          
          <div>
            {row.Status === 1 ? (
              <FaToggleOn
                onClick={() => handleDeactive(row)}
                style={{ color: 'green', cursor: 'pointer', fontSize: '2.5rem' }}
                title="Toggle Inactive"
              />
            ) : (
              <FaToggleOff
                onClick={() => handleActive(row)}
                style={{ color: 'red', cursor: 'pointer', fontSize: '2.5rem' }}
                title="Toggle Active"
              />
            )}
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    try {
      if (Array.isArray(data)) {
        setFilteredData(data);
      } else {
        console.warn("Data is not an array or is undefined.");
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error setting filtered data:", error);
      setFilteredData([]);
    }
  }, [data]);

  const handleSearch = (e) => {
    try {
      const term = e?.target?.value || "";
      setSearchTerm(term);

      if (!Array.isArray(data)) {
        console.warn("Data is not an array. Cannot perform search.");
        setFilteredData([]);
        return;
      }

      const filtered = data.filter(item =>
        Object.values(item || {}).some(val =>
          String(val || "")
            .toLowerCase()
            .includes(term.toLowerCase())
        )
      );

      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page after search
    } catch (error) {
      console.error("Search error:", error);
      setFilteredData([]);
    }
  };

  // Pagination logic
  const totalItems = Array.isArray(filteredData) ? filteredData.length : 0;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = totalItems ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : [];

  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;

  // Dynamic pagination numbers
  const paginationNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    try {
      if (typeof pageNumber !== "number" || pageNumber < 1 || pageNumber > totalPages) {
        console.warn("Invalid page number:", pageNumber);
        return;
      }
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Pagination error:", error);
    }
  };

  if (status === 'pending') {
    return <div>Loading....</div>;
  }
  if (status === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl capitalize mb-3">Employee Registration</h1>
              <div className="flex justify-between items-center">
                <Link href="/dashboard/user-employee/add">
                  <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
                    add new User
                  </button>
                </Link>
              </div>
            </div>
            {/* Search Input */}
            <div className="mb-4">
              <FormInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="container mt-4">
            <DataTable
              columns={columns}
              data={currentRows}
              isLoading={status === 'pending'}
              error={status === 'error' ? 'Failed to load products' : null}
              emptyMessage="No products found"
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {/* Previous Button */}
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {paginationNumbers.map(page => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-primary1 text-white' : 'bg-gray-200'}`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UEtable;