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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Consulta de CEP</h1>
        <AddressForm onSave={handleSave} />
        <AddressList addresses={addresses} />
      </div>
    </div>
  );
};

export default App;