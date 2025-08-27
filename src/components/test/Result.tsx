import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TestResult as TestResultType } from '../../types/test';
import { shareResults, isMobile } from '../../lib/utils';

interface ResultProps {
  result: TestResultType;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ result, onRestart }) => {
  const { t, i18n } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);
  const currentLang = i18n.language as 'ko' | 'en';

  const handleShare = () => {
    const shareText = t('result.shareText', { 
      percentage: result.percentage, 
      title: result.title[currentLang] 
    });
    shareResults('사이코패스 테스트 결과', shareText);
  };

  const handleSave = async () => {
    if (!resultRef.current) return;

    // HTML2Canvas 같은 라이브러리 없이 간단한 구현
    // 실제 구현에서는 html2canvas 등을 사용하는 것을 권장
    try {
      if (isMobile()) {
        // 모바일에서는 스크린샷 기능 제한으로 인해 링크 공유로 대체
        handleShare();
      } else {
        // PC에서는 간단히 현재 페이지의 URL을 복사
        await navigator.clipboard.writeText(window.location.href);
        alert('결과 링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      handleShare();
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage === 0) return '#4ade80'; // 초록색
    if (percentage <= 25) return '#60a5fa'; // 파란색
    if (percentage <= 50) return '#fbbf24'; // 노란색
    if (percentage <= 75) return '#f97316'; // 주황색
    return '#ef4444'; // 빨간색
  };

  const resultStyle = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      color: '#fff',
      paddingTop: '6rem'
    },
    resultCard: {
      maxWidth: '700px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1.5rem',
      padding: '3rem 2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      textAlign: 'center' as const
    },
    title: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      marginBottom: '2rem',
      color: '#fff',
      fontWeight: 'bold'
    },
    percentageContainer: {
      margin: '2rem 0',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      border: `2px solid ${getPercentageColor(result.percentage)}`
    },
    percentage: {
      fontSize: 'clamp(3rem, 8vw, 5rem)',
      fontWeight: 'bold',
      color: getPercentageColor(result.percentage),
      textShadow: `0 0 20px ${getPercentageColor(result.percentage)}40`
    },
    resultTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
      margin: '1.5rem 0',
      color: getPercentageColor(result.percentage),
      fontWeight: 'bold'
    },
    imageContainer: {
      width: '250px',
      height: '200px',
      margin: '2rem auto',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      filter: 'brightness(0.8) saturate(1.1)'
    },
    description: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      lineHeight: '1.8',
      margin: '2rem 0',
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'left' as const,
      background: 'rgba(255, 255, 255, 0.03)',
      padding: '1.5rem',
      borderRadius: '0.8rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    buttonsContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '3rem',
      flexWrap: 'wrap' as const,
      justifyContent: 'center'
    },
    button: {
      padding: '1rem 2rem',
      borderRadius: '0.8rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: '150px'
    },
    shareButton: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
    },
    retryButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
    }
  };

  return (
    <div style={resultStyle.container}>
      <div ref={resultRef} style={resultStyle.resultCard}>
        <h2 style={resultStyle.title}>{t('result.title')}</h2>
        
        <div style={resultStyle.percentageContainer}>
          <div style={resultStyle.percentage}>{result.percentage}%</div>
        </div>
        
        <h3 style={resultStyle.resultTitle}>
          {result.title[currentLang]}
        </h3>
        
        <div style={resultStyle.imageContainer}>
          <img 
            src={result.image}
            alt={result.title[currentLang]}
            style={resultStyle.image}
          />
          {/* 개발자 참고: 각 결과에 맞는 이미지로 교체하세요 */}
        </div>
        
        <div style={resultStyle.description}>
          {result.description[currentLang]}
        </div>
        
        <div style={resultStyle.buttonsContainer}>
          <button
            style={{...resultStyle.button, ...resultStyle.shareButton}}
            onClick={handleShare}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
            }}
          >
            {t('result.shareButton')}
          </button>
          
          <button
            style={{...resultStyle.button, ...resultStyle.retryButton}}
            onClick={onRestart}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
            }}
          >
            {t('result.retryButton')}
          </button>
          
          <button
            style={{...resultStyle.button, ...resultStyle.saveButton}}
            onClick={handleSave}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
            }}
          >
            {t('result.saveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
