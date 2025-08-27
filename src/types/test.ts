export interface Question {
  id: number;
  text: { ko: string; en: string };
  image: string; // 이미지 URL - 개발자가 질문에 맞는 오싹한 이미지를 선택하여 설정
  options: { 
    ko: string[]; 
    en: string[]; 
  };
  scoring: number[]; // 각 선택지별 점수 (0, 1, 2)
}

export interface TestResult {
  percentage: number;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  image: string; // 결과에 맞는 이미지 URL
}

export interface UserAnswer {
  questionId: number;
  selectedOption: number;
  score: number;
}

export type TestPhase = 'intro' | 'question' | 'loading' | 'result';
