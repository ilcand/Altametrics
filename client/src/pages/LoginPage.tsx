import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { RootState } from '../store';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/invoices');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;