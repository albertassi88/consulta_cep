import React, { useState, useEffect  } from 'react';
import { Address } from '../types';

const AddressForm: React.FC<{ onSave: (address: Address) => void }> = ({ onSave }) => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Address[]>([]);
  const [validStorage, setValidStorage] = useState<Address[]>([]);

  useEffect(() => {
    const savedCache = localStorage.getItem('addresses');
    if (savedCache) {
      setCache(JSON.parse(savedCache));
    }
  }, []);

  const fetchAddress = async (cep: string) => {
    const foundAddress = cache.find(item => item.cep === cep);  
    console.log(foundAddress)
    const savedCache = JSON.parse(localStorage.getItem('addresses') || '[]');
    const addressSave = savedCache.find((item: any) => item.cep === cep);  
    setValidStorage(addressSave);
    try {
        if (!foundAddress) {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                const cepFound: any = { cep: cep };  
                const newCache = [...cache, cepFound];   
                setCache(newCache);           
                setError('CEP não encontrado!');
            } else if (!foundAddress) {
                setAddress(data);
                const newCache = [...cache, data];                
                setCache(newCache);
                setError(null); 
            }
        } else {
            setAddress(foundAddress);
            if (foundAddress?.logradouro) {
                setError(null); 
            } else {
                setError('CEP não encontrado!');
            }
        }
    } catch (err) {
      setAddress(null);
    }
  };

  const handleBlur = () => {
    if (cep.length === 9) {
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

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');  
    setCep(input);
  };

  return (
    <div className="p-8">
        <div className="mb-8">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
            <input
                type="text"
                value={cep}
                onChange={handleCepChange}
                onBlur={handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                maxLength={9}
            />
        </div>    
        {error && <p className="text-red-500 text-xs mb-3.5 font-bold -mt-7.5">{error}</p>}
        {address && !error && ( 
            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                <div className="space-y-3">
                    <div className="flex">
                        <span className="font-medium text-indigo-800 w-28">Logradouro:</span>
                        <span className="text-gray-700">{address.logradouro}</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium text-indigo-800 w-28">Bairro:</span>
                        <span className="text-gray-700">{address.bairro}</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium text-indigo-800 w-28">Cidade:</span>
                        <span className="text-gray-700">{address.localidade}</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium text-indigo-800 w-28">Estado:</span>
                        <span className="text-gray-700">{address.uf}</span>
                    </div>
                </div>
            </div>
        )}
        <button
            onClick={handleSave}
            disabled={!address || !!validStorage || !!error}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 w-24 font-bold"
            >
            Salvar
        </button>
        {(validStorage && address) && <p className="text-red-400 text-xs mb-3.5">Endereço salvo!</p>}
    </div>
  );
};

export default AddressForm;