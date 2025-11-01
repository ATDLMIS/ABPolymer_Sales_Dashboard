'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const MappingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all mapping data
  const getmappedUsers = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(
        '?action=get_allusermapregion'
      );
      if (res.data.success) {
        setAllData(res.data.data);
        setFilteredData(res.data.data);
      } else {
        setAllData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    getmappedUsers();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredData(allData);
      setCurrentPage(1);
      return;
    }

    const filtered = allData.filter(item =>
      Object.values(item).some(val =>
        val !== null && String(val).toLowerCase().includes(term.toLowerCase())
      )
    );
    
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full pt-5">
          {/* Header with Search */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl capitalize">Mapping Employee Vs Region</h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-neutral-200 rounded-md w-[300px]"
            />
          </div>

          {/* New Map Button */}
          <div className="py-4">
            <Link
              href="/dashboard/mappingv2"
              className="py-2 px-5 text-white bg-primary1 rounded-md"
            >
              New Map
            </Link>
          </div>

          {/* Data Table */}
          <div className="overflow-x-scroll">
            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th className="border-e border-neutral-200 px-6 py-4">Id</th>
                  <th className="border-e border-neutral-200 px-6 py-4">Employee ID</th>
                  <th className="border-e border-neutral-200 px-6 py-4">Employee Name</th>
                  <th className="border-e border-neutral-200 px-6 py-4">Designation</th>
                  <th className="border-e border-neutral-200 px-6 py-4">User Role</th>
                  <th className="border-e border-neutral-200 px-6 py-4">District</th>
                  <th className="border-e border-neutral-200 px-6 py-4">Thana</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">Loading...</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      {searchTerm ? 'No matching records found' : 'No data available'}
                    </td>
                  </tr>
                ) : (
                  currentRows.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.UserID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">
                        {item.UserID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.EmployeeID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.EmpName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.Designation}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.UserRoleName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.District}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                        {item.Thana}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                        <span className="bg-cyan-500 p-1 inline-block rounded-md">
                          <Link href={`/dashboard/user-employee/view/${item.UserID}`}>
                            <FaEye className="text-white text-xl" />
                          </Link>
                        </span>
                        |
                        <span className="bg-amber-600 p-1 inline-block rounded-md">
                          <Link href={`/dashboard/user-employee/edit/${item.UserID}`}>
                            <FaRegEdit className="text-white text-xl" />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || isLoading}
                className="mx-1 px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              {paginationNumbers.map(page => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  disabled={isLoading}
                  className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || isLoading}
                className="mx-1 px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MappingPage;