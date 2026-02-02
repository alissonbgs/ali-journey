## 1. Update Journey role content

- [x] 1.1 Edit `src/features/journey/data.ts` and replace only `summary` text for `find-my-profession`, `smarkio`, `embraer`, and `black-bee-drones` based on provided highlights.
- [x] 1.2 Confirm the `globant1` entry remains unchanged.
- [x] 1.3 Edit `src/features/journey/data.ts` and replace `highlights` arrays for `find-my-profession`, `smarkio`, `embraer`, and `black-bee-drones` based on provided role details.

## 2. Preserve protected fields

- [x] 2.1 Verify `dateRange`, `company`, `stackSummary`, and `technologies` are unchanged for all edited entries.

## 3. Validate update

- [x] 3.1 Run `npm run typecheck:ui`.
- [x] 3.2 Run `npm run test:ui`.
- [x] 3.3 Run `npm run build:ui`.
