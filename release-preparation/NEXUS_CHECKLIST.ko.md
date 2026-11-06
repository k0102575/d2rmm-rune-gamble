# Nexus 공개 준비 — 0.1.0

2026-11-06 기준 내부 작업 문서. 아직 Nexus에 등록·공개하거나 원작자에게 연락하지 않았다. 공개 소개문 원고는 `ProbabilisticRuneDowngrade/docs/NEXUS_DESCRIPTION.en.md`와 `.ko.md`에 있다. 사이트 편집기의 실제 지원 서식·필수 항목은 등록 화면에서 확인하고 변환한다.

## 준비 상태와 공개 조건

- [x] 저장소 이전·폴더 구조 확인. 다시 이전하거나 기존 저장소를 삭제하지 않는다.
- [x] 현재 mod.js/mod.json: 0.1.0, 빵길빵길, 전체 32등급, 기본값 50/25/10/15, 두 개 당첨은 전 등급 2개. 실행 코드·설정 변경 없음.
- [x] 영어 중심 소개문·한국어 대응 원고, 설치·확률·저장 주의·기존 테스트 표 정리.
- [x] CI는 검사·ZIP 생성만 수행하는 구성. 이번 작업에서 원격 CI를 새로 실행하거나 통과 여부를 조회하지 않았다.
- [ ] 3.4 적용 후 실제 게임 재검증 및 결과 기록. `POST_PATCH_TEST_RECORD.ko.md` 사용.
- [ ] 한 결과만 0%인 네 설정의 실제 병용 검사. 자동 42개 통과 기록과 분리한다.
- [ ] 참고 모드 현재 권한 확인·근거 보관. `PERMISSIONS_AND_CONTACT.ko.md` 참조.
- [ ] 개발 과정 전체 AI 사용 범위 확인 후 소개문 고지 보완. 현재 원고는 이번 소개문 작성·번역 지원만 확실히 명시한다. 코드·이미지에 AI를 사용했는지는 현재 대화만으로 확정하지 않는다. 사용했다면 해당 범위를 추가하고, 사이트의 현행 AI 고지 항목·정책도 직접 확인한다.
- [ ] 실제 게임 스크린샷·표지 및 영문 캡션 준비.
- [ ] 게시 직전 소개문의 '3.4 검증 대기' 상태를 실제 결과와 일치시키고 최종 ZIP을 다시 생성·검사한다.
- [ ] 사용자 최종 공개 결정 후 Nexus 등록. 11월 14일은 목표일이며 검증 지연 시 연기한다. 패치 배포일·래더 시작일은 확인한 공식 발표를 각각 기록하며, 여기서는 날짜를 추정하지 않는다.

## 등록용 항목 초안

| 항목 | 준비 값 / 확인할 일 |
|---|---|
| 게임 | Diablo II: Resurrected — 실제 등록 게임 선택 확인 |
| 제목 | Probabilistic Rune Downgrade |
| 버전 / 제작자 | 0.1.0 / k0102575 — 한국어 설명에는 k0102575 (빵길빵길) 병기. 실제 계정명·입력란 제한은 등록 화면에서 확인 |
| 영어 요약 | Offline Reign of the Warlock D2RMM mod. Downgrade Eld–Zod through two cube steps with four configurable outcomes. |
| 한국어 요약 | 악마술사의 군림 오프라인용 D2RMM 모드. 엘드~조드를 두 단계 조합과 네 가지 설정 확률로 분해합니다. |
| 본문 / 언어 | 영문 원고 우선, 한국어 별도 구역. 편집기에서 표·목록·링크 미리보기 확인 |
| 필수 도구 | D2RMM 1.9+ — 현행 공식 페이지와 요구사항 연결 기능 확인 후 등록 |
| 선택 병용 | Relics, 타락, 룬 겹치기 모드는 필수 의존성이 아님 |
| 분류 / 태그 | 실제 선택지에서 D2RMM·오프라인·게임플레이 관련 항목 검토. 확인되지 않은 분류명을 확정하지 않음 |
| 주 파일 후보 | ProbabilisticRuneDowngrade-0.1.0-mods-only.zip — mod.js/mod.json/LICENSE.txt, 3파일 |
| 선택 파일 후보 | ProbabilisticRuneDowngrade-0.1.0.zip — 문서 포함 대안. 두 ZIP을 동시에 설치할 필요 없음 |
| 영문 파일 설명 | Extract into your D2RMM folder. Requires D2RMM 1.9+ and offline Reign of the Warlock. Back up saves and resolve pending items before configuration changes. |
| 소스 | https://github.com/k0102575/diablo2-mods/tree/main/ProbabilisticRuneDowngrade |
| 권한 / 크레딧 | MIT 범위와 제3자 자산을 구분. 원작자의 허락을 받았다고 표시하지 않음 |
| AI 항목 | 현재 등록 화면·정책을 확인하고 실제 사용 범위에 따라 작성 |
| 연락 / 계정 / 공개 설정 | 현재 확인 불가. 계정 상태·수익화·심사·알림 기본값을 추정하지 않음 |

