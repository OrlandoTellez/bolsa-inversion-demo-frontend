import { Route, Routes } from "react-router-dom"
import { LoginForm } from "../components/auth/LoginForm"
import App from "../App"
import { PrivateRoute } from "./PrivateRoutes"
import { Dashboard } from "../pages/Dashboard"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/login" element={<LoginForm />} />

            <Route element={<App />}>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    )
}




