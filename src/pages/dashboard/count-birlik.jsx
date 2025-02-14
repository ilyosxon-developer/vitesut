import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { httpRequest } from '@services/axios.service';
import { FaBalanceScale } from 'react-icons/fa';

export default function UnitCountCard() {
  const [unitCount, setUnitCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUnitCount = async () => {
      setLoading(true);
      try {
        const data = await httpRequest.get('/birliklar/');
        setUnitCount(data.results.length);
      } catch (err) {
        setError('Birliklarni olishda xatolik yuz berdi!');
      } finally {
        setLoading(false);
      }
    };

    getUnitCount();
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
    <div className="card p-3 bg-primary text-white rounded-4 shadow-sm d-flex flex-row align-items-center" style={{ minWidth: '280px' }}>
      <div className="bg-white bg-gradient text-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
        <FaBalanceScale size={24} />
      </div>
      <div className="text-start">
        <small className="text-uppercase" style={{ fontSize: '12px', fontWeight: '600' }}>Birliklar soni</small>
        <h2 className="fw-bold mb-0 mt-1" style={{ fontSize: '20px' }}>{unitCount}</h2>
      </div>
    </div>
  );
}
