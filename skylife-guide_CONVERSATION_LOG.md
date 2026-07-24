# skylife-guide 작업 로그

## 2026-03-27

### 작업 내용

**1. 검색바 퀵링크 추가**
- 검색바 오른쪽에 요금제 리스트 / 수수료 계산기 아웃링크 버튼 추가
- 요금제 리스트 → https://pjungjin85-sketch.github.io/skylife-plans/
- 수수료 계산기 → https://pjungjin85-sketch.github.io/skylife/
- 두 버튼 모두 레드 컬러로 통일

**2. 부가서비스 버튼 추가**
- 요금제 리스트와 수수료 계산기 사이에 부가서비스 버튼 추가
- 부가서비스 → https://pjungjin85-sketch.github.io/skylife-addons/

**3. FAQ 버튼 추가**
- 수수료 계산기 옆에 FAQ 버튼 추가
- FAQ → https://pjungjin85-sketch.github.io/skylife-mobile-faq/

**퀵링크 최종 순서:** 요금제 리스트 → 부가서비스 → 수수료 계산기 → FAQ

---

**4. 카드 다중 열기 변경**
- 기존: 카드 하나 열면 나머지 자동 닫힘 (single open)
- 변경: 여러 카드 동시에 열기 가능 (multi open)

---

**5. 반응형(Responsive) 레이아웃 적용**
- `@media (max-width: 768px)` 미디어 쿼리 추가
- PC (769px 이상): 기존 카드 그리드 유지, 퀵링크 표시
- 모바일 (768px 이하):
  - 하단 탭바 4개 (영업 / 가입 / 유심 / 고객응대)
  - 탭 전환 시 해당 섹션만 표시
  - 카드 1열
  - 퀵링크 숨김

**6. 사이드바 목차 추가 후 제거**
- PC 좌측 고정 사이드 네비 추가했다가 사용자 요청으로 제거

---

### 현재 배포 URL
https://pjungjin85-sketch.github.io/skylife-guide/mobile_sales_guide.html

### 현재 버전
v1.0 (헤더 표시 기준) — 기능상 v1.2 수준

---

## 2026-03-27 — 푸터 디자인 통일

- 기존: `<footer>` inline style, 왼쪽 정렬 (`Created by 박정진`)
- 변경: 중앙정렬 + border-top + 페이지명 포함
  - `Created by 박정진 | 모바일 현장영업 안내`
- skylife-addons 푸터 스타일 기준으로 전 프로젝트 통일 작업의 일환
- 커밋: `b80289f` — style: 푸터 디자인 통일

---

## 2026-03-27 — 모바일 퀵링크 반응형 버그 수정

**문제:**
모바일에서 퀵링크 버튼(요금제 리스트·부가서비스·수수료 계산기·FAQ) 영역이 화면 밖으로 밀리거나, 반대로 버튼이 전부 사라지는 현상 반복 발생

**원인:**
CSS 파일 내 미디어쿼리가 중간에 위치하고, 검색바·퀵링크 기본 스타일이 그 뒤에 선언되어 모바일 규칙이 계속 덮어씌워지는 CSS 캐스케이딩 순서 문제

**해결:**
- 검색바 관련 모바일 규칙을 파일 맨 끝 별도 `@media(max-width:768px)` 블록으로 분리
- 모바일에서 퀵링크 숨기지 않고, 검색창 아래 2열(2×2) 배치로 변경
  - `.search-bar-inner{flex-wrap:wrap}` → 퀵링크가 검색창 아랫줄로 내려감
  - `.quick-link{width:calc(50% - 3px);flex:none}` → 버튼 4개 정확히 2×2 배치

**최종 레이아웃 (모바일):**
```
[검색창                        ]
[요금제 리스트] [부가서비스    ]
[수수료 계산기] [FAQ           ]
```

