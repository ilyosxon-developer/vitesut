import React from 'react';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../store/loading';
import './GlobalLoader.css';

const GlobalLoader = () => {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) return null;

  return (
    <div className="global-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Yuklanmoqda...</span>
      </div>
    </div>
  );
};

export default GlobalLoader;
