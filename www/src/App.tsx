import Header from "./components/common/Header";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import { User } from "firebase/auth";
import { auth } from "./firebase";
import NotFound from "./components/views/NotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import Task from "./components/views/Task";
import Homework from "./components/views/Homework";
import Statistics from "./components/views/Statistics";
import { AppProvider } from "./context/AppContext";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TASK: "/task",
  HOMEWORK: "/homework",
  STATISTICS: "/Statistics",
  DEFAULT: "/",
};

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <AppProvider>
        <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full overflow-hidden ">
          <div className="h-screen grid    justify-items-center w-screen">
            <Router>
              <Header />
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.DEFAULT} element={<Login />} />
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    // @ts-ignore
                    <ProtectedRoute user={user}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.TASK}
                  element={
                    // @ts-ignore
                    <ProtectedRoute user={user}>
                      <Task />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.HOMEWORK}
                  element={
                    // @ts-ignore
                    <ProtectedRoute user={user}>
                      <Homework />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.STATISTICS}
                  element={
                    // @ts-ignore
                    <ProtectedRoute user={user}>
                      <Statistics />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </div>
        </div>
      </AppProvider>
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
