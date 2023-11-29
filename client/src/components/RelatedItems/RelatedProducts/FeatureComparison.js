import React from 'react';

const FeatureComparison = ({ feature, values }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <span style={{ width: '33%', textAlign: 'center' }}>{values[0]}</span>
      <h4 style={{ width: '33%', textAlign: 'center' }}>{feature}</h4>
      <span style={{ width: '33%', textAlign: 'center' }}>{values[1]}</span>
    </div>
  );
};

export default FeatureComparison;