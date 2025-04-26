import React from 'react';
import InvoicesList from '../components/InvoicesList';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const InvoicesPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">Invoice Management</h1>
          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <InvoicesList />
      </main>
    </div>
  );
};

export default InvoicesPage;