**커밋 이력:**
- `58d313b` — fix: 모바일에서 퀵링크 영역 화면 밖 overflow 수정 (1차, !important)
- `27a55fe` — fix: 모바일 퀵링크 버튼 숨김 해제 → 검색창 아래 2줄 레이아웃
- `deb3960` — fix: 모바일 퀵링크 버튼 2x2 배치 (50% 너비)
- `bf9afae` — fix: CSS 순서 문제 근본 해결 → 미디어쿼리 파일 끝으로 이동 (최종)

---

## 2026-03-28 — KT SkyLife CI 파비콘 추가

**배경:**
즐겨찾기/바탕화면 바로가기 아이콘이 글자 "모"로 표시되는 문제 → 파비콘 미설정 상태였음

**적용:**
- SVG data URI 방식으로 파비콘 추가 (`<link rel="icon" type="image/svg+xml">`)
- 헤더 CI 디자인 그대로 반영:
  - 상단 빨간 바 (헤더 border-top과 동일)
  - `kt` — 검정 (#1A1A1A) 굵은 텍스트
  - `skylife` — 빨간색 (#E60012) 굵은 텍스트
- 외부 파일 없이 HTML 단독으로 동작 (data URI 인라인)

**한계:**
- iOS/Android 홈화면 추가(apple-touch-icon)는 웹서버 환경에서만 완전 지원

**커밋:**
- `bd558fe` — feat: KT SkyLife CI 디자인 파비콘 추가 (kt 검정 + skylife 빨간색)

---

## 2026-04-06 — inquiry.html 삭제 / 모바일 내용 안 보이는 버그 수정

### inquiry.html 삭제
- `skylife-guide/inquiry.html` 파일 삭제 (skylife-inquiry 프로젝트로 이미 분리됨)
- index.html에서 참조 없음 확인 후 `git rm` 처리
- 커밋: `f0e7f07`

### 모바일 첫 화면 내용 미표시 버그 수정
**원인:** `DOMContentLoaded` 내 `if(window.innerWidth<=768)switchMobTab('sales')` 조건이 모바일 브라우저 초기화 타이밍에 따라 false가 되어 `switchMobTab` 미실행 → CSS `section{display:none}` 만 적용되고 `mob-active` 미추가 → 전체 내용 미표시

**수정 내용:**
- `if(window.innerWidth<=768)` 조건 제거 → 항상 `switchMobTab('sales')` 실행
- `sec-sales` 섹션에 `mob-active` 기본 클래스 추가 (JS 타이밍 실패 시 안전망)
- 첫 번째 모바일 탭 버튼에 `active` 기본 클래스 추가

- 커밋: `2d973f5`

---

## 2026-05-19 — 전산매뉴얼 퀵링크 제거 및 GitHub Pages 동기화

### GitHub Pages 상태 확인
- 배포 URL: `https://pjungjin85-sketch.github.io/skylife-guide/`
- Pages 상태 `built` / `success` 정상 확인
- 로컬이 origin보다 2커밋 앞서 있어 push 동기화 처리

### 전산매뉴얼 퀵링크 제거
- 검색바 퀵링크 5개 → 4개로 축소 (전산 매뉴얼 아웃링크 제거)
- **최종 퀵링크:** 요금제 리스트 / 부가서비스 / 수수료 계산기 / FAQ
- 모바일 CSS를 `flex wrap` → `grid 2x2` 방식으로 변경하여 4개 버튼 균등 배치
- 커밋: `782a413`

---

## 2026-06-06 — 수수료 계산기 퀵링크 제거 및 모바일 그리드 조정

### 변경 사항
- 검색바 퀵링크에서 수수료 계산기(`https://skylife-1s8i.vercel.app/`) 제거
- **최종 퀵링크:** 요금제 리스트 / 부가서비스 / FAQ (3개)
- 모바일 CSS: `grid-template-columns: 1fr 1fr` (2×2) → `repeat(3, 1fr)` (3열 1행) 변경
- 커밋: `792b89c`

---

## 2026-06-07 — TPS 퀵링크 추가 / 헤더 문구 수정

### TPS 계산기 퀵링크 추가
- 검색바 퀵링크 맨 왼쪽(첫 번째)에 TPS 계산기 버튼 추가
- URL: `https://skylife-tps.vercel.app/`
- **최종 퀵링크 순서:** TPS 계산기 / 요금제 리스트 / 부가서비스 / FAQ
- 커밋: `a5e9ab4`

### 헤더 서브타이틀 수정
- 변경 전: "대리점 · 설치기사 전용" + "v1.0" (2줄)
- 변경 후: "대리점/설치기사님 전용 v2.0" (1줄)
- 커밋: `8ab5df7`

---

## 2026-06-09 — 요금제 테이블 업데이트 (plans.json 기준 정비)

### 변경 사항

#### 1. 고객용 요금제 테이블 (요금제 설명&비교 카드)
- 초슬림 500M/60분 삭제 (판매 중단)
- 슬림 요금제 가격 plans.json 실제 데이터 반영 (3,900→2,900원 등)
- 모두 충분 7GB+(모아진) 16,200원 추가
- 오름차순 정렬 (2,900 / 3,900 / 4,900 / 5,900 / 16,200원)
- 컬럼명 "스펙" → "데이터/통화"로 변경

#### 2. 대리점용 요금제 테이블
- 기존 7GB+ 위주 5개 → SKY 전용 요금제 5개로 재구성
- sky A 11/13은 미반영 (멀티룸 전용이라 제외)
- SKY 모두 충분 7GB+(모아진) 17,900원
- SKY 모두 충분 10GB+(모아진) 19,900원
- SKY 모두 충분 15GB+(모아진) 22,400원
- SKY 모두 충분 11GB+(모아진) 34,000원
- SKY 모두 충분 100GB+(모아진) 39,900원
- 오름차순 정렬

- 커밋: `819036d`

---

#### 3. 외부 수정 (사용자 직접)
- `<meta name="robots" content="noindex, nofollow">` 추가 (검색 노출 차단)
- `<meta name="googlebot" content="noindex, nofollow">` 추가
- `<title>` 변경: "KT SkyLife 모바일 현장영업 안내" → "kt skylife 모바일 현장영업 안내" (소문자)

---

## 2026-04-02 — 검색 띄어쓰기 무시 기능

### 변경 사항
- 검색 정규식에서 공백을 `\s*`로 치환하여 띄어쓰기 무시
- "데이터 차단" → `/데이터\s*차단/gi` → 공백 유무 상관없이 매칭 + 하이라이트 정상 동작
- 수정 위치: `doSearch()` 함수 내 `re` 생성 부분 (mobile_sales_guide.html)
- 커밋: `ce704ce`

---

## 2026-06-11

### 작업 내용
- `<meta name="robots" content="noindex, nofollow">` 및 `<meta name="googlebot" content="noindex, nofollow">` 추가 (검색엔진 색인 차단)
- 번호이동 사전동의 ARS 테이블 재구성: 4컬럼(통신망별) → 2컬럼(통신사/번호), 동일 번호 통신사 병합, 헬로모바일·LGU+ 행 추가
- `#searchClear` 버튼에 `style="display:none"` 인라인 추가 → HTML 파싱 시 FOUC 방지
- 브랜드 표기 통일: `KT SkyLife`, `KT 스카이라이프` → `kt skylife` (title, 영업스크립트 본문 포함)
- footer 표기 통일: `Created by 박정진 | 모바일 현장영업 안내`
- footer 스타일 통일 (FAQ 기준): `position:fixed;bottom:0;padding:10px;color:#666666;z-index:50`
- 모바일에서 fixed footer + mobile-tab-bar 겹침 수정: `@media(max-width:768px){ footer{display:none;} }`

### 버그 수정 (코드 리뷰)
- `toggle()` 함수: `querySelector('[onclick=...]')` → `panel.parentElement` 로 교체 (특수문자 취약성 제거)
- 검색 정규식 `re.lastIndex` 미리셋 누락 수정: `re.test()` 호출 직후 `re.lastIndex=0` 추가 (2곳)

---

## 2026-07-16 업데이트 — Supabase 프로젝트 마이그레이션 + 관리자 인증 정비

### 1. Supabase 프로젝트 마이그레이션
- 회원가입/승인제 로그인(`profiles` 테이블)이 참조하던 기존 Supabase 프로젝트(`zeiygknvggokauetgrzk`)가 90일 초과 일시정지로 API 복구 불가 확인
- 이 프로젝트는 skylife-guide 포함 워크스페이스 6개 사이트가 공유 중이었음 (상세는 skylife-inquiry의 `skylife-inquiry_CONVERSATION_LOG.md` 참고)
- 신규 프로젝트 `skylife-shared`(ref `qvzlwhwxspmofrwdvgdd`)로 URL/KEY 전량 교체, `schema_accounts.sql` 재적용
- 관리자 계정(`admin@skylife-agent.local`, `profiles.is_admin=true`) 신규 생성 완료 — 비밀번호는 대화창으로만 전달, 이 파일엔 미기록

### 2. 관리자 인증 방식 수정 (보안 이슈)
- `schema_accounts.sql`의 `admin_list_accounts`/`admin_set_status` RPC가 원래 `pw_hash` 파라미터를 `anon` 권한으로 직접 비교하는 방식이었음 — 해시가 이미 admin.html에 공개된 값이라 Supabase API를 직접 호출하면 우회 가능한 구조
- `pw_hash` 파라미터 제거, `profiles.is_admin` + `auth.uid()` 기반 인증으로 교체, `grant`도 `authenticated`로만 제한

### 3. 미해결 — SSO 토큰 URL 전달 방식
- `applySsoToLinks()`가 로그인 후 액세스 토큰을 URL fragment(`#sso=...`)로 TPS/skylife-addons/skylife-mobile-faq/skylife-plans 퀵링크에 실어 전달하는 방식
- 자동 보안 스캔에서 HIGH로 플래그됨 (수신 측에서 `history.replaceState` 즉시 제거 + `getUser()` 서버 검증은 이미 적용되어 있어 기본 방어는 있음)
- 근본 해결은 postMessage 또는 서버 측 토큰 교환 방식 전환 — **사용자 결정 대기 중** (2026-07-16 기준 미결)
- 이번에 처음으로 실제 배포됨 (이전엔 미커밋 상태로 로컬에만 있었음)

---

## 2026-07-20 — 신규 Supabase 프로젝트 실사용 테스트 + 버그 수정

### 1. 서브페이지(TPS/plans/addons/mobile-faq) 세션 유지 버그 수정
- 증상: 허브에서 로그인 후 퀵링크로 서브페이지 진입 → 새로고침하면 다시 로그인 화면이 뜸
- 원인: `init()`이 `sessionStorage` 플래그가 있어도 `sb.auth.getSession()`으로 재확인했는데, SSO 토큰 경로로 들어온 경우 그 페이지의 `sb` 클라이언트는 실제 로그인(signIn)을 한 적이 없어(토큰 검증은 별도 `tokenClient`로 수행) 재확인이 항상 실패
- 수정: `sessionStorage` 플래그만으로 판단하도록 단순화 (기존 수수료계산기 등과 동일한 패턴)

### 2. 서브페이지 로그인 화면 깜빡임 제거
- 증상: SSO 토큰 검증 중 로그인 폼이 잠깐 보였다가 사라짐
- 수정: `#lock-loading` 스피너를 기본으로 보여주고, 토큰 검증 실패 시에만 로그인 폼(`#login-area`) 노출하도록 변경

### 3. 로그아웃 버튼 추가
- 기존엔 로그인 세션이 `localStorage`에 영구 저장되는데 로그아웃 버튼이 없어서, 재테스트하려면 브라우저 저장소를 수동으로 지워야 했음
- 헤더에 `#logout-btn` 추가, `unlockGuide()` 시점에 노출, `signOut()` + 새로고침

### 4. "반려" → "정지" 문구 변경
- 관리자가 이미 승인된 계정을 다시 반려 상태로 바꾸면 사실상 이용 정지로 동작하는데, 문구가 "가입 반려" 뉘앙스라 어색했음
- 사용자 안내 메시지를 "이용이 제한된 계정입니다"로 변경 (`afterLogin()`의 `rejected` 분기)
- admin.html 쪽 버튼/뱃지 문구도 동일하게 정리 (상세는 skylife-inquiry 로그 참고)

### 5. 신규 프로젝트(`qvzlwhwxspmofrwdvgdd`) 기준 전체 플로우 실사용 검증 완료
- 회원가입 → 미승인 상태 로그인 차단 → 관리자 승인 → 로그인 성공 → 4개 서브페이지 자동 통과까지 실제 테스트로 확인
- 관련 RPC 버그(`admin_list_accounts` 컬럼 모호성/타입 불일치)는 skylife-inquiry 쪽 문제라 해당 로그에 기록

---

## 2026-07-20 업데이트 — 퀵링크 버튼 추가/변경 + GitHub Pages 빌드 오류 수정

### 1. 퀵링크에 "공지사항" 버튼 추가
- skylife-inquiry가 문의 페이지에서 공지사항 게시판으로 전환됨에 따라, 허브 퀵링크 맨 오른쪽에 아웃링크 버튼 추가
- `https://skylife-inquiry.vercel.app/`, 종 모양 아이콘, `quick-link calc` 클래스 재사용

### 2. "TPS 계산기" → "결합계산기" 이름 변경
- 퀵링크 버튼 라벨만 변경 (링크는 기존 `skylife-tps.vercel.app` 그대로)

### 3. GitHub Pages 빌드 오류 수정
- 증상: push 후에도 `pjungjin85-sketch.github.io/skylife-guide/`가 며칠 전 버전으로 고정, `gh api .../pages/builds/latest` 확인 결과 "Page build failed" → 이후 커밋 빌드도 장시간 "building"에서 멈춤
- 조치: 저장소가 순수 정적 HTML인데 legacy Jekyll 빌드가 처리하다 실패하는 것으로 보여 `.nojekyll` 파일 추가 → 이후 커밋부터 정상 빌드(built) 확인
- 별개로, 이전 세션에서 백그라운드로 남아있던 `vercel deploy --prod` 프로세스 여러 개가 10분 이상 멈춰 있으면서 Vercel 배포 큐(skylife-guide, TPS 프로젝트 모두)를 막고 있었음 — 프로세스 kill + `vercel rm`으로 막힌 큐 정리 후 정상 배포됨

---

## 2026-07-20 업데이트 — 허브 로그인 화면 깜빡임 수정

### 배경
- 서브페이지 4곳에는 로딩 스피너 방식(항목 2 참고)을 적용해뒀는데, 정작 로그인이 이뤄지는 허브(skylife-guide) 자체에는 적용을 안 해서 동일한 깜빡임이 계속 발생한다는 피드백
- 원인: `checkExistingSession()`이 `sb.auth.getSession()` → `afterLogin()`의 프로필 조회까지 비동기로 처리하는 동안, 로그인/회원가입 폼(`#auth-tabs`, `#login-form`, `#signup-form`)이 기본값으로 이미 화면에 노출되어 있었음 (매 새로고침/재방문마다 반복)

### 수정 내용
- 위 3개 요소를 `#auth-area` 컨테이너로 묶고 기본 `display:none` 처리, 대신 `#lock-loading` 스피너를 기본 노출
- `showAuthArea()` 신설 — 로그인 폼을 실제로 보여줘야 할 시점(세션 없음, 로그인 실패, 계정 조회 실패 등)에만 호출
- `switchAuthTab()`이 내부적으로 `showAuthArea()`를 호출하도록 변경, `showPending()`은 반대로 로딩/폼을 모두 숨기고 대기 안내 박스만 노출
- `checkExistingSession()`: 세션 없으면 즉시 `switchAuthTab('login')` 호출, 세션 있으면 `afterLogin()` 결과에 따라 자동으로 통과되거나 폼이 드러남
- 커밋: `c651f85`, GitHub Pages 빌드 정상(`built`) 확인 완료

---

## 2026-07-20 업데이트 — 로그인 유지 방식 변경 + SSO 토큰 노출 문제 해결 (보안 검토 결과 반영)

### 1. 세션 저장 방식: localStorage → sessionStorage
- 요청: "탭이 열려있는 동안만 로그인 유지, 탭을 닫으면 재로그인" 방식으로 통일
- `createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { storage: window.sessionStorage } })`로 변경 — 허브뿐 아니라 TPS/plans/addons/mobile-faq/admin.html 6곳 전부 동일 적용
- 결과: 탭 닫으면 즉시 로그아웃 상태, 같은 탭에서 새로고침/이동하는 동안은 시간 제한 없이 유지

### 2. 계정 정보 노출 여부 전체 점검
- `console.log` 등 민감정보 출력 코드 없음, 예전 `CORRECT_HASH` 고정비밀번호 인증 잔재 없음, `service_role` 키 노출 없음, 레거시 `inquiries` 테이블 참조 없음 — 확인 완료
- `profiles` 테이블 RLS는 본인 행만 select/insert 가능, 전체 목록은 `is_admin` RPC로만 — 일반 계정이 API 직접 호출해도 타인 정보 조회 불가 확인

### 3. **발견한 문제 — SSO 토큰이 퀵링크 `href`에 상시 노출**
- 로그인 직후 `applySsoToLinks()`가 TPS/요금제/부가서비스/FAQ/공지사항 5개 버튼의 `href`에 로그인 토큰(`#sso=...`)을 그대로 심어두고, 로그인 세션 내내 유지되는 구조였음
- 이 상태에서 버튼 우클릭 → "링크 주소 복사"를 하면 유효한 로그인 토큰이 그대로 복사됨 → 이 링크를 제3자에게 전달하면 토큰 만료(최대 1시간) 전까지 해당 계정 권한으로 서브페이지 접근 가능
- 토큰(JWT)을 디코딩하면 가입 시 내부용으로 만든 이메일(`아이디@skylife-agent.local`)도 노출됨
- 공지사항(`skylife-inquiry`)은 로그인이 필요 없는 공개 페이지인데도 동일하게 토큰이 실려있었음 (실사용 피해는 없으나 불필요한 노출)
- 이전 세션 로그(`skylife-inquiry` 로그 2026-07-16)에 자동 보안 스캔이 HIGH로 플래그했던 항목과 동일 이슈로 확인됨

### 4. 수정 — 클릭 시점에만 토큰 부여
- `applySsoToLinks()`를 href를 미리 채우는 방식에서, 각 버튼에 `click` 이벤트 리스너만 등록해두고 **실제 클릭하는 순간에만** `href`를 채우는 방식으로 변경
- `currentAccessToken` 변수를 `sb.auth.onAuthStateChange()`로 항상 최신 상태 유지 (백그라운드 토큰 자동 갱신도 반영되어, 허브를 오래 켜놔도 클릭 시점엔 항상 최신 토큰 사용 — 기존에 있던 "1시간 지나면 서브페이지 자동 통과 실패" 이슈도 같이 해결됨)
- 우클릭(컨텍스트 메뉴)은 `click` 이벤트를 발생시키지 않으므로, "링크 주소 복사"를 해도 항상 토큰 없는 순수 base URL만 노출됨
- 공지사항 링크는 `data-base` 속성 자체를 제거 — 애초에 토큰이 필요 없는 페이지라 아예 대상에서 제외
- 커밋: `3753e25`

---

## 2026-07-20~21 업데이트 — 헤더/제목 문구 수정 + Vercel 배포

### 1. 문구 변경
- `<title>`, 메인 H1, 푸터: "모바일 현장영업 안내" → "모바일 현장영업 통합 가이드"
- 헤더 좌측: "현장영업 안내 가이드" → "현장영업 안내"
- 헤더 우측 서브타이틀: "대리점/설치기사님 전용 v2.0" → "스카이라이프 모바일 대리점 전용 v2.0"
- 커밋: `b8c6bfa`

### 2. Vercel 일일 배포 한도로 배포 지연
- `git push` 직후 `npx vercel deploy --prod` 실행 시 `"Resource is limited - try again in 24 hours (more than 100, code: api-deployments-free-per-day)"` 에러 발생
- 이 계정(`pjungjin85-sketchs-projects`)은 스카이라이프 계열 프로젝트 전체가 공유 — 한도 초과 시 다른 프로젝트 배포도 동시에 막힘
- GitHub push만으로는 자동배포 안 되는 구조 확인(git 연동 auto-deploy 없음), `vercel deploy --prod` CLI 실행까지 해야 실제 반영됨
- 익일(2026-07-21) 재시도하여 정상 배포 완료, `https://skylife-guide.vercel.app` 타이틀 반영 확인

---

## 2026-07-21 — SSO 토큰 노출 관련 추가 점검 + 배포 상태 확인

### 1. 서브페이지(TPS/plans/addons/mobile-faq) 링크 복사 노출 여부 점검
- 4개 파일 전부 검색 — `href`를 동적으로 세팅하거나 `data-base`를 쓰는 코드 자체가 없음 (허브에서 받은 토큰을 읽기만 하고 재전달하지 않음)
- 유일한 노출 가능 시점(주소창에 `#sso=...`가 잠깐 찍히는 순간)도 `history.replaceState`가 비동기 대기 없이 가장 먼저 실행되어 사실상 복사 불가능한 수준 — 문제없음으로 결론

### 2. admin.html 점검
- `<a href>` 태그 자체가 0개 (전부 버튼 클릭 → JS 함수 방식) — 링크 복사로 노출될 지점 자체가 존재하지 않음

### 3. 배포 반영 여부 재확인
- `curl`로 GitHub Pages(`pjungjin85-sketch.github.io/skylife-guide`)와 Vercel(`skylife-guide.vercel.app`) 두 배포본 모두 최신 커밋(`3753e25`, 클릭 시점 토큰 부여) 기준 코드가 실제로 반영되어 있음을 확인 — 전날 Vercel 배포 한도 이슈로 인한 배포 누락 없음

---

## 2026-07-21 — 스카이라이프 계열 전체 Vercel 배포 구조 정비

허브(skylife-guide) 구조 보고서를 검토하다가 발견한 운영 리스크를 스카이라이프 계열 8개 사이트(skylife-guide, skylife-plans, skylife-addons, skylife-mobile-faq, skylife-inquiry, skylife-commission-calculator, TPS, mobile-manual) 전체에 걸쳐 정비함. skylife-guide 관련 변경만 이 로그에 기록, 전체 내역은 메모리 `feedback_tps_deploy` 참고.

### 1. 오조인 발견 — 로컬이 실사용과 다른 프로젝트에 연결돼 있었음
- `.vercel/project.json`이 모든 저장소에서 `.gitignore`돼 있어 로컬에만 존재 → 과거 세션이 이 파일 없이 배포를 반복하면서 매번 새 Vercel 프로젝트가 자동 생성된 것으로 추정
- 실제 저장소는 8개인데 Vercel 계정엔 16개 프로젝트가 쌓여 있었음(skylife-guide만 5개 변종)
- **skylife-guide 로컬 폴더가 유령 프로젝트(`skylife-guide` plain)에 연결돼 있었고, 실제 서비스 중인 건 `skylife-guide-jyac`였음** — 이 상태로 다음 배포를 했다면 실서비스에 반영 안 되는 사고가 재현될 뻔함
- `.vercel` 폴더 재생성 후 `skylife-guide-jyac`(prj_NdYQKvPKy8R1BtRwIx8PNjNnEwQ6)로 재연결

### 2. `.vercel/project.json` git 커밋
- `.gitignore`를 `.vercel/*` + `!.vercel/project.json` 예외 패턴으로 변경, 연결 정보를 git에 커밋
- 이후 어떤 세션/컴퓨터에서 작업해도 항상 올바른 프로젝트로 연결되도록 고정
- 커밋: `33e0cfe` — chore: .vercel/project.json 커밋해 배포 프로젝트 연결 고정

### 3. Vercel Git 연동으로 자동배포 전환
- `vercel git connect`로 GitHub 저장소 ↔ `skylife-guide-jyac` 프로젝트 연동
- **이제 `git push origin main`만으로 자동 프로덕션 배포됨** — 더 이상 `vercel deploy --prod` 수동 실행 불필요, "커밋했는데 반영 안 됨" 사고 유형 자체가 제거됨
- (다른 7개 사이트도 동일 적용, TPS는 GitHub App 저장소 접근 권한이 빠져 있어 최초 연동 실패 → 사용자가 GitHub 설정에서 권한 추가 후 재시도해 해결)

### 4. 유령 프로젝트 정리
- 코드 어디서도 참조되지 않는 걸 grep으로 확인 후, 사용자 승인 받아 삭제: `skylife-guide`(plain), `skylife-guide-n3dt`, `skylife-guide-au5j`, `skylife-guide-vz8q` 포함 계정 전체 9개
- 계정에 남은 프로젝트가 실제 도구 개수(8개)와 정확히 1:1로 일치하게 정리됨

### 결과
- 원래 리포트가 지적했던 운영 리스크(수동 2단계 배포, 프로젝트 오조인, 유령 프로젝트) 전부 해소
- skylife-guide 실사용 URL은 여전히 `https://skylife-guide-jyac.vercel.app`(변경 없음), 배포 방식만 자동화됨

---

## 2026-07-24 — 요금제 설명&비교 추천 요금제 리스트 갱신

`index.html`의 "요금제 설명 & 비교" 카드(고객용/대리점용 탭) 노출 요금제를 실제 판매 라인업으로 교체. 판매가·데이터/통화 스펙·제휴혜택은 `skylife-plans/data/plans.json`을 원본으로 참조.

### 고객용 탭
- 슬림 1GB/100분 — 2,900원 / 1GB / 100분
- 통화 충분 1.5GB — 6,600원 / 1.5GB / 통화 무제한
- 데이터 충분 2.2GB+/100분 — 11,700원 / 2.2GB+ / 이후 1Mbps / 100분
- 모두 충분 7GB+(밀리의서재) — 16,300원 / 7GB+ / 이후 1Mbps / 통화 무제한 / 밀리의서재 이용권
- 모두 충분 11GB+(밀리의서재) — 33,100원 / 11GB+일2GB / 이후 3Mbps / 통화 무제한 / 밀리의서재 이용권

### 대리점용 탭
- SKY 데이터 충분 2.2GB+/100분 — 13,900원 / 2.2GB+ / 이후 1Mbps / 100분
- SKY 모두 충분 7GB+(밀리의서재) — 17,900원 / 7GB+ / 이후 1Mbps / 통화 무제한 / 밀리의서재 이용권
- SKY 모두 충분 10GB+(밀리의서재) — 19,900원 / 10GB+ / 이후 1Mbps / 통화 무제한 / 밀리의서재 이용권
- SKY 모두 충분 11GB+(밀리의서재) — 34,000원 / 11GB+일2GB / 이후 3Mbps / 통화 무제한 / 밀리의서재 이용권
- SKY 모두 충분 100GB+(밀리의서재) — 39,900원 / 100GB+ / 이후 5Mbps / 통화 무제한 / 밀리의서재 이용권

기존에 있던 "모아진" 제휴 요금제 라인업(고객용 슬림 3종 + 모두충분 7GB, 대리점용 모두충분 7/10/15/11/100GB)을 전량 교체.

### 배포
- 커밋 `f2ea86e` — "요금제 설명&비교 추천 요금제 리스트 갱신"
- `git push` → Vercel Git 연동 자동배포([[feedback_tps_deploy]] 참고)로 반영
