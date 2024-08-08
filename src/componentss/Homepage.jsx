import React, { useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Box, Button } from "@mui/material";
import ViewModal from './ViewModal';
import './Homepage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Homepage() {
  const [initialValue, setInitialValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    qualification: "",
  });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); 
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [modalData, setModalData] = useState({}); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const itemsPerPage = 5; 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInitialValue({ ...initialValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName: initialValue.firstName,
      lastName: initialValue.lastName,
      email: initialValue.email,
      phoneNumber: initialValue.phoneNumber,
      qualification: initialValue.qualification,
    };

    if (editIndex !== -1) {
      const newData = [...data];
      newData[editIndex] = formData;
      setData(newData);
      setEditIndex(-1); 
      toast.success("Entry updated successfully!");
    } else if (
      initialValue.firstName === "" ||
      initialValue.lastName === "" ||
      initialValue.email === "" ||
      initialValue.phoneNumber === "" ||    
      initialValue.qualification === ""
    ) {
      toast.error("All fields are required!");
    } else {
      setData([...data, formData]);
      toast.success("New entry added successfully!");
    }

    setInitialValue({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      qualification: "",
    });
  };

  const handleEditClick = (index) => {
    setInitialValue(data[index]);
    setEditIndex(index);
  };

  const handleView = (ele) => {
    setModalData(ele);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== -1) {
      const newData = data.filter((item, index) => index !== deleteIndex);
      setData(newData);
      setDeleteIndex(-1); 
      setDeleteModalOpen(false);
      toast.success("Entry deleted successfully!");
    }
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setModalData({});
  };


  const sortedData = [...data];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sorting click
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <div className="main">
            <h3 className="over">Application Form</h3>
            <div className="one">
              <label>First Name</label>
              <input
                type="text"
                placeholder="enter first name"
                name="firstName"
                value={initialValue.firstName}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="one">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="last first name"
                name="lastName"
                value={initialValue.lastName}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="one">
              <label>Email</label>
              <input
                type="email"
                placeholder="enter email"
                name="email"
                value={initialValue.email}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="one">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="enter phone number"
                name="phoneNumber"
                value={initialValue.phoneNumber}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="one">
              <label>Qualification</label>
              <input
                type="text"
                placeholder="enter qualification"
                name="qualification"
                value={initialValue.qualification}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <button type="submit">
              {editIndex !== -1 ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </header>
      <div className="table">
        <table>
          <thead>
            <tr className="down">
              <th onClick={() => handleSort('firstName')}>
                First Name {sortConfig.key === 'firstName' && (
                  <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                )}
              </th>
              <th onClick={() => handleSort('lastName')}>
                Last Name {sortConfig.key === 'lastName' && (
                  <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                )}
              </th>
              <th onClick={() => handleSort('email')}>
                Email {sortConfig.key === 'email' && (
                  <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                )}
              </th>
              <th onClick={() => handleSort('phoneNumber')}>
                Phone Number {sortConfig.key === 'phoneNumber' && (
                  <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                )}
              </th>
              <th onClick={() => handleSort('qualification')}>
                Qualification {sortConfig.key === 'qualification' && (
                  <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 &&
              currentItems.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.firstName}</td>
                    <td>{ele.lastName}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phoneNumber}</td>
                    <td>{ele.qualification}</td>
                    <td className="icon">
                      <VisibilityIcon className='visi' onClick={() => handleView(ele)} />
                      <ModeEditIcon onClick={() => handleEditClick(data.indexOf(ele))} />
                      <DeleteIcon className='dlt' onClick={() => handleDeleteClick(data.indexOf(ele))} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box className="box">
          <h2>Confirm Delete</h2>
          <p>
            Are you sure you want to delete this item?
          </p>
          <div className='four'>
            <Button onClick={handleDeleteConfirm}>Delete</Button>
          </div>
          <div className='two'>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          </div>
          <div className='trash-icon'>
            <DeleteIcon style={{ fontSize: 48 }} />
          </div>
        </Box>
      </Modal>
      <ViewModal
        isOpen={viewModalOpen}
        handleClose={handleCloseModal}
        data={modalData}
      />
      <ToastContainer /> 
    </>
  );
}

export default Homepage;
