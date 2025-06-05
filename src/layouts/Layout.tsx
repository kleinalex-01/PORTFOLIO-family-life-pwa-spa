import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const Layout: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="loading-container container-fluid bg-dark text-light d-flex justify-content-center align-items-center vh-100">
            <h1>Betöltés...</h1>
            </div>
            )

    if (!user) return <Navigate to="/login" replace />

    return (
        <>
            <header>
                <nav>
                    <p>this is the header</p>
                </nav>
            </header>

            <body>
                <p>this is the body</p>
                <Outlet />
            </body>

            <footer>
                <p>this is the footer</p>
            </footer>
        </>
    )
}

export default Layout;