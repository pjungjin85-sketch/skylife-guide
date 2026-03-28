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
