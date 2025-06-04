import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import Login from '../pages/Log-in/Login';

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
            setLoading(true);
        });

        return () => unsubscribe();
    },[]);

    if (loading) return <div>Betöltés...</div>

    return (
        <>{!user ? 
        <Login /> : 
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>}

        </>
    )
}

export const useAuth = () => useContext(AuthContext);
