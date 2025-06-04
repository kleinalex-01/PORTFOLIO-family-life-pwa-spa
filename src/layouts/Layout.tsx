import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Layout: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            { user && <header>
                <nav>
                    <p>this is the header</p>
                </nav>
            </header>}

            <body>
                <Outlet />
            </body>

            { user && <footer>
                <p>this is the footer</p>
            </footer>}
        </>
    )
}

export default Layout;