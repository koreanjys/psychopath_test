import React from 'react';
import { useTranslation } from 'react-i18next';
import { Question as QuestionType } from '../../types/test';
import Progress from './Progress';

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
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'ko' | 'en';

  const handleAnswer = (optionIndex: number) => {
    const score = question.scoring[optionIndex];
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
    },
    questionCard: {
      maxWidth: '800px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    questionText: {
      fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
      lineHeight: '1.6',
      marginBottom: '2rem',
      textAlign: 'center' as const,
      color: '#fff',
      fontWeight: '500'
    },
    imageContainer: {
      width: '100%',
      maxWidth: '400px',
      height: '250px',
      margin: '2rem auto',
      borderRadius: '0.8rem',
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
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      marginTop: '2rem'
    },
    option: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.8rem',
      padding: '1.5rem',
      color: '#fff',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left' as const,
      lineHeight: '1.5'
    }
  };

  return (
    <div style={questionStyle.container}>
      <Progress current={currentIndex + 1} total={totalQuestions} />
      
      <div style={questionStyle.questionCard}>
        <h2 style={questionStyle.questionText}>
          {question.text[currentLang]}
        </h2>
        
        <div style={questionStyle.imageContainer}>
          <img 
            src={question.image}
            alt={`Question ${question.id}`}
            style={questionStyle.image}
          />
          {/* 개발자 참고: 각 질문에 맞는 오싹한 이미지로 교체하세요 */}
        </div>
        
        <div style={questionStyle.optionsContainer}>
          {question.options[currentLang].map((option, index) => (
            <button
              key={index}
              style={questionStyle.option}
              onClick={() => handleAnswer(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 107, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
