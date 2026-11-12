import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

const DataTable = ({ columns, data, searchable = false, onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Data
  const filteredData = data?.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      {/* Table Header / Search Bar */}
      {searchable && (
        <div className="p-5 sm:p-6 border-b border-gray-100/80 flex justify-between items-center bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50/50">
            <tr>
              {columns?.map((col, i) => (
                <th key={i} className="px-6 py-4 font-bold border-b border-gray-100 whitespace-nowrap">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 transition-colors">
                    {col.label || col.header}
                    {col.sortable !== false && <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/80">
            {paginatedData.map((row, i) => (
              <tr 
                key={i} 
                className={`transition-colors duration-200 hover:bg-blue-50/40 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns?.map((col, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {col.render 
                      ? col.render(row[col.key || col.accessor], row) 
                      : (row[col.key || col.accessor] || <span className="text-gray-300">-</span>)}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns?.length || 1} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-base font-semibold text-gray-900 mb-1">No results found</p>
                    <p className="text-sm">We couldn't find anything matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-gray-900">{filteredData.length}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all shadow-sm ${
                    currentPage === idx + 1 
                      ? 'bg-blue-600 text-white shadow-blue-500/30' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
