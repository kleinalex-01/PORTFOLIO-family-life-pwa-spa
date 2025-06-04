import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
    return (
        <>
            <header>
                <nav>
                    <p>this is the header</p>
                </nav>
            </header>

            <body>
                <Outlet />
            </body>

            <footer>
                <p>this is the footer</p>
            </footer>
        </>
    )
}

export default Layout;