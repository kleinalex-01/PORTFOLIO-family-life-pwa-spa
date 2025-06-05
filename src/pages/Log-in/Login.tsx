import { auth } from '../../FirebaseConfig';
import React, { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type LoginCredentials = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password);
      navigate('/');
    } catch (error) {
      console.error("Hiba a bejelentkezés során:", error);
      alert("Hiba történt a bejelentkezés során. Kérjük, ellenőrizze az e-mail címet és a jelszót.");
    }
  };
  
  return (
    <>
    <div className='vh-100 container-fluid bg-dark text-light d-flex justify-content-center align-items-center flex-column'>
      <div className='mb-5'>
        <h1>Bejelentkezés</h1>
      </div>
      <div>
        <form className="container" onSubmit={handleLogin}>
          <div className='mb-3 d-flex flex-column'>
            <label htmlFor="email">E-mail:</label>
            <input type="text" required name="email" id="email"
                  value={loginCredentials.email || ''}
                  onChange={(e) => {
                    setLoginCredentials({ ...loginCredentials, email: e.target.value });
                  }} />
          </div>
          <div className='mb-3 d-flex flex-column'>
            <label htmlFor="password">Jelszó:</label>
            <input type="password" name="password" id="password" required
                    value={loginCredentials.password}
                    onChange={(e) => {
                      setLoginCredentials({ ...loginCredentials, password: e.target.value });
                    }}
                  />
          </div>
          <div>
            <button type='submit' className='w-100 btn btn-light'>Belépés</button>
          </div>

        </form>
      </div>
    </div>

    </>
  );
}

export default Login;