import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './lib/i18n';
import './index.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ImagePreloader from './components/common/ImagePreloader';
import Intro from './components/test/Intro';
import Question from './components/test/Question';
import Loading from './components/test/Loading';
import Result from './components/test/Result';
import { questions } from './data/questions';
import { calculateResult } from './data/scoring';
import { results } from './data/results';
import { decodeResultFromUrl, clearUrlParams } from './lib/utils';
import { TestPhase, UserAnswer, TestResult } from './types/test';

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // URL에서 공유된 결과 확인 - useCallback으로 메모이제이션
  const checkSharedResult = useCallback(() => {
    const sharedData = decodeResultFromUrl();
    if (sharedData) {
      // 공유된 결과가 있으면 해당 결과로 바로 이동
      const sharedResult = results.find(r => r.percentage === sharedData.percentage);
      if (sharedResult) {
        setResult(sharedResult);
        setPhase('result');
        setIsSharedResult(true);
      }
    }
  }, []); // 의존성 없음 - 모든 필요한 값이 함수 내부에서 직접 계산됨

  useEffect(() => {
    // i18n 초기화 완료 확인
    if (i18n.isInitialized) {
      setIsI18nReady(true);
      checkSharedResult();
    } else {
      i18n.on('initialized', () => {
        setIsI18nReady(true);
        checkSharedResult();
      });
    }
  }, [i18n, checkSharedResult]); // checkSharedResult 의존성 추가

  const handleStart = () => {
    console.log('Starting test...'); // 디버깅용
    setPhase('question');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (questionId: number, selectedOption: number, score: number) => {
    const newAnswer: UserAnswer = {
      questionId,
      selectedOption,
      score
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setPhase('loading');
    }
  };

  const handleLoadingComplete = () => {
    const testResult = calculateResult(answers);
    setResult(testResult);
    setPhase('result');
  };

  const handleRestart = () => {
    setPhase('intro');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setIsSharedResult(false);
    clearUrlParams(); // URL 파라미터 클리어
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const renderPhase = () => {
    console.log('Current phase:', phase); // 디버깅용
    console.log('Current question index:', currentQuestionIndex); // 디버깅용
    console.log('Questions array:', questions); // 디버깅용
    
    switch (phase) {
      case 'intro':
        return <Intro onStart={handleStart} />;
      case 'question':
        if (!questions[currentQuestionIndex]) {
          console.error('Question not found at index:', currentQuestionIndex);
          return <div style={{ color: '#fff', padding: '2rem' }}>{t('common.noQuestionError')}</div>;
        }
        return (
          <Question
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        );
      case 'loading':
        return <Loading onComplete={handleLoadingComplete} />;
      case 'result':
        return result ? <Result result={result} onRestart={handleRestart} isShared={isSharedResult} /> : null;
      default:
        return <Intro onStart={handleStart} />;
    }
  };

  // i18n이 준비되지 않았으면 로딩 표시
  if (!isI18nReady) {
    return (
      <div style={{
        ...appStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>
          {i18n.language ? t('common.loading') : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div style={appStyle}>
      <ImagePreloader />
      <Header />
      {renderPhase()}
      <Footer />
    </div>
  );
};

export default App;
