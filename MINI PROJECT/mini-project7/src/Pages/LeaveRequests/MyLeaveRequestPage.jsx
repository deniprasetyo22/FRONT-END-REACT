import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import LeaveRequestService from '../../Services/LeaveRequestService';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const fetchLeaveRequest = async ({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }) => {
  const params = {
    PageNumber: pageNumber,
    PageSize: pageSize,
    SortBy: sortField,
    SortOrder: sortOrder,
    Keyword: searchType === 'keyword' ? searchQuery : '',
    Name: searchType === 'name' ? searchQuery : '',
    LeaveType: searchType === 'leaveType' ? searchQuery : '',
    CurrentStatus: searchType === 'status' ? searchQuery : '',
    RequestDate: searchType === 'requestDate' ? searchQuery : ''
  };

  const { data } = await LeaveRequestService.getAllPaging(params);
  return data;
};

const MyLeaveRequestPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('requestid');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('keyword');

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['leaveRequest'],
    queryFn: fetchLeaveRequest,
    placeholderData: keepPreviousData
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
    </div>
  );
  if (isError) return <p>Error fetching book requests</p>;

  const totalPages = Math.ceil(data.total / pageSize);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Reviewed By Supervisor':
        return 'bg-yellow-200 text-yellow-800';
      case 'Reviewed By HR Manager':
        return 'bg-yellow-200 text-yellow-800';
      case 'Approved':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPageNumber(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPageNumber(1);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchQuery('');
    setPageNumber(1);
  };

  const userLeaveRequests = data.data.filter(leaveRequest => leaveRequest.emp.userId === currentUser.user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Leave Request List</h1>
      <div className="my-4">
        <Button variant="bg-blue-600 hover:bg-blue-700" >
          <Link to="/myleaverequest/new" className="text-white">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link>
        </Button>
      </div>
      <div className="flex justify-between mb-4">
        <select value={pageSize} onChange={handlePageSizeChange} className="border border-gray-300 p-2 rounded-lg">
          {[5, 10, 25, 50].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase leading-normal">
              <th className="py-3 px-6">No</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Leave Type</th>
              <th className="py-3 px-6">Current Status</th>
              <th className="py-3 px-6">Submission Date</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {userLeaveRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="border p-2 text-center">No items to display</td>
              </tr>
            ) : (
              userLeaveRequests.map((leaveRequest, index) => {
                return (
                  <tr key={leaveRequest.requestid} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <td className="py-3 px-6">{leaveRequest.requestid}</td>
                    <td className="py-3 px-6">{leaveRequest.emp.fname} {leaveRequest.emp.lname}</td>
                    <td className="py-3 px-6">{leaveRequest.leavetype}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(leaveRequest.process.status)}`}>
                        {leaveRequest.process.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">{new Date(leaveRequest.process.requestdate).toLocaleString()}</td>
                    <td className="py-3 px-6">
                      <Link to={`/myleaverequest/${leaveRequest.requestid}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination flex items-center space-x-2'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link border px-3 py-1 rounded-md hover:bg-blue-600'}
          previousClassName={'previous-button'}
          nextClassName={'next-button'}
          activeClassName={'bg-blue-600 text-white rounded-md py-1'}
        />
      </div>
    </div >
  );
};

export default MyLeaveRequestPage;