'use client';
//import { FaEye, FaRegEdit } from 'react-icons/fa';
import { FaEye, FaRegEdit, FaMapMarkedAlt, FaFileAlt } from "react-icons/fa";
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Axios from "@/utils/axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]); // Store all fetched data
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for a specific page
  const fetchData = async (page) => {
    setIsLoading(true);
    const url = `?action=get_parties&page=${page}&limit=${rowsPerPage}`;
    const response = await Axios.get(url);
    const data = response?.data;
    setIsLoading(false);
    return data;
  };

  // Load initial data (first page)
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchData(1);
      setAllData(data);
      setFilteredData(data);
    };
    loadInitialData();
  }, []);

  // Fetch data for a new page when currentPage changes
  useEffect(() => {
    if (currentPage > 1) {
      const loadPageData = async () => {
        const data = await fetchData(currentPage);
        setAllData((prev) => [...prev, ...data]); // Append new data
        setFilteredData((prev) => [...prev, ...data]);
      };
      loadPageData();
    }
  }, [currentPage]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = allData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Dynamic pagination numbers
  const paginationNumbers = [];
  const maxPagesToShow = 5; // Number of page numbers to show at a time
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
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Party Name</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Phone</th>
                  <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">Divistion</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                  currentRows.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.PartyID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.PartyID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.PartyName}
                      </td>
                     
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.ContactNumber}
                      </td>
           
                     
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.DivisionName} 
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
  {/* View */}
  <span className="bg-cyan-500 p-1 inline-block rounded-md">
    <Link href={`/dashboard/party-management/view/${item.PartyID}`}>
      <FaEye className="text-white text-xl" />
    </Link>
  </span>

  |

  {/* Edit */}
  <span className="bg-amber-600 p-1 inline-block rounded-md">
    <Link href={`/dashboard/party-management/edit/${item.PartyID}`}>
      <FaRegEdit className="text-white text-xl" />
    </Link>
  </span>

  |

  {/* Add Covered Area */}
  <span className="bg-green-500 p-1 inline-block rounded-md">
    <Link href={`/dashboard/party-management/add/area/${item.PartyID}`}>
      <FaMapMarkedAlt className="text-white text-xl" />
    </Link>
  </span>

  |

  {/* Add Document */}
  <span className="bg-blue-500 p-1 inline-block rounded-md">
    <Link href={`/dashboard/party-management/add/document/${item.PartyID}`}>
      <FaFileAlt className="text-white text-xl" />
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
          <div className="flex justify-center mt-4">
            {/* Previous Button */}
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
              className="mx-1 px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page Numbers */}
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

            {/* Next Button */}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || isLoading}
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

export default PartyManagement;