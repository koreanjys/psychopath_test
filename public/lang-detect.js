// 언어 감지 및 자동 리다이렉트 스크립트
(function() {
  // 이미 ko.html 페이지에 있다면 리다이렉트하지 않음
  if (window.location.pathname.includes('ko.html')) {
    return;
  }
  
  // URL에 공유 파라미터가 있다면 리다이렉트하지 않음 (공유 링크는 그대로 유지)
  if (window.location.search.includes('r=') || window.location.search.includes('result=')) {
    return;
  }
  
  // 브라우저 언어 감지
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const isKorean = browserLang.toLowerCase().startsWith('ko');
  
  // 로컬 스토리지에서 사용자 선택 언어 확인
  const savedLang = localStorage.getItem('i18nextLng');
  const userPreferKorean = savedLang?.toLowerCase().startsWith('ko');
  
  console.log('🌐 Language detection:', {
    browserLang,
    isKorean,
    savedLang,
    userPreferKorean,
    pathname: window.location.pathname
  });
  
  // 한국어 사용자이고 메인 페이지에 있다면 ko.html로 리다이렉트
  if ((isKorean || userPreferKorean) && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
    const newUrl = window.location.origin + '/ko.html' + window.location.search + window.location.hash;
    console.log('🇰🇷 Redirecting to Korean page:', newUrl);
    window.location.replace(newUrl);
  }
})();
