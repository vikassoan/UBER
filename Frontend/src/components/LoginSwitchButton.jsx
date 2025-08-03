import React from 'react';
import { Link } from 'react-router-dom';

const LoginSwitchButton = ({ isUserLogin }) => {
  return (
    <div className="fixed bottom-8 left-8 right-8">
      <Link 
        to={isUserLogin ? '/captain-login' : '/user-login'} 
        className="bg-blue-600 flex items-center justify-center text-white font-semibold rounded-full px-4 py-3 w-full text-lg transition-all hover:bg-blue-700"
      >
        {isUserLogin ? 'Switch to Captain Login' : 'Switch to User Login'}
      </Link>
    </div>
  );
};

export default LoginSwitchButton;