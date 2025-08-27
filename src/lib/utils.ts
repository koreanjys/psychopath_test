import { SharedResultData } from '../types/test';

// 동적 메타데이터 업데이트 함수
export const updateMetadata = (title: string, description: string, lang: 'ko' | 'en' = 'ko') => {
  // 페이지 제목 업데이트
  document.title = title;
  
  // HTML lang 속성 업데이트
  document.documentElement.lang = lang;
  
  // 메타 태그 업데이트 함수
  const updateMetaTag = (selector: string, content: string) => {
    let element = document.querySelector(selector) as HTMLMetaElement;
    if (element) {
      element.content = content;
    } else {
      // 태그가 없으면 생성
      element = document.createElement('meta');
      if (selector.includes('property')) {
        element.setAttribute('property', selector.split('=')[1].replace(/[\[\]"]/g, ''));
      } else {
        element.setAttribute('name', selector.split('=')[1].replace(/[\[\]"]/g, ''));
      }
      element.content = content;
      document.head.appendChild(element);
    }
  };
  
  // 각종 메타 태그 업데이트
  updateMetaTag('meta[name="description"]', description);
  updateMetaTag('meta[property="og:title"]', title);
  updateMetaTag('meta[property="og:description"]', description);
  updateMetaTag('meta[name="twitter:title"]', title);
  updateMetaTag('meta[name="twitter:description"]', description);
  
  console.log('Meta tags updated:', { title, description, lang });
};

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
  
  // 한국어인 경우 ko.html로, 영어인 경우 기본 페이지로 (방향 전환!)
  const basePath = language === 'ko' ? '/ko.html' : '/';
  const origin = window.location.origin;
  const searchParams = new URLSearchParams(params);
  const shareUrl = `${origin}${basePath}?${searchParams.toString()}`;
  
  console.log('🔗 Generated share URL:', {
    language,
    basePath,
    params,
    shareUrl
  });
  
  return shareUrl;
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
