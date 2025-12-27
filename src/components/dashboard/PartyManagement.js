
"use client";
import { FaEye, FaRegEdit, FaMapMarkedAlt, FaFileAlt, FaPlus, FaSearch,FaTimes } from "react-icons/fa";
import { useState, useEffect, use } from 'react';
import Axios from "@/utils/axios";
import Link from 'next/link';
import RetailerModalForm from "../modal/RetailerModalForm";
import { useSession } from "next-auth/react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagement = () => {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [districts, setDistricts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [areaModalOpen, setAreaModalOpen] = useState(false);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);
  const [retailers, setRetailers] = useState([]);
  const [loadingRetailers, setLoadingRetailers] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [summary, setSummary] = useState({
    total_parties: 0,
    active_parties: 0,
    inactive_parties: 0,
    pending_parties: 0
  });

  // Status badge component (inline version)
  const StatusBadge = ({ status }) => {
    const getColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${getColor(status)}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  // Fetch districts for filter dropdown (optional - you can remove if not needed)
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        // If you have a districts API endpoint, use it here
        // For now, we'll use a fallback or you can remove this
        const response = await Axios.get('?action=get_master_data&type=districts').catch(() => null);
        if (response?.data?.success) {
          setDistricts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  //get retailers
    const getRetailerById = async (partyID) => {
    if (!partyID) {
      return;
    }
    const res = await Axios.get(
      `?action=get_Retailers&PartyID=${partyID}`
    );
    console.log("loaded retailers", res?.data?.retailers);
    setRetailers((res?.data?.retailers));
  };

 

  // Fetch data with filters
  const fetchData = async (page, search = '', status = '', district = '') => {
    setIsLoading(true);
    try {
      let url = `?action=get_parties&page=${page}&limit=${rowsPerPage}`;
      
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (status) url += `&status=${encodeURIComponent(status)}`;
      if (district) url += `&district_id=${encodeURIComponent(district)}`;
      
      const response = await Axios.get(url);
      
      if (response.data.success) {
        const data = response.data.data;
        const pagination = response.data.pagination;
        const summaryData = response.data.summary;
        
        setAllData(data);
        setFilteredData(data);
        setTotalPages(pagination.total_pages);
        setTotalItems(pagination.total);
        setSummary(summaryData);
        
        return data;
      } else {
        console.error('API Error:', response.data.error);
        return [];
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData(1);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(1, searchTerm, statusFilter, districtFilter);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter, districtFilter]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber, searchTerm, statusFilter, districtFilter);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }

    return numbers;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-500">Total Parties</div>
          <div className="text-2xl font-bold text-blue-600">{summary.total_parties}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-green-600">{summary.active_parties}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-500">Inactive</div>
          <div className="text-2xl font-bold text-red-600">{summary.inactive_parties}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{summary.pending_parties}</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name,code"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Districts</option>
              {districts.map((district, index) => (
                <option key={district.DistrictID || index} value={district.DistrictID}>
                  {district.DistrictName || `District ${district.DistrictID}`}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setDistrictFilter('');
              }}
              className="w-full p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors border"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm text-gray-600">
          Showing {filteredData.length} of {totalItems} parties
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Party Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Party Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Credit Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                    <p className="mt-2 text-gray-500">Loading parties...</p>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || statusFilter || districtFilter 
                      ? `No parties found matching your filters. Try adjusting your search.` 
                      : 'No parties found.'}
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.PartyID} className="hover:bg-gray-50">
                    {/* ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.SL}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.PartyCode || `P-${item.PartyID}`}
                    </td>

                    {/* Party Info */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.PartyName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.TradeLicenseNumber && `License: ${item.TradeLicenseNumber}`}
                      </div>
                      <div className="text-xs text-gray-400">
                        Created: {item.CreatedAt ? new Date(item.CreatedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.ContactName}</div>
                      <div className="text-sm text-gray-500">{item.ContactNumber}</div>
                      {item.Email && (
                        <div className="text-xs text-blue-500 truncate max-w-xs">{item.Email}</div>
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.DistrictName || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{item.ThanaName || ''}</div>
                      <div className="text-xs text-gray-400">{item.DivisionName || ''}</div>
                    </td>

                    {/* Credit Info */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-green-600 font-medium">
                          Outstanding: {formatCurrency(item.OutstandingAmount)}
                        </div>
                        <div className="text-red-600">
                          Pending: {formatCurrency(item.PendingAmount)}
                        </div>
                        <div className="text-red-600">
                          Remaining: {formatCurrency(item.RemainingAmount)}
                        </div>
                        <div className="text-blue-600">
                          Credit Limit: {formatCurrency(item.CreditLimit)}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.Status} />
                      {item.file_info?.TradeLicenseScan?.has_file && (
                        <div className="mt-1 text-xs text-green-600">✓ Trade License</div>
                      )}
                      {item.file_info?.NIDScan?.has_file && (
                        <div className="text-xs text-green-600">✓ NID</div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* View */}
                        <Link
                          href={`/dashboard/party-management/view/${item.PartyID}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors border"
                          title="View Details"
                        >
                          <FaEye className="mr-1" />
                          View
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/dashboard/party-management/edit/${item.PartyID}`}
                          className="inline-flex items-center px-3 py-1.5 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors border"
                          title="Edit"
                        >
                          <FaRegEdit className="mr-1" />
                          Edit
                        </Link>
                      </div>
                      <div className="flex space-x-2 mt-1">
                        {/* Add Covered Area */}
                        <button
                          onClick={() => {
                            setSelectedParty(item.PartyID);
                            setAreaModalOpen(true);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors border text-xs"
                          title="Add Covered Area"
                        >
                          <FaPlus className="mr-1" />
                          Retailer
                          </button>

                        {/* Add Document */}
                        <button
                          onClick={() => {
                            setSelectedParty(item.PartyID);
                            setRetailerModalOpen(true);
                              getRetailerById(item.PartyID)
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors border text-xs"
                          title="Add Document"
                        >
                          <FaEye className="mr-1" />
                        View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * rowsPerPage, totalItems)}
                  </span>{' '}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    &laquo;
                  </button>
                  
                  {getPaginationNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
       {/* Area Modal */}
    {areaModalOpen && (
                      <RetailerModalForm
                        partyID={selectedParty}
                        setAllRetailers={setRetailers}
                        setRefreshKey={setRefreshKey}
                        UserID={session.user.id}
                        open={areaModalOpen} 
                        setOpen={setAreaModalOpen}
                      />
                    )}

   {/* Retailer Modal */}
      {retailerModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Retailers</h3>
                {/* <p className="mt-1 text-sm text-gray-500">
                  Party: {selectedParty?.PartyName} ({selectedParty?.PartyCode})
                </p> */}
              </div>
              <button onClick={() => setRetailerModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {loadingRetailers ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-500">Loading retailers...</p>
              </div>
            ) : retailers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No retailers found for this party.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Retailer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact Person</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Designation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {retailers.map((retailer) => (
                      <tr key={retailer.RetailerID} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {retailer.RetailerCode}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {retailer.RetailerName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {retailer.ContactPersonName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {retailer.Designation || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {retailer.ContactPhone1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {retailer.Address}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            retailer.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {retailer.status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default PartyManagement;










 