import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS loader uchun stil
import { httpRequest } from '@services/axios.service';
import { appConfig } from '@config'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Loaderni yoqish

    try {
      const data = await httpRequest.create('/api/token/', { username, password })

      const { access, refresh } = data;
      localStorage.setItem(appConfig.storage.ACCESS_TOKEN, access);
      localStorage.setItem(appConfig.storage.REFRESH_TOKEN, refresh);
      localStorage.setItem('username', username);

      navigate('/dashboard');
    } catch (error) {
      setError('Noto\'g\'ri username yoki password');
      console.error('Login xatosi:', error);
    } finally {
      setIsLoading(false); // Loaderni o'chirish
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 bg-light ${isLoading ? 'blur-effect' : ''}`}>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="card p-4 shadow-sm border-0" style={{ width: '24rem' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="text-danger mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username::</label>
            <input
              type="text"
              className="form-control border-success"
              placeholder="Foydalanuvchi nomi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control border-success"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Kirish</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
