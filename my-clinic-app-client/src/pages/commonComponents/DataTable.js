import React, { useState } from 'react';

const Table = ({ columns, data }) => {
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="table-container table-gray">
        <table className="min-w-full divide-y divide-gray-200 table-gray">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {item[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="pagination-btn mr-2 mb-3"
        >
          Previous
        </button>
        <button
          disabled={indexOfLastItem >= data.length}
          onClick={() => paginate(currentPage + 1)}
          className="pagination-btn ml-2 mb-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
