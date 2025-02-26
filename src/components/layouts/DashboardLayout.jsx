import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, Train, FileText, Settings, LogOut, Menu } from 'lucide-react';
import React, { useState } from 'react';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import Purchase from '../../pages/purchase/index';
import Birlik from '../../pages/birliklar/birlik';
import Login from '../../pages/auth/Login';
import Categories from '../../pages/catagories/catagories';
import UserManagement from '../../pages/users/getUser';
import './DashboardLayout.css'
import Sotuv from '../../pages/sotuv/sotuv';
import OmborIndex from '../../pages/ombor/ombor';
import OmborHisoboti from '../../pages/ombor/hisobot';
import Products from '../../pages/mahsulotlar/mahsulotlar';
import Ombor  from '../../pages/ombor/ombor';
import { httpRequest } from '@services/axios.service';
import { storage } from '@utils'
import { appConfig } from '@config'
import { Button } from 'react-bootstrap';

const navigation = [
  { name: 'Bosh Sahifa', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Foydalanuvchilar', href: '/users', icon: Users },
  { name: 'Birliklar', href: '/birliklar', icon: Package },
  { name: 'Kategoriyalar', href: '/kategoriyalar', icon: Package },
  { name: 'Ombor', href: '/ombor', icon: Settings },
  { name: 'Mahsulotar', href: '/products', icon: Package },
  { name: 'Purchase', href: '/purchase', icon: ShoppingCart },
  { name: 'Sotuv', href: '/Sotuv', icon: FileText },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    httpRequest.create('/logout/').then(res => {
      storage.remove(appConfig.storage.ACCESS_TOKEN)
      storage.remove(appConfig.storage.REFRESH_TOKEN)
      navigate('/login')
    }).catch(error => console.log({ error }))
  }

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      {/* Sidebar (Mobile) */}
      <div
        className={`offcanvas offcanvas-start ${sidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ visibility: sidebarOpen ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold text-primary">FrontSut</h5>
          <button className="btn-close" onClick={() => setSidebarOpen(false)}></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <nav className="nav flex-column">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link d-flex align-items-center p ${location.pathname === item.href ? 'bg-primary text-white' : 'text-dark'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="me-2" size={20} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-top pt-3">
            <button className="btn btn-outline-danger w-100 d-flex align-items-center">
              <LogOut className="me-2" size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navbar (Mobile) */}
      <div className="d-md-none w-100 bg-white d-flex align-items-center p-2 border-bottom">
        <button className="btn btn-outline-primary me-2" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} />
        </button>
        <h5 className="m-0 fw-bold">FrontSut</h5>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="d-none d-md-flex flex-column bg-white border-end" style={{ width: '250px' }}>
        <div className="p-3 border-bottom">
          <h4 className="fw-bold text-primary">FrontSut</h4>
        </div>
        <nav className="nav flex-column p-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === item.href ? 'bg-primary text-white' : 'text-dark'
                }`}
            >
              <item.icon className="me-2" size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-top">
          <Button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center">
            <LogOut className="me-2" size={20} />
            <span> Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3 bg-light w-100" style={{ maxWidth: '100%' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/birliklar" element={<Birlik />} />
          <Route path="/kategoriyalar" element={<Categories />} />
          <Route path="/ombor" element={<Ombor />} />
          <Route path="/products" element={<Products />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/sotuv" element={<Sotuv />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

