# Probabilistic Rune Downgrade 0.1.0

제작자: 빵길빵길. 악마술사의 군림 전용 오프라인 D2RMM 모드입니다.

- 모드 이름을 Probabilistic Rune Downgrade로 정리했습니다.
- 이스트 전용 옵션을 제거했습니다. 엘드~조드 전체 32등급의 조합을 항상 생성하며 엘은 분해하지 않습니다.
- 네 확률 옵션은 유지합니다. 기본값은 하위 2개/하위 1개/유지/꽝 순서로 50/25/10/15입니다.
- 사용자가 실제 테스트한 mod.js를 기준으로 정식 버전을 구성했습니다. Relics of Sanctuary의 동일한 Mythic 속성 중복 등록 호환 처리를 유지합니다.

설치 ZIP `ProbabilisticRuneDowngrade-0.1.0.zip`을 D2RMM 루트에 풉니다. 게임을 종료하고 저장을 백업한 뒤 Install Mods를 실행하세요. Relics 병용 시 우리 모드를 그 뒤에 설치하세요.

사용자 보고상 네 결과·결과 룬 사용·저장 및 재접속이 정상입니다. 기존 모드 병용 구성에서 25%씩 설정해 100회 실행한 결과는 27/25/23/25회이며 기능 이상은 보고되지 않았습니다. 게임 빌드 및 전체 모드 목록은 미확보이며 다른 모든 모드 조합의 호환성을 보장하지 않습니다.

모드 구성·순서·게임 버전을 바꾸기 전 모든 대기 아이템을 처리하고 저장을 백업하세요. 자세한 내용은 README와 docs/TESTING.ko.md를 참고하세요.

## 간편 설치 ZIP 추가 (2026-11-05)

`ProbabilisticRuneDowngrade-0.1.0-mods-only.zip`은 `mods/ProbabilisticRuneDowngrade/` 안의 mod.js, mod.json, LICENSE.txt만 포함합니다. D2RMM 실행파일이 있는 폴더에 압축을 풀거나, 압축 안의 mods 폴더를 그곳으로 복사하고 Install Mods를 실행하세요. 두 설치 ZIP 중 하나만 사용하면 됩니다.

간편판의 mod.js는 설명 주석만 정리했으며 실행 코드는 기존 0.1.0과 같습니다. 스탯 ID 설명을 실제 동작에 맞게 정정하고 추첨 시점·저장 주의·Relics 호환 범위를 보완했습니다. 기존 문서 포함 ZIP과 v0.1.0 태그는 교체하지 않습니다.
