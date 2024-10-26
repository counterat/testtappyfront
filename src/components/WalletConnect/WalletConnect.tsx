import React from 'react';
import Modal from 'react-modal';
import './styles.css';

interface WalletModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Connect Wallet"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="dialog-content">
        <h2 className="dialog-title">Connect Your Wallet</h2>
        <p className="dialog-description">To continue, please connect your TON wallet.</p>
        <div id="ton-connect-button"></div>
        <button onClick={onRequestClose} className="close-modal-button">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default WalletModal;
