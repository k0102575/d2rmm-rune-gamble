# 클라우드 작업 인계

## 현재 상태

- 저장소: k0102575/diablo2-mods. 기존 d2rmm-rune-gamble의 커밋 이력을 보존하며 과거 태그는 archive/v0.1.0으로 유지합니다.
- 모드: Probabilistic Rune Downgrade 0.1.0, 제작자 빵길빵길.
- 최상위 ProbabilisticRuneDowngrade 폴더에 mod.js/mod.json 및 해당 모드 문서를 둡니다.
- mod.js/mod.json은 이전 배포본과 바이트 단위로 동일합니다. 간편 설치 ZIP SHA-256: d4cebe9b175814bcbde77c0ec431754135e33ae486b05c3969916c3b69b13572.
- 생성기 검사 42개 PASS. 한 옵션만 0%인 네 설정에서 모든 등급·추첨값을 검사했습니다. 이 네 설정의 실제 병용 게임 테스트는 아직 완료되지 않았습니다.
- 기존 게임 검증은 ProbabilisticRuneDowngrade/docs/TESTING.ko.md에 기록되어 있습니다.

## 실행

저장소 루트에서 `node tools/verify.mjs`, 이어서 `python3 tools/build.py`를 실행합니다. dist/에 문서 포함 및 mods-only ZIP과 SHA-256 파일이 생성됩니다. 설치 ZIP의 경로는 mods/ProbabilisticRuneDowngrade이며 소스 폴더 배치와 구분합니다.

## 남은 작업

1. 새 저장소를 클라우드 환경의 소스로 연결하고 새 작업에서도 검증·빌드가 되는지 확인.
2. Corruption Shards for RoTW 제작자 크레딧·권한을 정리하고 공개 배포 계획을 연락할지 결정. 원작자에게 실제로 연락하지는 않았습니다.
3. Nexus 페이지·영문/한글 소개·이미지·AI 사용 고지·배포 권한을 준비. 아직 Nexus에 공개하지 않았습니다.
4. 실제 패치 적용 후 병용 환경에서 조합·룬 사용·저장/재접속을 재검증하고, 한 옵션만 0%인 설정의 실제 게임 결과도 추가.
5. 정상 동작 확인 후 Nexus 공개 및 새 링크 공유. 기존 저장소 삭제는 아직 하지 않으며, Nexus 배포 이후 사용자가 정리할 계획입니다. Google Drive 공유 주소는 유지하기로 했습니다.

## 변경 시 주의

모드 구성·순서·스탯 추가 모드·게임 버전을 바꾸기 전에 대기 아이템을 모두 처리하고 저장을 백업해야 합니다. Relics의 동일 item-mythic 중복 등록 호환 처리는 유지합니다. 모드 코드 변경 없이 저장소 구조와 배포 도구만 옮긴 상태입니다.

## 배포 방침

사용자 지시에 따라 새 저장소에는 GitHub 릴리스나 배포 파일을 등록하지 않습니다. 자동 게시 워크플로우는 제거했으며 CI는 검사와 ZIP 생성만 확인합니다. Nexus 배포 준비가 끝나면 그쪽에서 배포합니다. 과거의 v0.1.0 태그 객체는 archive/v0.1.0이라는 보관용 태그로 유지하고, GitHub 릴리스 본문/첨부 ZIP은 복사하지 않습니다.
