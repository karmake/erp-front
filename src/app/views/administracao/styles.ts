/* eslint-disable */
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

export const Main = styled.div`
  padding: 20px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #3f3d56;
`;

export const IntegrationGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

export const IntegrationCard = styled.div`
  width: 150px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }

  img {
    max-width: 100%;
  }

  p {
    margin-top: 10px;
    font-size: 1rem;
    color: #3f3d56;
  }
`;

export const Modal = styled.div<ModalProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  position: relative;
  margin: 5% auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #dee2e6;
  h2 {
    margin: 0;
    color: #3f3d56;
  }
`;

export const ModalBody = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3f3d56;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #f44336;
  }
`;

// Estilos da tabela

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
`;

export const StyledTableHeader = styled.th`
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:nth-child(odd) {
    background-color: #fff;
  }
`;

export const StyledTableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  color: #333;
`;

export const StyledTableBody = styled.tbody`
  tr:hover {
    background-color: #f1f1f1;
  }
`;

// Estilos para o botão de edição

export const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// Estilos para o campo de input

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

// Estilos para botões do modal

interface StyledButtonProps {
  cancel?: boolean; // Define a propriedade cancel como opcional
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.cancel ? '#f44336' : '#4caf50')};
  color: white;
  border: none;
  padding: 12px 24px;
  margin-left: 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-width: 100px; /* Para garantir que todos os botões tenham o mesmo tamanho */

  &:hover {
    background-color: ${(props) => (props.cancel ? '#d32f2f' : '#388e3c')};
    transform: translateY(-2px); /* Leve elevação ao passar o mouse */
  }

  &:active {
    transform: translateY(0); /* Volta ao normal ao clicar */
  }
`;

