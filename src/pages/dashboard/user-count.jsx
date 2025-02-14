import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { httpRequest } from '@services/axios.service';
import { FaUsers } from 'react-icons/fa';

export default function UserCountCard() {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserCount = async () => {
      setLoading(true);
      try {
        const data = await httpRequest.get('/users/');
        setUserCount(data.results.length);
      } catch (err) {
        setError('Foydalanuvchilarni olishda xatolik yuz berdi!');
      } finally {
        setLoading(false);
      }
    };

    getUserCount();
  }, []);

  if (loading) {
    return (
      <div className="card text-center p-4 bg-primary text-white rounded-3 shadow-lg">
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return <div className="card text-center p-4 bg-danger text-white rounded-3 shadow-lg">{error}</div>;
  }

  return (
    <div className="card p-3 bg-primary text-white rounded-4 shadow-sm d-flex flex-row align-items-center" style={{ minWidth: '300px' }}>
      <div className="bg-white bg-gradient text-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
        <FaUsers size={20} className="text-primary" />
      </div>
      <div className="text-start">
        <small className="text-uppercase" style={{ fontSize: '12px', fontWeight: '600' }}> Foydalanuvchilar</small>
        <h2 className="fw-bold mb-0 mt-1" style={{ fontSize: '20px' }}>{userCount}</h2>
      </div>
    </div>
  );
}
