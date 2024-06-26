import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';
import { cekValidToken, deleteWaduk, getListWaduk } from '../../api';

const Dashboard = () => {
  const navigate = useNavigate();

  const [waduk, setWaduk] = useState([]);
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [idWaduk, setIdWaduk] = useState(null);

  useEffect(() => {
    isValidLoggedIn();
    
    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const isValidLoggedIn = async () => {
   try {
    const valid = await cekValidToken();
    if (!valid) {
      navigate('/login', { replace: true });
      return
    }
    getApiWaduk();
   } catch(err) {
    navigate('/login', { replace: true });
   }
  }

  const getApiWaduk = async () => {
    Swal.showLoading();
    getListWaduk().then(response => {
      setWaduk(response);
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch data' + error,
        timer: 1500,
        showConfirmButton: false,
        });
    });
    Swal.close();
  }

  const handleEdit = id => {
    // const [employee] = employees.filter(employee => employee.id === id);
    setIdWaduk(id);
    // setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
       const del = await deleteWaduk(id);
        if(del) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your data has been deleted.',
            timer: 1500,
            showConfirmButton: false,
            willClose: () => {
              getApiWaduk();
            }
          });
        }
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete data' + error,
        timer: 1500,
        showConfirmButton: false,
        });
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            dataWaduk={waduk}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          // employees={employees}
          idWaduk={idWaduk}
          // selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
