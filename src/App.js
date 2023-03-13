// Styles
import "./App.css";

// React Router
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Forbidden from "./pages/Forbidden";
import Dashboard from "./pages/admin/Dashboard";
import DashboardUser from "./pages/user/DashboardUser";
import Kategori from "./pages/admin/Kategori";
import Produk from "./pages/admin/Produk";
import ProdukCreate from "./pages/admin/ProdukCreate";
import ProdukDetail from "./pages/admin/ProdukDetail";
import ProdukEdit from "./pages/admin/ProdukEdit";

// Components
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route
                    path="/user/dashboard"
                    element={
                        <ProtectedRoute userRole="user">
                            <DashboardUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute userRole="admin">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/kategori"
                    element={
                        <ProtectedRoute userRole="admin">
                            <Kategori />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/produk"
                    element={
                        <ProtectedRoute userRole="admin">
                            <Produk />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/produk/create"
                    element={
                        <ProtectedRoute userRole="admin">
                            <ProdukCreate />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/produk/detail/:id"
                    element={
                        <ProtectedRoute userRole="admin">
                            <ProdukDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/produk/edit/:id"
                    element={
                        <ProtectedRoute userRole="admin">
                            <ProdukEdit />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
