import React, { useState, useEffect } from 'react';
import BookComponent from './EmployeeComponent';
import './GetAllEmployeesComponent.css';
import axios from 'axios';

const GetAllEmployeesComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for 3 seconds
    const delay = setTimeout(() => {
      axios
        .get(`http://localhost:8080/api/v1/employee/`)
        .then((response) => {
          setEmployees(response.data);
          setLoading(false); // Set loading to false when data is loaded
        })
        .catch((error) => {
          alert(`Status ${error.response.data.status} - ${error.response.data.message}`);
          setLoading(false); // Set loading to false on error as well
        });
    }, 3000); // 3000 milliseconds (3 seconds)

    // Clear the timeout to avoid unnecessary data fetching if the component unmounts
    return () => clearTimeout(delay);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='employees'>
      {loading ? (
        // Display loading spinner
        <div className="loading-spinner"></div>
      ) : (
        // Display your actual content once the data is loaded
        employees.map((employee, index) => <BookComponent key={index} employee={employee} />)
      )}
    </div>
  );
};

export default GetAllEmployeesComponent;
