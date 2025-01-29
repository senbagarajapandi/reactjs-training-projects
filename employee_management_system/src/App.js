
import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  };

  const handleEditEmployee = (id, employeeEdit) => {
    setEmployees(employees.map( (employee) => 
      (employee.id === id ? employeeEdit: employee)
    ));
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <EmployeeTable
          employees={employees}
          addEmployee={handleAddEmployee}
          deleteEmployee={handleDeleteEmployee}
          editEmployee={handleEditEmployee}
        />
    </div>
  );
};

export default App;