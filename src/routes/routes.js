import { useRoutes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

import Dashboard from '../components/Dashboard/Dashboard';
import Projects from '../components/Projects/Projects';
import SignUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import Recovery from '../components/Recovery/Recovery';

const ProtectedRoutes = ({ children }) => {
  
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to='/login' />
  }

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
