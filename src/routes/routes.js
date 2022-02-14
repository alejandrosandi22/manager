import { useRoutes } from 'react-router';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Dashboard from '../components/Dashboard/Dashboard';
import Projects from '../components/Projects/Projects';
import SignUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import Recovery from '../components/Recovery/Recovery';
import { useState } from 'react';

const ProtectedRoutes = ({ children }) => {


  const navigate = useNavigate();
  
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return navigate('/login')
    }
  })

  return children;
}

const routes  = [
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/recovery',
    element: <Recovery />
  },
  {
    path: '/',
    element: <Navigate to='/dashboard'/>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>
  },
  {
    path: '/projects',
    element: <ProtectedRoutes><Projects /></ProtectedRoutes>
  }
]

function Router() {
  const element = useRoutes(routes);
  return element;
}

export default Router;