## 이미지 촬영 목록

실제 게임과 D2RMM에서 직접 촬영하고, 계정명·세이브 경로·다른 이용자 정보는 가린다. 다른 모드의 이미지·로고를 가져오지 않는다. AI 그림을 게임 실행 증거로 사용하지 않는다. Nexus의 현재 해상도·용량·형식 제한은 업로드 화면에서 확인한다.

| 우선순위 | 이미지 | 영문 캡션 초안 |
|---|---|---|
| 필수 | 제목 표지: 이름, 0.1.0, Offline / Reign of the Warlock / D2RMM | Four outcomes. Two cube steps. |
| 필수 | 룬 1개와 낱장 주문서 입력 | Step 1: One rune + one loose Scroll of Identify. |
| 필수 | 분해 대기 아이템 단독 입력 | Step 2: Transmute the pending item alone. No extra materials. |
| 필수 | 네 결과의 실제 지급 화면, 각각 설정값 표시 | Outcomes shown with each chance set to 100% for demonstration. |
| 권장 | D2RMM 기본 확률 설정 화면 | Default chances: 50 / 25 / 10 / 15. Total must equal 100. |
| 권장 | 영문·한글 대기 아이템 이름 | Pending item names in English and Korean. |

100% 시연 합성 배치는 실제 확률 추첨의 연속 결과로 오해되지 않게 표시한다. 테스트 전 이미지를 '3.4 검증 완료' 이미지로 재사용하지 않는다.

## 배포물 점검

`tools/build.py`는 docs/ 바로 아래 파일을 전부 문서 ZIP에 포함한다. 내부 체크리스트·미발송 연락문은 이 `release-preparation/`에 보관해 배포물에서 제외한다. 영문/한글 공개 소개문은 docs/에 있어 문서 ZIP에 포함된다.

검사 명령 `node tools/verify.mjs`는 추적 중인 LOCAL_VALIDATION.json을 다시 쓴다. 현재 작업 기록 보존이 필요하면 임시 복사본에서 검사하고 빌드한다. 제작한 ZIP은 dist/에만 두며 GitHub Releases에는 업로드하지 않는다. 문서 수정으로 문서 ZIP의 해시는 달라질 수 있다. 실행 코드·설정·라이선스가 같으면 간편 ZIP의 기존 SHA-256은 아래와 같아야 한다.

`d4cebe9b175814bcbde77c0ec431754135e33ae486b05c3969916c3b69b13572`

공개 전 최종 소스 커밋·검사 시각·ZIP별 SHA-256을 기록하고 업로드한 파일과 대조한다. 기존 저장소는 지금 삭제하지 않으며 Google Drive 공유 링크는 유지한다. 마골님의 소개 영상 동의는 기록된 범위로만 취급하고 방송·시연 요구나 추천 보증 문구로 확대하지 않는다.
