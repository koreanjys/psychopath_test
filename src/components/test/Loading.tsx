import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
  onComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const loadingStyle = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      color: '#fff',
      textAlign: 'center' as const
    },
    content: {
      maxWidth: '600px',
      width: '100%'
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      marginBottom: '1rem',
      color: '#ff6b6b',
      fontWeight: 'bold'
    },
    subtitle: {
      fontSize: '1.2rem',
      marginBottom: '3rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '300'
    },
    progressContainer: {
      width: '100%',
      height: '6px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '3px',
      overflow: 'hidden',
      marginBottom: '2rem'
    },
    progressBar: {
      height: '100%',
      background: 'linear-gradient(90deg, #ff6b6b, #ee5a52)',
      borderRadius: '3px',
      width: `${progress}%`,
      transition: 'width 0.1s ease',
      boxShadow: '0 0 15px rgba(238, 90, 82, 0.6)'
    },
    percentage: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#ff6b6b',
      marginBottom: '1rem'
    },
    dots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#ff6b6b',
      animation: 'pulse 1.5s ease-in-out infinite'
    }
  };

  const dotStyle = (delay: number) => ({
    ...loadingStyle.dot,
    animationDelay: `${delay}s`
  });

  return (
    <div style={loadingStyle.container}>
      <div style={loadingStyle.content}>
        <h2 style={loadingStyle.title}>{t('test.loading')}</h2>
        <p style={loadingStyle.subtitle}>{t('test.loadingSubtext')}</p>
        
        <div style={loadingStyle.progressContainer}>
          <div style={loadingStyle.progressBar}></div>
        </div>
        
        <div style={loadingStyle.percentage}>{progress}%</div>
        
        <div style={loadingStyle.dots}>
          <div style={dotStyle(0)}></div>
          <div style={dotStyle(0.3)}></div>
          <div style={dotStyle(0.6)}></div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
