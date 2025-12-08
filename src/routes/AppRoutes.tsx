import { Route, Routes } from "react-router-dom"
import { LoginForm } from "../components/auth/LoginForm"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/login" element={<LoginForm />} />
        </Routes>
    )
}




