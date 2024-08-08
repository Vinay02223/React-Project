import React from 'react'
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ViewModal({ isOpen, handleClose, data }) {
  return (
    <>
      <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='abs'
       
      >
        <Box display="flex" justifyContent="flex-end" margin='-27px'>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <h2 id="modal-modal-title">View Details</h2>
        <p id="modal-modal-description">
          <strong>First Name:</strong> {data.firstName}
          <br />
          <strong>Last Name:</strong> {data.lastName}
          <br />
          <strong>Email:</strong> {data.email}
          <br />
          <strong>Phone Number:</strong> {data.phoneNumber}
          <br />
          <strong>Qualification:</strong> {data.qualification}
          <br />
        </p>
      </Box>
    </Modal>
    </>
  )
}

export default ViewModal