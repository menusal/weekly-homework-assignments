import { matchRoutes, useLocation } from "react-router-dom"

const routesDashboard = [{ path: "/dashboard" }]
const routesLogin = [{ path: "/login" }, { path: "/" }]


export const useMatchRoutes = () => {
  const location = useLocation()
  const isDashboard = matchRoutes(routesDashboard, location)
  const isLogin = matchRoutes(routesLogin, location)

  return { isDashboard, isLogin }
}