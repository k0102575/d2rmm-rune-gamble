# Diablo II Mods

빵길빵길이 제작·관리하는 Diablo II: Resurrected용 D2RMM 모드 모음입니다. 모드별 폴더를 저장소 최상위에 배치합니다.

| 모드 | 설명 | 안내 |
|---|---|---|
| [Probabilistic Rune Downgrade](ProbabilisticRuneDowngrade/) | 확률형 룬 분해. 악마술사의 군림 오프라인 전용 | [사용 설명](ProbabilisticRuneDowngrade/README.md) · [검증 기록](ProbabilisticRuneDowngrade/docs/TESTING.ko.md) |

## 설치 및 다운로드

이 저장소는 소스·사용 설명·검증 기록을 관리하며 GitHub Releases에는 설치 파일을 등록하지 않습니다. 이용자용 다운로드는 Nexus 배포를 준비 중이며, 공개 후 각 모드 안내에 링크를 추가합니다.

소스를 사용할 경우 모드 폴더를 D2RMM의 `mods` 폴더에 직접 복사하고 Install Mods를 실행할 수 있습니다. 별도로 제공받은 설치 ZIP은 그 안의 `mods` 폴더를 D2RMM 실행파일이 있는 폴더에 복사하면 됩니다.

게임을 종료하고 캐릭터·공유 보관함을 백업하세요. 자세한 사용 조건과 모드 구성 변경 시 주의사항은 각 모드 설명을 참고하세요.

## 개발

현재 룬 분해 모드의 검증과 배포물 제작은 저장소 루트에서 실행합니다.

```sh
node tools/verify.mjs
python3 tools/build.py
```

`ProbabilisticRuneDowngrade/research`는 조사 자료 및 합성 테스트 스키마입니다. `work/`와 `dist/`는 버전 관리에서 제외합니다. 설치 ZIP에는 게임 원본 테이블이나 다른 모드의 소스를 포함하지 않습니다.

## 저장소 이전

기존 d2rmm-rune-gamble의 커밋 이력을 보존하고, 모드 폴더 배치와 개발 도구 경로를 별도 커밋으로 변경했습니다. 모드의 실행 코드는 변경하지 않고 동일하게 유지합니다. 과거 태그는 archive/v0.1.0으로 보존하며, 이전 GitHub 릴리스의 본문·첨부 파일은 이 저장소로 복사하지 않습니다. GitHub Actions는 검사와 ZIP 생성 확인만 수행합니다.

제작자: 빵길빵길 · [MIT License](LICENSE)
