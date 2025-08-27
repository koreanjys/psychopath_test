import React from 'react';
import { useTranslation } from 'react-i18next';
import { Question as QuestionType } from '../../types/test';

interface QuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOption: number, score: number) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer 
}) => {
  const { i18n, t } = useTranslation();
  
  // 언어 매핑: ko-KR, ko-kr, ko 등을 모두 'ko'로, en-US, en-us, en 등을 모두 'en'으로
  const normalizeLanguage = (lang: string): 'ko' | 'en' => {
    const lowerLang = lang.toLowerCase();
    if (lowerLang.startsWith('ko')) return 'ko';
    if (lowerLang.startsWith('en')) return 'en';
    return 'ko'; // 기본값
  };
  
  const currentLang = normalizeLanguage(i18n.language || 'ko');

  console.log('Question component rendered:', { question, currentIndex, totalQuestions });
  console.log('Current language:', currentLang, 'Original:', i18n.language);

  const handleAnswer = (optionIndex: number) => {
    const score = question.scoring[optionIndex];
    console.log('Answer selected:', { optionIndex, score });
    onAnswer(question.id, optionIndex, score);
  };

  const questionStyle = {
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
    }
  };

  // 질문 데이터 검증
  if (!question || !question.text || !question.options) {
    console.error('Invalid question data:', question);
    return (
      <div style={questionStyle.container}>
        <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
          {t('test.dataError')}
        </div>
      </div>
    );
  }

  if (!question.text[currentLang] || !question.options[currentLang]) {
    console.error('Missing translation for language:', currentLang);
    return (
      <div style={questionStyle.container}>
        <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
          {t('test.translationError')}
        </div>
      </div>
    );
  }

  return (
    <div style={questionStyle.container}>
      <div style={{ color: '#fff', textAlign: 'center', padding: '2rem', maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '2rem' }}>{t('test.questionTitle')}</h2>
        <p style={{ marginBottom: '1rem' }}>{t('test.questionNumber', { current: currentIndex + 1, total: totalQuestions })}</p>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
          {question.text[currentLang]}
        </p>
        
        <div style={{ marginTop: '2rem' }}>
          {question.options[currentLang].map((option, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(index)}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                color: '#fff', 
                padding: '1rem', 
                border: '1px solid rgba(255, 255, 255, 0.3)', 
                borderRadius: '0.5rem',
                margin: '0.5rem 0',
                cursor: 'pointer',
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
                e.currentTarget.style.borderColor = '#ff6b6b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              <span style={{ marginRight: '1rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
