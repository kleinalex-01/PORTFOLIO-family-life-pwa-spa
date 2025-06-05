import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="container-fluid bg-dark text-light d-flex justify-content-center align-items-center vh-100">
            <h1>Betöltés...</h1>
            </div>
            )

    if (!user) return <Navigate to="/login" replace />

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;