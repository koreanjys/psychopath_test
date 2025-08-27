import React from 'react';

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  const progressStyle = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto 2rem',
      padding: '0 1rem'
    },
    bar: {
      width: '100%',
      height: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      overflow: 'hidden',
      position: 'relative' as const
    },
    fill: {
      height: '100%',
      background: 'linear-gradient(90deg, #ff6b6b, #ee5a52)',
      borderRadius: '4px',
      width: `${percentage}%`,
      transition: 'width 0.5s ease',
      boxShadow: '0 0 10px rgba(238, 90, 82, 0.5)'
    },
    text: {
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
      fontWeight: '500'
    }
  };

  return (
    <div style={progressStyle.container}>
      <div style={progressStyle.bar}>
        <div style={progressStyle.fill}></div>
      </div>
      <div style={progressStyle.text}>
        {current} / {total}
      </div>
    </div>
  );
};

export default Progress;
