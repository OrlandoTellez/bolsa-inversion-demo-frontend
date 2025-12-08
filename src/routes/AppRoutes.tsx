import { Route, Routes } from "react-router-dom"
import { LoginForm } from "../components/auth/LoginForm"
import App from "../App"
import { PrivateRoute } from "./PrivateRoutes"
import { Dashboard } from "../pages/Dashboard"
import { Investments } from "../pages/Investments"
import {
    Calendar,
    Users,
    Activity,
    BarChart3,
    FileText,
    User2,
} from "lucide-react";
import { Analisys } from "../pages/Analisys"
import { NotFound } from "../pages/NotFound"
import { Education } from "../pages/Education"
import { Consultations } from "../pages/Consultations"
import { Profile } from "../pages/Profile"

export const navigationItems = [
    { title: "Dashboard", url: "/", icon: BarChart3 },
    { title: "Inversiones", url: "/inversiones", icon: Calendar },
    { title: "Análisis", url: "/analisis", icon: Users },
    { title: "Educación", url: "/educacion", icon: Activity },
    { title: "Consultas", url: "/consultas", icon: Activity },
];

export const adminItems = [{ title: "Reportes", url: "/reports", icon: FileText }];

export const profileItems = [
    {
        title: "Perfil", url: "/perfil", icon: User2
    }
]


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

                <Route
                    path="/inversiones"
                    element={
                        <PrivateRoute>
                            <Investments />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/analisis"
                    element={
                        <PrivateRoute>
                            <Analisys />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/educacion"
                    element={
                        <PrivateRoute>
                            <Education />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/consultas"
                    element={
                        <PrivateRoute>
                            <Consultations />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}




