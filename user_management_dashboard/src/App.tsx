import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { User } from './components/interfaces';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleAddOrUpdateUser = (userData: User) => {
    if (userToEdit !== null) {
      setUsers(users.map(user => user.id === userToEdit.id ? { ...user, ...userData } : user));
      setUserToEdit(null);
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <div className='container'>
        <UserForm onSubmit={handleAddOrUpdateUser} existingUser={userToEdit}/>
        <div className='divider'></div>
        <UserTable users={users} deleteUser={handleDeleteUser} editUser={handleEditUser}/>
      </div>
    </div>
  );
};

export default App;