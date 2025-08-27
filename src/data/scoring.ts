import { UserAnswer } from '../types/test';
import { results } from '../data/results';

export const calculateResult = (answers: UserAnswer[]) => {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const maxScore = answers.length * 2; // 각 질문당 최대 2점
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  // 점수를 기준으로 결과 유형 결정
  if (percentage === 0) return results[0];
  if (percentage <= 25) return results[1];
  if (percentage <= 50) return results[2];
  if (percentage <= 75) return results[3];
  return results[4];
};
