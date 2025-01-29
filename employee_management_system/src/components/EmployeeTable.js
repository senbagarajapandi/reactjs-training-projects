import React, { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import EmployeeForm from './EmployeeForm';

const EmployeeTable = ({ employees, addEmployee, deleteEmployee, editEmployee }) => {
  
  const [employeeToEdit, setEmployeeToEdit] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => setEmployeeToEdit(row.original)}>Edit</button>
            <button onClick={() => deleteEmployee(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    [deleteEmployee, setEmployeeToEdit]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canNextPage,
    canPreviousPage,
    pageCount,
    nextPage,
    previousPage,
    gotoPage
  } = useTable(
    {
      columns,
      data: employees,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className='container'>
      <EmployeeForm onAdd={addEmployee} onEdit={editEmployee} employeeToEdit={employeeToEdit} afterEdit={setEmployeeToEdit}/>
      <div className='divider'></div>
      <div className='right'>
        <h2>Employees</h2>
        <div className={employees.length > 0 ? 'hidden':'active'}>
          <p>No Data !</p>
        </div>
        <table {...getTableProps()} className={employees.length > 0 ? 'actived':'hidden'}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.Cell.id}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}  key={cell.column.id}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        </table>
        <div className={pageCount > 1 ? 'navigator':'hidden'}>
          <button onClick={() => gotoPage(0)} className={!canPreviousPage?'hidden':'previous'}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} className={!canPreviousPage?'hidden':'previous'}>
            {'<'}
          </button>
          <span>
            {pageIndex + 1}
          </span>
          <button onClick={() => nextPage()} className={!canNextPage?'hidden':'next'}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} className={!canNextPage?'hidden':'next'}>
            {'>>'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmployeeTable;