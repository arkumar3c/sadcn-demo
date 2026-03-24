import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/layouts/app-layout"
import { DashboardPage } from "@/pages/dashboard-page"
import { LoginPage } from "@/pages/login-page"
import { ProductsPage } from "@/pages/products-page"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
