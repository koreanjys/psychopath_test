import { UserAnswer } from '../types/test';
import { results } from '../data/results';
import { questions } from '../data/questions';

export const calculateResult = (answers: UserAnswer[]) => {
  // 빈 답변 배열 검증
  if (!answers || answers.length === 0) {
    console.warn('No answers provided, returning default result');
    return results[0];
  }

  // 답변 개수와 질문 개수 일치 검증
  if (answers.length !== questions.length) {
    console.warn('Answer count does not match question count:', {
      answersCount: answers.length,
      questionsCount: questions.length
    });
  }

  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  
  // 실제 질문 데이터를 기반으로 최대 점수 계산
  const maxScore = questions.reduce((sum, question) => {
    return sum + Math.max(...question.scoring);
  }, 0);
  
  // NaN 방지를 위한 검증
  if (maxScore === 0) {
    console.error('Max score is 0, cannot calculate percentage');
    return results[0];
  }
  
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  console.log('Score calculation:', { 
    totalScore, 
    maxScore, 
    percentage, 
    answersCount: answers.length,
    questionsCount: questions.length
  });
  
  // 점수를 기준으로 결과 유형 결정
  if (percentage === 0) return results[0];
  if (percentage <= 25) return results[1];
  if (percentage <= 50) return results[2];
  if (percentage <= 75) return results[3];
  return results[4];
};
