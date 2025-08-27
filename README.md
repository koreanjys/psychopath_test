# 사이코패스 테스트 - 어둠 속 진실

## 프로젝트 개요
당신의 내면 깊숙이 숨겨진 어두운 면을 탐구하는 심리 테스트 웹 애플리케이션입니다. 5개의 심리학적 질문을 통해 사이코패스 성향을 분석하고 결과를 제공합니다.

## 기술 스택
- **Frontend**: React 18.3+ + TypeScript 5.6+ + Vite 5.4+
- **Styling**: 인라인 CSS (일관된 디자인 시스템)
- **Internationalization**: react-i18next (한/영 지원)
- **Deployment**: Cloudflare Pages

## 프로젝트 구조
```
psychopath-test/
├── src/
│   ├── components/
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Header.tsx   # 헤더 (JYBR 홈 링크 포함)
│   │   │   └── Footer.tsx   # 푸터 (브랜딩)
│   │   └── test/            # 테스트 전용 컴포넌트
│   │       ├── Intro.tsx    # 시작 화면
│   │       ├── Question.tsx # 질문 화면
│   │       ├── Progress.tsx # 진행률 표시
│   │       ├── Loading.tsx  # 로딩 화면
│   │       └── Result.tsx   # 결과 화면
│   ├── data/               # 테스트 데이터
│   │   ├── questions.ts    # 질문 데이터
│   │   ├── scoring.ts      # 점수 계산 로직
│   │   └── results.ts      # 결과 유형 정의
│   ├── lib/
│   │   ├── i18n.ts         # 다국어 설정
│   │   └── utils.ts        # 유틸리티 함수
│   ├── locales/
│   │   ├── ko.json         # 한국어 번역
│   │   └── en.json         # 영어 번역
│   ├── types/
│   │   └── test.ts         # 테스트 관련 타입
│   ├── App.tsx             # 메인 애플리케이션
│   ├── main.tsx            # 앱 진입점
│   └── index.css           # 글로벌 스타일
├── public/
│   ├── robots.txt
│   └── _headers            # Cloudflare Pages 설정
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 기능 구현 상태

### ✅ 완료된 기능
- [x] React + TypeScript + Vite 프로젝트 설정
- [x] 어두운 테마 디자인 시스템
- [x] 시작 화면 (타이틀, 설명, 시작 버튼)
- [x] 기본 컴포넌트 구조 (Header, Footer, Progress)
- [x] 점수 계산 시스템 (0%, 25%, 50%, 75%, 100%)
- [x] 반응형 디자인 기본 구조
- [x] SEO 최적화 기본 설정 (메타 태그, robots.txt)
- [x] Cloudflare Pages 배포 설정

### 🔧 부분 완료 (디버깅 필요)
- [~] 다국어 지원 (한국어/영어) - i18n 초기화 이슈
- [~] 질문 화면 - 상태 전환 로직 검증 필요
- [~] 로딩 화면 - 진행률 애니메이션 테스트 필요
- [~] 결과 화면 - 공유/재시작 기능 테스트 필요
- [~] JYBR 허브 연동 (헤더/푸터) - 링크 및 스타일링 검증 필요

### 🔄 추가 작업 필요
- [ ] **i18n 초기화 이슈 수정**: Suspense 또는 로딩 상태로 번역 완료 대기
- [ ] **상태 전환 로직 디버깅**: 시작 버튼 클릭 시 질문 화면으로 이동 확인
- [ ] **컴포넌트 렌더링 검증**: 각 단계별 화면 전환 테스트
- [ ] **이미지 교체**: 각 질문과 결과에 맞는 오싹한 이미지로 교체
- [ ] **질문 개선**: 더 심리학적이고 무의식을 이끌어내는 질문으로 업그레이드
- [ ] **결과 분석 개선**: 더 정교한 심리 분석 내용 작성
- [ ] **성능 최적화**: 번들 사이즈 60KB 목표 달성
- [ ] **브라우저 호환성 테스트**: 크로스 브라우저 동작 확인

## 🐛 알려진 이슈 및 디버깅

### 현재 이슈
1. **시작 화면에서 진행되지 않는 문제**
   - 증상: 시작 버튼 클릭 시 질문 화면으로 전환되지 않음
   - 예상 원인: i18n 초기화 지연 또는 상태 관리 이슈
   - 디버깅 방법: 브라우저 개발자 도구 콘솔에서 오류 확인

### 디버깅 가이드
```bash
# 1. 개발 서버 실행
npm run dev

# 2. 브라우저에서 http://localhost:3000 접속
# 3. F12로 개발자 도구 열기
# 4. Console 탭에서 오류 메시지 확인
# 5. Network 탭에서 리소스 로딩 상태 확인
```

### 긴급 수정 체크리스트
- [ ] i18n 초기화 완료 상태 확인
- [ ] React 상태 변경 로직 검증
- [ ] 이벤트 핸들러 바인딩 확인
- [ ] 컴포넌트 조건부 렌더링 검증

## 개발자 작업 가이드

### 1. 이미지 교체
현재 Unsplash 플레이스홀더 이미지를 사용 중입니다. 아래 파일에서 이미지 URL을 교체하세요:

**질문 이미지** (`src/data/questions.ts`):
```typescript
// 각 질문 객체의 image 속성
image: "YOUR_CREEPY_IMAGE_URL_HERE"
```

**결과 이미지** (`src/data/results.ts`):
```typescript
// 각 결과 객체의 image 속성  
image: "YOUR_RESULT_IMAGE_URL_HERE"
```

**시작 화면 이미지** (`src/components/test/Intro.tsx`):
```typescript
// 라인 94 근처
src="YOUR_MAIN_CREEPY_IMAGE_URL_HERE"
```

### 2. 질문 개선
`src/data/questions.ts`에서 더 정교한 심리학적 질문으로 교체:
- 직접적이지 않고 비유적인 형태
- 무의식의 어두운 면을 이끌어내는 질문
- 3개 선택지로 구성 (0점, 1점, 2점)

### 3. 결과 분석 개선
`src/data/results.ts`에서 더 전문적인 심리 분석 내용 작성:
- 각 결과별 약 200자 분량
- 심리학적 근거가 있는 분석
- 건설적인 조언 포함

## 실행 방법

### 개발 서버 실행
```bash
npm install
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 배포 가이드

### Cloudflare Pages 배포
1. GitHub에 프로젝트 푸시
2. Cloudflare Pages에서 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18+

### 도메인 설정
- 목표 도메인: `psychopath.jybr.me`
- DNS 설정 및 SSL 인증서 자동 적용

## 성능 목표
- 번들 크기: 60KB gzipped 이하
- First Contentful Paint: 1.5초 이하
- Largest Contentful Paint: 2.5초 이하
- Core Web Vitals 최적화

## 접근성
- WCAG 2.1 AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비비 4.5:1 이상

## 라이센스
MIT License

## 기여 가이드
1. 이슈 등록 후 작업 시작
2. 기능별 브랜치 생성
3. 커밋 메시지 규칙 준수
4. PR 생성 및 리뷰 요청

---

**이 프로젝트는 JYBR 플랫폼의 일부입니다.**  
**메인 허브**: https://jybr.me
