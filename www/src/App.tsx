import Header from "./components/views/Header";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Switch } from "@headlessui/react";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import { Auth, User } from "firebase/auth";
import { auth } from "./firebase";
import NotFound from "./components/views/NotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import Task from "./components/views/Task";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TASK: "/task",
};

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full">
      <div className="h-screen grid justify-items-center">
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.TASK}
              element={
                <ProtectedRoute user={user}>
                  <Task />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

const ProtectedRoute = ({
  user,
  redirectPath = ROUTES.LOGIN,
  children,
}: {
  user: User;
  redirectPath?: string;
  children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
