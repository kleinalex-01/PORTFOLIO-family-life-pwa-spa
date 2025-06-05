import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true});

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    },[]);

    return (
        <>
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? (
                <div className="loading-ontainer container-fluid bg-dark text-light d-flex justify-content-center align-items-center vh-100">
                    <h1>Betöltés...</h1>
                </div>
            ) : (children)} 
        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);
