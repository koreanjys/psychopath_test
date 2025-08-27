import React from 'react';
import { useTranslation } from 'react-i18next';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  const { t } = useTranslation();

  const introStyle = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      color: '#fff',
      textAlign: 'center' as const,
      paddingTop: '6rem'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 30px rgba(238, 90, 82, 0.3)'
    },
    subtitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      marginBottom: '3rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '300'
    },
    imageContainer: {
      width: '300px',
      height: '200px',
      margin: '2rem auto',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      filter: 'brightness(0.7) saturate(1.2)'
    },
    description: {
      maxWidth: '600px',
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      lineHeight: '1.8',
      marginBottom: '2rem',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    warning: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '3rem',
      fontStyle: 'italic'
    },
    startButton: {
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
      color: '#fff',
      border: 'none',
      padding: '1rem 3rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(238, 90, 82, 0.3)',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px'
    }
  };

  return (
    <div style={introStyle.container}>
      <h1 style={introStyle.title}>{t('intro.title')}</h1>
      <h2 style={introStyle.subtitle}>{t('intro.subtitle')}</h2>
      
      <div style={introStyle.imageContainer}>
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop" 
          alt="Dark atmosphere"
          style={introStyle.image}
        />
        {/* 개발자 참고: 위 이미지를 더 오싹한 분위기의 이미지로 교체하세요 */}
      </div>
      
      <p style={introStyle.description}>
        {t('intro.description')}
      </p>
      
      <p style={introStyle.warning}>
        {t('intro.warning')}
      </p>
      
      <button 
        style={introStyle.startButton}
        onClick={onStart}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(238, 90, 82, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(238, 90, 82, 0.3)';
        }}
      >
        {t('intro.startButton')}
      </button>
    </div>
  );
};

export default Intro;
