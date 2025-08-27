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
import { decodeResultFromUrl, clearUrlParams, updateMetadata } from './lib/utils';
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
    
    // HTML 페이지 경로를 확인하여 기본 언어 설정 (방향 전환!)
    const isKoreanPage = window.location.pathname.includes('ko.html');
    const defaultLanguage = isKoreanPage ? 'ko' : 'en'; // 기본이 영어로 변경
    
    console.log('🌐 Page detection:', {
      pathname: window.location.pathname,
      isKoreanPage,
      defaultLanguage,
      sharedData
    });
    
    if (sharedData) {
      // 언어 정규화 함수
      const normalizeLanguage = (lang: string): 'ko' | 'en' => {
        const lowerLang = lang.toLowerCase();
        if (lowerLang.startsWith('ko')) return 'ko';
        if (lowerLang.startsWith('en')) return 'en';
        return defaultLanguage; // 페이지에 따른 기본값
      };
      
      // 공유된 언어 정보가 있으면 언어 변경, 없으면 페이지 기본값 사용
      const targetLanguage = sharedData.language ? 
        normalizeLanguage(sharedData.language) : 
        defaultLanguage;
      
      console.log('🔍 Language setting:', {
        sharedLanguage: sharedData.language,
        targetLanguage,
        currentLanguage: i18n.language
      });
      
      if (targetLanguage !== i18n.language) {
        i18n.changeLanguage(targetLanguage);
      }
      
      // 공유된 결과가 있으면 해당 결과로 바로 이동
      const sharedResult = results.find(r => r.percentage === sharedData.percentage);
      if (sharedResult) {
        setResult(sharedResult);
        setPhase('result');
        setIsSharedResult(true);
      }
    } else if (isKoreanPage && i18n.language !== 'ko') {
      // 한국어 페이지에서 로드되었지만 공유 데이터가 없는 경우 한국어로 설정
      console.log('�� Setting language to Korean for ko.html page');
      i18n.changeLanguage('ko');
    } else if (!isKoreanPage && i18n.language !== 'en') {
      // 기본 페이지(영어)에서 로드되었지만 언어가 영어가 아닌 경우
      // 한국어 사용자라면 자동으로 한국어로 전환할 수 있지만, 
      // 일단 기본 영어 유지 (나중에 자동 리다이렉트 추가 가능)
      console.log('🇺🇸 Default page loaded, keeping current language or using English');
    }
  }, [i18n]); // i18n 의존성 추가

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

  // 언어 변경 시 메타데이터 업데이트
  useEffect(() => {
    if (isI18nReady) {
      const currentLang = i18n.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
      const title = t('meta.title');
      const description = t('meta.description');
      updateMetadata(title, description, currentLang);
    }
  }, [i18n.language, isI18nReady, t]);

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
