// RestrictedModal.js
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const RestrictedModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Restricted Access"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        },
      }}
    >
      <h2>Restricted Access</h2>
      <p>This section of the website is only accessible on a laptop or a larger screen.</p>
      <Link to="/"><button onClick={onRequestClose} className=' btn border-neutral-700 mt-9' >Close</button></Link> 
    </Modal>
  );
};

export default RestrictedModal;
