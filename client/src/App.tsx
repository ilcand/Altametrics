import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import LoginPage from './pages/LoginPage';
import InvoicesPage from './pages/InvoicesPage';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/invoices" 
              element={
                <ProtectedRoute>
                  <InvoicesPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/" element={<Navigate to="/invoices" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;