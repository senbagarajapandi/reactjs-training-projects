import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onAdd, onEdit, employeeToEdit, afterEdit }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setDepartment(employeeToEdit.department);
      setPosition(employeeToEdit.position);
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && department && position) {
      const newEmployee = { id: Date.now(), name, department, position };
      if (employeeToEdit){
        onEdit( employeeToEdit.id, { id:employeeToEdit.id, name, department, position });
        afterEdit(null);
      } else {
        onAdd(newEmployee);
      }
      setName('');
      setDepartment('');
      setPosition('');
      setName('');
    }
  };

  return (
    <div className='left'>
        <h2>{employeeToEdit?"Edit Employee":"Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee Name"
            required
          />
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            required
          />
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            required
          />
          <button type="submit">{employeeToEdit? "Edit": "Add"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;