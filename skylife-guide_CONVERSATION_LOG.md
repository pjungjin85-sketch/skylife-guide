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
