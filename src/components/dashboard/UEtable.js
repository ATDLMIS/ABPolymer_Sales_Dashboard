'use client';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UEtable = ({ userId }) => {
  const url = `?action=sndListoftheUserview&UserID=${userId}`;
  const { status, data } = useGetData(url);
  console.log("UserData",data)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    setFilteredData([]); // Fallback to empty data
  }
};

// Pagination logic (safe version)
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

  if (status === 'pending') {
    return <div>Loading....</div>;
  }
  if (status === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full pt-5">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-neutral-200 rounded-md"
            />
          </div>

          <div className="overflow-x-scroll">
            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Id</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Employee_ID</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Name</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Designation</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Email</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Phone</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Username</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Reporting To</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.UserID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 font-medium dark:border-white/10">
                      {item.UserID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.EmployeeID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.EmpName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.Designation}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.Email}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.Phone}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.Username}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 dark:border-white/10">
                      {item.ReportingToUserID}
                    </td>
                    <td className="whitespace-nowrap px-6 py-1 flex justify-center items-center gap-3">
                      <div>
                        <Link href={`/dashboard/user-employee/view/${item.UserID}`}>
                          <span className="bg-cyan-500 p-1 inline-block rounded-md">
                            <FaEye className="text-white text-sm" />
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link href={`/dashboard/user-employee/edit/${item.UserID}`}>
                          <span className="bg-amber-600 p-1 inline-block rounded-md">
                            <FaRegEdit className="text-white text-sm" />
                          </span>
                        </Link>
                      </div>
                      <div>
                        {item.Status === 1 ? (
                          <button
                            className="group relative z-0 h-7 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-6 text-neutral-50"
                            type="button"
                            onClick={() => handleDeactive(item)}
                          >
                            <span className="relative z-10">Deactive</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                            </span>
                          </button>
                        ) : (
                          <button
                            className="group relative z-0 h-7 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-8 text-neutral-50"
                            type="button"
                            onClick={() => handleActive(item)}
                          >
                            <span className="relative z-10">Active</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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