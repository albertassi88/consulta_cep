import React from 'react';
import { Address } from '../types';

const AddressList: React.FC<{ addresses: Address[] }> = ({ addresses }) => {
  return (
    <div className="border-t border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Endereços Salvos</h2>
        <div className="space-y-4">
            {addresses.map((address, index) => (
                <div key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="font-medium text-violet-700 w-28">CEP:</span>
                            <span className="text-gray-700">{address.cep}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-violet-700 w-28">Logradouro:</span>
                            <span className="text-gray-700">{address.logradouro}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-violet-700 w-28">Bairro:</span>
                            <span className="text-gray-700">{address.bairro}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-violet-700 w-28">Cidade:</span>
                            <span className="text-gray-700">{address.localidade}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-violet-700 w-28">Estado:</span>
                            <span className="text-gray-700">{address.uf}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>      
    </div>
  );
};

export default AddressList;