import React, { useState, useEffect  } from 'react';
import { Address } from '../types';

const AddressForm: React.FC<{ onSave: (address: Address) => void }> = ({ onSave }) => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Address[]>([]);

  useEffect(() => {
    const savedCache = localStorage.getItem('addresses');
    if (savedCache) {
      setCache(JSON.parse(savedCache));
    }
  }, []);

  const fetchAddress = async (cep: string) => {
    const formattedCep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    const foundAddress = cache.find(e => e.cep === formattedCep);    
    try {
        if (!foundAddress) {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
              setError('CEP não encontrado');
              setAddress(null);
            } else if (!foundAddress) {
              setAddress(data);
              const newCache = [...cache, data];
              setCache(newCache);
              setError(null); 
            }
        }
    } catch (err) {
      setError('Erro ao consultar o CEP');
      setAddress(null);
    }
  };

  const handleBlur = () => {
    if (cep.length === 8) {
      fetchAddress(cep);
    }
  };

  const handleSave = () => {
    if (address) {
      onSave(address);
      setCep('');
      setAddress(null);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          maxLength={8}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {address && (
        <div className="mb-4">
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade}</p>
          <p><strong>Estado:</strong> {address.uf}</p>
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={!address}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
      >
        Salvar
      </button>
    </div>
  );
};

export default AddressForm;