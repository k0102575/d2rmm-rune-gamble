# Changelog

## 0.1.0 documentation refresh — 2026-11-05

- Update the release page and documentation archive with all four validation sessions and shared rune-use checks.
- Distinguish D2RMM 1.9.2 standalone tests from D2RMM 1.9.0 mixed-mod tests.
- Replace only the documentation archive and its checksum; preserve the minimal installation ZIP, runtime code and v0.1.0 tag.

## 0.1.0 documentation and minimal package — 2026-11-05

- Add a mods-only installation ZIP containing mod.js, mod.json and the MIT notice.
- Clarify runtime comments about stat IDs, saved draw values, Relics compatibility and installation writes; executable tokens are unchanged from v0.1.0.
- Preserve the original release ZIP and tag; add the minimal ZIP as a separate asset.

## 0.1.0 — 2026-11-04

- Set the mod name to Probabilistic Rune Downgrade and author to 빵길빵길.
- Remove the Ist-only option and always generate all 32 ranks (Eld through Zod), including when stale saved configuration still contains istOnly=true.
- Use the user's tested mod.js as the release baseline, retaining its Relics of Sanctuary compatibility implementation.
- Record user-reported recipe, resulting-rune, mixed-mod 100-trial, and save/reload validation; do not claim universal mod compatibility.

## 0.1.0-alpha.4 — 2026-11-04

- Add narrowly scoped Relics of Sanctuary compatibility: give identical redundant item-mythic property rows unique PRG aliases, preserving the first definition, all row positions, and every other value.
- Reject conflicting Mythic definitions and unrelated duplicate property codes before writing. Relics source files are not modified.
- Pass 39 synthetic scenarios and an installer integration check using the user's four output TSVs with synthetic supporting tables and resources.
- In-game compatibility and previously created broken pending items remain unverified. Retest with a fresh pending item in a copy of the pre-test save.

## 0.1.0-alpha.3 — 2026-11-04

- Fix installation aborting when misc.txt has no unused auto prefix column.
- Make misc normcode/ubercode/ultracode optional on both schema validation and item generation; never synthesize missing columns.
- Keep other column checks and leave auto prefix blank when the column exists.
- Add missing-column regression scenarios for the reported 100/0/0/0 Ist-only configuration and full-rank generation.
- Treat itemstatcost ID labels as annotations; preserve existing rows and use the append position as the new runtime ID. Reject empty/duplicate stat names and retain the reserved-ID guard.
- Reject duplicate property codes from combined source tables before writing; report the conflicting code and row indices. This prevents silently installing a suspected mislinked draw property.
- First-transmute failure remains unresolved in game; verify installation before testing one recipe.

## 0.1.0-alpha.2 — 2026-11-03

- Replace four-character pending codes with three-character pg0-pgv codes for D2R HD mapping compatibility.
- Add item-code collision checks across misc, armor, weapons and HD mappings.
- First-transmute symptom resolution remains unverified in game.
- Old pending items are not save-compatible with the new codes.

## 0.1.0-alpha.1 — 2026-11-02

- Pending items reuse the input rune graphics and localized rune name with a pending suffix.
- Reign of the Warlock only; fixed global/excel path with no base-game selector.
- Independent two-step runtime-engine rune draw; Ist-only default and optional Eld–Zod generation.
- Four validated percentage settings, nonoverlapping exact-value recipes, isolated pending items, Korean/English strings and reused game icons.
- Installation guards, local mock verification, game checklist, unpublished listing drafts and local ZIP packaging.
- Actual D2RMM/game compatibility remains unverified.
