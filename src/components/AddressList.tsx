import React from 'react';
import { Address } from '../types';

const AddressList: React.FC<{ addresses: Address[] }> = ({ addresses }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Endereços Salvos</h2>
      {addresses.length === 0 ? (
        <p>Nenhum endereço salvo.</p>
      ) : (
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              <p><strong>CEP:</strong> {address.cep}</p>
              <p><strong>Logradouro:</strong> {address.logradouro}</p>
              <p><strong>Bairro:</strong> {address.bairro}</p>
              <p><strong>Cidade:</strong> {address.localidade}</p>
              <p><strong>Estado:</strong> {address.uf}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;