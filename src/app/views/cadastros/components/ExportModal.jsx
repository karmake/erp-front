import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #343a40;
`;

const ModalBody = styled.div`
  ul {
    list-style-type: disc;
    margin-left: 20px;
    padding-left: 0;
    color: #495057;
  }

  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #dee2e6;
    }
  }
`;

const ModalFooter = styled.div`
  text-align: right;
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

function ExportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Listas para exportação de dados</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/* Conteúdo do modal */}
        </ModalBody>
        <ModalFooter>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ExportModal;
