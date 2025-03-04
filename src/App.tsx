import React, { useState } from 'react';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import { Address } from './types';

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const handleSave = (address: Address) => {
    setAddresses((prev) => [...prev, address]);
    localStorage.setItem('addresses', JSON.stringify([...addresses, address]));
  };

  React.useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-300 to-indigo-300 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Consulta de CEP</h1>
          <AddressForm onSave={handleSave} />
          <AddressList addresses={addresses} />
        </div>
      </div>
    </div>
  );
};

export default App;