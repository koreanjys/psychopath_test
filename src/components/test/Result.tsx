import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { TestResult as TestResultType } from '../../types/test';
import { shareResults, isMobile, encodeResultToUrl } from '../../lib/utils';
import { results } from '../../data/results';

interface ResultProps {
  result: TestResultType;
  onRestart: () => void;
  isShared?: boolean;
}

const Result: React.FC<ResultProps> = ({ result, onRestart, isShared = false }) => {
  const { t, i18n } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);
  const currentLang = i18n.language as 'ko' | 'en';

  const handleShare = () => {
    // 결과 인덱스 찾기
    const resultIndex = results.findIndex(r => r.percentage === result.percentage);
    
    // URL에 결과 정보와 현재 언어 인코딩
    const shareUrl = encodeResultToUrl(result.percentage, resultIndex, currentLang);
    
    const shareText = t('result.shareText', { 
      percentage: result.percentage, 
      title: result.title[currentLang] 
    });
    
    shareResults(t('result.shareTitle'), shareText, shareUrl);
  };

  const handleSave = async () => {
    if (!resultRef.current) return;

    try {
      // Canvas로 결과 화면을 이미지로 변환
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#0c0c0c',
        scale: 2, // 고해상도를 위한 스케일
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        logging: false
      });

      // Canvas를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const fileName = `psychopath-test-result-${result.percentage}%.png`;

        if (isMobile()) {
          // 모바일: 이미지를 새 탭에서 열어서 사용자가 길게 눌러서 저장하도록 안내
          const canvas2 = document.createElement('canvas');
          const ctx = canvas2.getContext('2d');
          
          canvas2.width = canvas.width;
          canvas2.height = canvas.height;
          
          if (ctx) {
            ctx.drawImage(canvas, 0, 0);
            
            // 이미지를 data URL로 변환
            const dataURL = canvas2.toDataURL('image/png', 0.95);
            
            // 새 창에서 이미지 열기
            const newWindow = window.open();
            if (newWindow) {
              newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>테스트 결과 저장</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 20px;
                      background: #000;
                      color: #fff;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      text-align: center;
                    }
                    .instruction {
                      margin-bottom: 20px;
                      font-size: 16px;
                      line-height: 1.5;
                    }
                    .highlight {
                      color: #ff6b6b;
                      font-weight: bold;
                    }
                    img {
                      max-width: 100%;
                      height: auto;
                      border-radius: 10px;
                      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
                    }
                    .close-btn {
                      margin-top: 20px;
                      padding: 10px 20px;
                      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                      color: white;
                      border: none;
                      border-radius: 5px;
                      font-size: 16px;
                      cursor: pointer;
                    }
                  </style>
                </head>
                <body>
                  <div class="instruction">
                    📱 <span class="highlight">이미지를 길게 눌러서</span> "이미지 저장" 또는 "사진에 저장"을 선택하세요
                  </div>
                  <img src="${dataURL}" alt="사이코패스 테스트 결과" />
                  <br>
                  <button class="close-btn" onclick="window.close()">창 닫기</button>
                </body>
                </html>
              `);
              newWindow.document.close();
            } else {
              // 팝업이 차단된 경우 폴백
              fallbackDownload(blob, fileName);
            }
          }
        } else {
          // PC: File System Access API 지원 여부 확인
          if ('showSaveFilePicker' in window) {
            try {
              const fileHandle = await (window as any).showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                  description: 'PNG 이미지',
                  accept: { 'image/png': ['.png'] }
                }]
              });
              const writable = await fileHandle.createWritable();
              await writable.write(blob);
              await writable.close();
              alert(t('result.saveSuccess'));
            } catch (error) {
              // 사용자가 취소했거나 API를 지원하지 않는 경우 폴백
              fallbackDownload(blob, fileName);
            }
          } else {
            // 구형 브라우저는 일반 다운로드
            fallbackDownload(blob, fileName);
          }
        }
      }, 'image/png', 0.95);
    } catch (error) {
      console.error('Save failed:', error);
      alert(t('result.saveError'));
    }
  };

  const fallbackDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert(t('result.downloadSuccess'));
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
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    sharedBanner: {
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: '#fff',
      padding: '1rem',
      borderRadius: '0.8rem',
      marginBottom: '1rem',
      textAlign: 'center' as const,
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
      border: '1px solid rgba(139, 92, 246, 0.4)'
    }
  };

  return (
    <div style={resultStyle.container}>
      <div ref={resultRef} style={resultStyle.resultCard}>
        {isShared && (
          <div style={resultStyle.sharedBanner}>
            <strong>{t('result.sharedResult')}</strong>
            <br />
            {t('result.sharedDescription')}
          </div>
        )}
        
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
            {isShared ? t('result.takeTest') : t('result.retryButton')}
          </button>
          
          <button
            style={{...resultStyle.button, ...resultStyle.saveButton}}
            onClick={handleSave}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.3)';
            }}
          >
            📱 {t('result.saveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
