import { SharedResultData } from '../types/test';

export const shareResults = async (title: string, text: string, url?: string) => {
  const shareUrl = url || window.location.href;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: shareUrl
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Web Share API 실패 시 폴백
      fallbackShare(text, shareUrl);
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    fallbackShare(text, shareUrl);
  }
};

const fallbackShare = async (text: string, url: string) => {
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    alert('링크가 클립보드에 복사되었습니다!');
  } catch (error) {
    console.error('Clipboard API failed:', error);
    // 클립보드 API도 실패한 경우
    prompt('링크를 복사하세요:', `${text} ${url}`);
  }
};

export const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// URL 파라미터 관련 유틸리티 함수들
export const getUrlParams = () => {
  return new URLSearchParams(window.location.search);
};

export const setUrlParams = (params: Record<string, string>) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  window.history.pushState({}, '', url.toString());
};

export const clearUrlParams = () => {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url.toString());
};

// 결과 상태를 URL에 인코딩/디코딩
export const encodeResultToUrl = (percentage: number, resultIndex: number, language?: string) => {
  const params: Record<string, string> = {
    result: percentage.toString(),
    type: resultIndex.toString(),
    shared: 'true'
  };
  
  // 언어 정보가 있으면 URL에 포함
  if (language) {
    params.lang = language;
  }
  
  setUrlParams(params);
  return window.location.href;
};

export const decodeResultFromUrl = (): SharedResultData | null => {
  const params = getUrlParams();
  const percentage = params.get('result');
  const type = params.get('type');
  const shared = params.get('shared');
  const language = params.get('lang'); // 언어 정보 추가
  
  console.log('URL parameters:', { percentage, type, shared, language });
  
  if (percentage && type && shared) {
    const parsedPercentage = parseInt(percentage, 10);
    const parsedType = parseInt(type, 10);
    
    // 파싱 결과 검증
    if (isNaN(parsedPercentage) || isNaN(parsedType)) {
      console.error('Invalid URL parameters:', { percentage, type });
      return null;
    }
    
    // 범위 검증
    if (parsedPercentage < 0 || parsedPercentage > 100) {
      console.error('Percentage out of range:', parsedPercentage);
      return null;
    }
    
    if (parsedType < 0 || parsedType > 4) { // 결과 타입은 0-4 범위
      console.error('Result type out of range:', parsedType);
      return null;
    }
    
    const result = {
      percentage: parsedPercentage,
      resultIndex: parsedType,
      isShared: true,
      language: language || undefined // 언어 정보 포함
    };
    
    console.log('Decoded shared result:', result);
    return result;
  }
  return null;
};
