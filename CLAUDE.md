# skylife-guide 프로젝트 규칙

공통 규칙은 상위 디렉토리 `/Users/jaypark/workspace/CLAUDE.md` 참고.

## 이 페이지 정보
- **용도**: 스카이라이프 모바일 현장영업 안내 (개통 절차, 유심/eSIM 등)
- **파일**: `index.html`
- **GitHub Pages URL**: https://pjungjin85-sketch.github.io/skylife-guide/

## 기능 구조
- 영업 단계별 카드 목록
- 카드마다 태그 + 상세 모달
- `.card-footer`는 태그와 chevron(›) 표시용

## 수정 시 주의사항
- 파일명 `index.html` — `/skylife-guide/`로 바로 접속 가능
- 개통 절차 내용은 실제 KT 정책 기반 — 임의 수정 금지
- 카드 순서는 영업 플로우 순서와 일치해야 함

## 요금제 표 기준일 자동 표시 (2026-10~)
- 고객용/대리점용 요금제 표의 판매가와 "YYYY.MM.01 기준"은 `skylife-plans` 레포 `data/plans.json`에서 자동으로 채움
- 오늘 날짜 이하인 가장 최근 월 키를 사용. 각 행은 `<tr data-plan-code="요금제코드">`로 매칭
- 표에 요금제를 추가/교체할 때는 `data-plan-code`를 꼭 붙일 것 (해당 월에 코드가 없으면 "정보 없음" 표시)
- HTML에 적힌 가격은 불러오기 실패 시 보여주는 fallback
