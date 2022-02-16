import React from 'react';
import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Dashboard from '../components/Dashboard/Dashboard';
import Projects from '../components/Projects/Projects';
import SignUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import Recovery from '../components/Recovery/Recovery';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return navigate('/login');
    }
  })
  
  return children;
}

function Router({ user }) {
  return(
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/recovery' element={<Recovery />} />
      <Route path='/' element={<Navigate to='/dashboard' />} />
      <Route path='/dashboard' element={<ProtectedRoutes><Dashboard user={user} /></ProtectedRoutes>} />
      <Route path='/projects' element={<ProtectedRoutes><Projects user={user} /></ProtectedRoutes>} />
    </Routes>
  );
}

export default Router;
