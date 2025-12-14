// DataTable.jsx - Fully Responsive table component
'use client';
import React from 'react';
import Loading from '../Loading';

const DataTable = ({ 
  columns, 
  data, 
  isLoading = false, 
  error = null,
  emptyMessage = "No data available",
  className = "" 
}) => {
  // Error: Missing or invalid columns prop
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-medium">⚠️ Configuration Error</p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-2">Invalid or missing columns configuration</p>
        </div>
      </div>
    );
  }

  // Validate column structure
  const hasInvalidColumns = columns.some(col => !col.key && !col.render);
  if (hasInvalidColumns) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-medium">⚠️ Column Configuration Error</p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-2">Each column must have either a 'key' or 'render' property</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
     <Loading />
    );
  }

  if (error) {
    const errorMessage = typeof error === 'string' 
      ? error 
      : error?.message || 'An unexpected error occurred';
    
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-medium">⚠️ Something went wrong</p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-2">{errorMessage}</p>
        </div>
      </div>
    );
  }

  // Error: data prop is not an array
  if (data && !Array.isArray(data)) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-medium">⚠️ Data Format Error</p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-2">Data must be an array</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  // Safe cell rendering
  const renderCell = (column, row, rowIndex) => {
    try {
      if (column.render) {
        if (typeof column.render !== 'function') {
          return <span className="text-red-500 text-xs">Invalid render</span>;
        }
        const result = column.render(row, rowIndex);
        if (result === null || result === undefined) return '—';
        return result;
      }
      
      const value = column.key?.split('.').reduce((obj, key) => obj?.[key], row);
      if (value === null || value === undefined || value === '') return '—';
      if (typeof value === 'object') return '[Object]';
      return value;
    } catch (err) {
      console.error(`Error rendering cell:`, err);
      return 'Error';
    }
  };

  const getCellValue = (column, row, rowIndex) => {
    try {
      const cellContent = renderCell(column, row, rowIndex);
      if (typeof cellContent === 'string' || typeof cellContent === 'number') {
        return String(cellContent);
      }
      return '';
    } catch {
      return '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-primary1 text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  scope="col"
                  className={`px-4 py-3 text-left text-sm font-normal text-white tracking-wider ${
                    column.headerClassName || ''
                  }`}
                  style={{ minWidth: column.width || 'auto' }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => {
              if (!row || typeof row !== 'object') {
                return (
                  <tr key={rowIndex}>
                    <td colSpan={columns.length} className="px-6 py-4 text-sm text-red-500">
                      Invalid row data at index {rowIndex}
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key || colIndex}
                      className={`px-3 py-1 text-sm text-gray-900 dark:text-gray-100 ${
                        column.cellClassName || ''
                      }`}
                      style={{ minWidth: column.width || 'auto' }}
                      title={getCellValue(column, row, rowIndex)}
                    >
                      <div className="break-words">
                        {renderCell(column, row, rowIndex)}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;