# 구현 및 조사 기록 (2026-11-02)

## 확인한 근거

- [공식 D2RMM DOCS](https://github.com/olegbl/d2rmm/blob/master/DOCS.md): 모드는 설치 시 데이터를 변경하며 런타임 게임 스크립트가 아니다.
- [공식 ModConfig 타입](https://github.com/olegbl/d2rmm/blob/master/src/bridge/ModConfig.d.ts): number/defaultValue/minValue/maxValue, checkbox, select/options의 실제 정의를 확인했다.
- [공식 ModAPI](https://olegbl.github.io/d2rmm/interfaces/ModAPI.ModAPI.html), [공식 API 참조](https://github.com/olegbl/d2rmm/blob/master/.claude/d2r-modding-api.md): readTsv/writeTsv, readJson/writeJson, getNextStringID, getVersion만 사용한다.
- [D2R Data Guide](https://locbones.github.io/D2R_DataGuide/): compactsave=1은 추가 속성을 저장하지 않으므로 대기 아이템은 0을 사용한다. 이는 Blizzard가 아닌 커뮤니티 교정 가이드다.
- [실제 cubemain](https://github.com/D2R-Reimagined/d2r-reimagined-mod/blob/main/data/global/excel/cubemain.txt): CORRUPT ITEM DUMMY 행은 `corruptedDummy` 속성에 min=1/max=100을 부여한다. op=18, 임계 조건 등을 사용하는 실제 데이터가 있다. 이 모드의 정상 작동이나 현행 순정 게임의 스키마를 보장하는 증거는 아니다. 조사 표본에 param/스탯 이름의 대응이 일치하지 않는 부분도 있어 ID 숫자를 복사하지 않았다.
- [실제 HD 매핑](https://github.com/D2R-Reimagined/d2r-reimagined-mod/blob/main/data/hd/items/items.json): 배열 안 아이템 코드별 `asset` 구조를 확인했다. 설치 시 입력 룬의 매핑을 복제하며 자산 파일을 배포하지 않는다.
- [cubemain 원저자 가이드](https://d2mods.info/forum/kb/viewarticle?a=284), [열람한 보존본](https://diablo2.org/kb/file-guides/cubemain-txt): op=18은 아이템 스탯이 value와 다르면 거부, output b/c는 별도 출력, mod chance는 속성 확률. 구버전 엔진 문서이므로 현행 D2R 게임 확인이 필요하다.

공개 Reimagined의 misc/itemtypes/itemstatcost/properties/cubemain/armor/weapons 원문을 실제로 다운로드·파싱했다. URL, 다운로드 내용 SHA-256, 행 수는 `research/sources.json`에 기록했다. main은 가변 참조이며 commit 핀은 확보하지 못했다. 전체 테이블은 배포하지 않으며 저장소 fixture는 헤더와 직접 만든 합성 행이다. 사용자 설치의 순정 CASC 데이터는 확보하지 못했다. Nexus Corruptions 내부 파일은 검사하지 않았고 동일 구현이라고 주장하지 않는다.

## 구현

1. 설치 시 확률을 검사한다. 모든 필수 컬럼/참조/JSON 구조와 충돌을 쓰기 전에 검사한다.
2. itemstatcost의 ID(또는 *ID)가 행 위치와 일치하는지 확인하고 끝에 스탯 하나를 추가한다. 511은 종료 표식으로 예약하여 사용하지 않는다. 빈 ID 덮어쓰기를 하지 않는다. 7비트 저장/전송, Save Add=0, Encode=0, ValShift=0; 파라미터 없음, 표시 함수 없음. `Saved/CSvBits`는 캐릭터 기본 스탯용이므로 새 아이템 스탯에 설정하지 않는다. 실제 저장 유지와 클라이언트 동기화는 게임 검증 대상이다.
3. properties의 func1=1로 prg_roll에 min/max 값을 전달한다. 설치 코드에는 난수 호출이 없다.
4. 독립 타입 prgp, 3글자 아이템 코드 pg0~pgv 중 지원 등급에 대응하는 아이템을 생성한다. 입력 룬의 아이콘·바닥 그래픽·소리와 HD 자산 참조만 재사용하고 타입/affix/벤더 컬럼은 상속하지 않는다. 이름은 원래 룬 이름 뒤에 `— 분해 대기`를 붙인다. 전용 이미지 교체 위치는 mod.js 주석으로 표시했다. 문자열 키 PRG 접두사, 스탯/프로퍼티 prg 접두사를 사용한다. 한국어/영어 제공, 나머지 언어는 영어 대체.
5. 첫 조합은 두 재료를 소비하고 새 normal 대기 아이템에 prg_roll=1..100 속성을 100% 부여한다.
6. 등급마다 op=18 동등 비교 행 100개. 각각 단일 대기 아이템만 입력으로 받으며 1..100에 정확히 한 행이 대응한다. 기본 1~50/51~75/76~85/86~100. 확률 0인 구간도 허용한다. 첫 일치 순서에 의존하지 않는다.
7. output과 output b에 깨끗한 기본 아이템 코드만 쓴다. useitem/mod 전송을 쓰지 않아 대기 스탯을 결과에 복사하지 않는다. output c는 사용하지 않는다.

시제품은 101개, 전체는 3,232개 조합/32개 대기 아이템/1개 타입/1개 스탯/1개 프로퍼티. 첫 일치/넓은 임계값 방식은 채택하지 않았다. 조합 표 전체 32,767행을 시험판의 보수적 안전 상한으로 검사한다. 이는 현행 D2R 한도를 입증한 숫자가 아니며, 엔진 한도·3,232행의 성능은 게임에서 확인해야 한다. 조사 테이블 자체가 17,056행인 것은 실제 대형 표가 존재한다는 증거일 뿐이다.

## 경로와 제약

악마술사의 군림 전용으로 global/excel만 편집한다. 경로 선택 옵션과 base 테이블 지원은 제거했다. 기존 레저렉션 캐릭터는 지원하지 않는다. 데이터 모드는 DLC 구매 여부나 게임 실행을 차단하는 기능을 제공하지 않는다. 필수 파일이 없거나 스키마가 다르면 설치를 중단한다. 현행 패치의 실제 게임 호환성은 검증 전이다.

mock은 조합 행의 논리만 검증한다. 엔진이 misc normal 결과에 속성을 적용하는지, 저장 후 스탯 유지, op의 대상, 2개 출력, HD/레거시 렌더링, 조합 속도는 실행 전까지 미확정이다. 실패하면 백업 시험 세이브로 재현하여 구현을 수정해야 한다. 공개 배포 전 이 항목들을 닫아야 한다.

## 2026-11-03: First-transmute failure investigation

D2RMM 1.9.2 installation succeeded but Ist + identify scroll did nothing and left both ingredients intact. Pending item codes were four characters (prg0-prgv). The D2R Data Guide documents a three-character limit in HD Items.json: https://locbones.github.io/D2R_DataGuide/ . A first-hand modder report also describes four-character code failures: https://us.forums.blizzard.com/en/d2r/t/modding-four-character-item-codes-are-not-read-by-the-game/174772 . This report is not a Blizzard fix announcement.

Changed pending item codes to pg0-pgv and added collision guards. The separate itemtypes identifier prgp remains unchanged. This removes a documented compatibility issue; the cause of the reported first-transmute failure is not yet confirmed in game. The old mock tests incorrectly accepted four-character item codes and could not catch this problem.

Retest one Ist + loose identify scroll, then resolve the pending item alone. If still inert, inspect generated cubemain.txt PRDG rows, misc.txt pgm row and D2RMM install logs. Old pending items are not save-compatible with these new codes; use a test-save backup. If no pending item was ever created, there is no pending item to migrate.
