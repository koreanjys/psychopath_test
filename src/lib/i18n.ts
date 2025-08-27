import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import koTranslations from '../locales/ko.json';
import enTranslations from '../locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: koTranslations },
      en: { translation: enTranslations }
    },
    fallbackLng: 'ko',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      // 한국어 관련 모든 코드를 'ko'로 매핑
      convertDetectedLanguage: (lng: string) => {
        // 한국어 관련 코드들 (ko, ko-KR, ko-kr, kor 등)
        if (lng.toLowerCase().startsWith('ko')) return 'ko';
        // 그 외는 모두 영어로
        return 'en';
      }
    },
    // 지원하는 언어 명시
    supportedLngs: ['ko', 'en'],
    // 지원하지 않는 언어는 fallback 사용
    nonExplicitSupportedLngs: true
  });

export default i18n;
