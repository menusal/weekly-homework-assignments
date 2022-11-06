import Header from "./components/common/Header";
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
import Homework from "./components/views/Homework";
import Challenges from "./components/views/Challenges";
import { useMatchRoutes } from "./hooks/useMatchRoutes";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TASK: "/task",
  HOMEWORK: "/homework",
  CHALLENGES: "/challenges",
};

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full overflow-hidden">
        <div className="h-screen grid justify-items-center">
          <Router>
            <Header />
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
              <Route
                path={ROUTES.HOMEWORK}
                element={
                  <ProtectedRoute user={user}>
                    <Homework />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.CHALLENGES}
                element={
                  <ProtectedRoute user={user}>
                    <Challenges />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
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
