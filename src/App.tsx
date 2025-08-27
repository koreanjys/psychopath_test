import React, { useState } from 'react';
import './lib/i18n';
import './index.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Intro from './components/test/Intro';
import Question from './components/test/Question';
import Loading from './components/test/Loading';
import Result from './components/test/Result';
import { questions } from './data/questions';
import { calculateResult } from './data/scoring';
import { TestPhase, UserAnswer, TestResult } from './types/test';

const App: React.FC = () => {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleStart = () => {
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
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const renderPhase = () => {
    switch (phase) {
      case 'intro':
        return <Intro onStart={handleStart} />;
      case 'question':
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
        return result ? <Result result={result} onRestart={handleRestart} /> : null;
      default:
        return <Intro onStart={handleStart} />;
    }
  };

  return (
    <div style={appStyle}>
      <Header />
      {renderPhase()}
      <Footer />
    </div>
  );
};

export default App;
