import { getAuthSession } from "@/lib/auth-storage"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute() {
  if (!getAuthSession()) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
