import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-location pulse-bg" style={{ width: '60%', height: '28px', marginBottom: '20px' }}></div>
      <div className="skeleton-current">
        <div className="pulse-bg" style={{ width: '100px', height: '100px', borderRadius: '50%' }}></div>
        <div className="skeleton-details">
          <div className="pulse-bg" style={{ width: '80px', height: '32px', marginBottom: '8px' }}></div>
          <div className="pulse-bg" style={{ width: '120px', height: '18px' }}></div>
        </div>
      </div>
      <div className="skeleton-forecast">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="forecast-card pulse-bg" style={{ width: '80px', height: '120px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;

