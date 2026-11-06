# 공개 준비 작업 검증 기록

2026-11-06, 게시 후 새 클라우드 환경에서 실행. 임시 복사본 `/tmp/diablo2-nexus.IHtrc0`에서 실행했으며 추적 중인 LOCAL_VALIDATION.json을 덮어쓰지 않았다.

- `node tools/verify.mjs`: 합성 생성기 검사 42개 PASS, actualTables=false. D2RMM·게임 실행 아님.
- `python3 tools/build.py`: 문서 포함 12파일 / 간편 설치 3파일의 ZIP 생성·내용 검사 통과.
- 문서 ZIP MANIFEST.sha256.json의 모든 파일 해시 대조 통과.
- 내부 release-preparation/ 및 미발송 연락 초안이 ZIP에 없는 것 확인.
- 간편 ZIP 해시가 기존 배포본과 일치: 실행 코드·설정·라이선스 동일.
- mod.js/mod.json/tools/.github에 git diff 없음. `git diff --check` 통과.
- 빌드 결과는 저장소 dist/에 보관. 업로드·공개하지 않았다.

| 파일 | SHA-256 |
|---|---|
| ProbabilisticRuneDowngrade-0.1.0-mods-only.zip | d4cebe9b175814bcbde77c0ec431754135e33ae486b05c3969916c3b69b13572 |
| ProbabilisticRuneDowngrade-0.1.0.zip | 367a0c88212de0967fc24538b866473f5829e42eae6c72899cf2060ea2b29e23 |

패치 후 게임 검사·권한 확인은 미완료. 문서가 바뀌면 문서 ZIP을 다시 제작하고 해시를 갱신한다. 이 기록은 이번 로컬 작업 결과이며 원격 CI 실행 결과나 공개 준비 최종 승인 기록이 아니다.

제작자 공개 표기를 k0102575로 수정한 후 ZIP을 다시 생성하고 빌드 도구의 내용 검사를 통과했다. 위 문서 ZIP 해시는 갱신된 결과다. 자동 생성기 검사는 코드 변경이 없어 재실행하지 않았다.

README와 관련 문서 정리 후 ZIP을 재생성했다. 파일 내용·문서 매니페스트·내부 준비 문서 제외·간편 ZIP 기존 해시 일치를 확인했다.

공개 안내에서 내부 작업 계획을 제거한 뒤 ZIP을 재생성하고 내용 검사를 통과했다. 간편 ZIP은 기존 해시와 동일하다.
