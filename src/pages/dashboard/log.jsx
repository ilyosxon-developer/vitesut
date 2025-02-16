import { useNavigate } from 'react-router-dom';
import { httpRequest } from '@services/axios.service';
import { appConfig } from '@config';

function Dashboardlog() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await httpRequest.post('/api/logout/', {});
      localStorage.removeItem(appConfig.storage.ACCESS_TOKEN);
      localStorage.removeItem(appConfig.storage.REFRESH_TOKEN);
      localStorage.removeItem('username');
      navigate('/login');
    } catch (error) {
      console.error('Logout xatosi:', error);
    }
  };

  return (
    <div>
      <h1>Dashboardlog</h1>
      <button className="btn btn-danger" onClick={handleLogout}>Chiqish</button>
    </div>
  );
}

export default Dashboardlog;