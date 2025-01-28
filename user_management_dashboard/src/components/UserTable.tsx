import React, { useState } from 'react';
import { User, TableProps } from './interfaces';

const UserTable: React.FC<TableProps> = ({ users, deleteUser, editUser }) => {
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'role'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      console.log(column)
      // setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className='right'>
      <h2>Users</h2>
      <div className={currentUsers.length > 0 ? 'hidden':'active'}>
          <p>No Data !</p>
      </div>
      <table className={currentUsers.length > 0 ? 'actived': 'hidden'}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('role')}>Role</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => user.id && deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={users.length > 4 ? 'navigator': 'hidden'}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={currentPage===1 ? 'hidden':'previous'}
          title='Previous Page'
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={currentPage === totalPages ? 'hidden':'next'}
          title='Next Page'
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default UserTable;