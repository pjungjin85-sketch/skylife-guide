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
