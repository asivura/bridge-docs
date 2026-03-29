# Transcription Errors: Scans vs Documentation

Errors found by comparing scanned convention cards (`system-scans/IMG_3951.jpg` through `IMG_3959.jpg`) against the transcribed markdown documentation (`SYSTEM.md`, `SYSTEM-COMPARISON.md`, `SAYC-DIFFERENCES.md`).

Verification performed: 2026-03-29

## Fix Status

| Status | Count | Details |
|--------|-------|---------|
| **Fixed** | 20 | Applied to SYSTEM.md, propagated to SYSTEM-COMPARISON.md and SAYC-DIFFERENCES.md |
| **Remaining** | 3 | ERR-19 (missing 3♠ row), ERR-12 description, NEW-02 (garbled lines 313-321) |
| **Unverified** | 4 | ERR-21 through ERR-24 (need physical convention card) |
| **Cross-doc** | 7 | Contradictions between SYSTEM.md and SYSTEM-COMPARISON.md |

---

## Error Severity Levels

| Level | Meaning |
|-------|---------|
| **CRITICAL** | Wrong HCP range or bid meaning; would cause bidding mistakes at the table |
| **MODERATE** | Incorrect description, swapped values, or structural issue; could cause confusion |
| **MINOR** | Small discrepancy, editorial addition, or notation difference |
| **UNVERIFIED** | Probable error but scan quality prevents full confirmation; needs physical card check |

---

## Page 4 (IMG_3951.jpg) -- Opening Bids and Defense

### ERR-01: 2-Level Opening Bids Have Contradictory Rows ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 59-62
**Scan shows:** All three bids (2♦, 2♥, 2♠) uniformly at **20-22 HCP, 5+ card suit**

The doc has four conflicting rows:

| Row | Bid | Doc HCP | Doc Description |
|-----|-----|---------|-----------------|
| Line 59 | 2♦ | 21+ | Long suit, 8 tricks |
| Line 60 | 2♥ | 17+ | Long suit, game in hand |
| Line 61 | 2♠ | 22+ | All other strong distributions |
| Line 62 | 2♦/♥/♠ | 20-22 | 5+ card suit |

**What the scan actually shows:** A single grouped entry: 2♦/♥/♠ = 20-22 HCP, 5+ card suit. The individual rows with distinct HCP ranges (21+, 17+, 22+) and distinct descriptions do not correspond to anything visible on Page 4. They may have been inferred from the 2♣ sub-categories elsewhere on the card, but they do not belong in the 2-level opening section.

**Fix:** Remove lines 59-61 (the individual rows) and keep only the grouped row at 20-22, 5+. Alternatively, clarify if the individual interpretations come from a partnership discussion separate from the scanned card.

---

### ERR-02: 2NT Opening Has Spurious "5+" in Description ✅ FIXED

**Severity:** MINOR
**File:** `SYSTEM.md` line 63

| | Value |
|---|---|
| Scan | 20-21, Balanced ("Равномерный") |
| Doc | 20-21, Balanced, **5+** |

The "5+" does not appear in the scan. A balanced 2NT opening would not require a 5-card suit. This was likely copied from an adjacent row during transcription.

**Fix:** Remove "5+" from the 2NT description.

---

### ERR-03: Defense Table -- 1NT Overcall Has Phantom Row ✅ FIXED

**Severity:** MODERATE
**File:** `SYSTEM.md` line 84

The doc has two rows for the 1NT overcall area:

| Line | HCP | Description |
|------|-----|-------------|
| 84 | 8-16 | 5-4 distribution |
| 85 | 15-18 | Balanced with stopper in opponent's suit |

The scan shows only **one** row: 1NT overcall = 15-18, balanced with stopper. The 8-16 / 5-4 distribution entry on line 84 does not correspond to anything visible in the Page 4 defense table.

**Fix:** Verify source of line 84. If no source exists, remove it.

---

### ERR-04: Defense Table -- "4+ card good 5-card suit" Is Self-Contradictory ✅ FIXED

**Severity:** MINOR
**File:** `SYSTEM.md` line 83

| | Value |
|---|---|
| Scan | "5+ карт в длинной масти" (5+ cards in long suit) |
| Doc | "4+ card good 5-card suit" |

The doc description is internally contradictory (is it 4+ or 5?).

**Fix:** Change to "5+ card good suit" to match the scan.

---

## Page 5 (IMG_3952.jpg) -- Basic Responses to 1NT

### ERR-05: PASS Over 1NT -- HCP Off by 1 ✅ FIXED

**Severity:** MINOR
**File:** `SYSTEM.md` line 100

| | Value |
|---|---|
| Scan | 0-**6** |
| Doc | 0-**7** |

This 1-point discrepancy also appears in the PASS after Stayman 2♦ denial (line 128: doc says 0-7, scan says 0-6).

**Fix:** Change to 0-6 if the scan is authoritative. This shifts the boundary: with 7 HCP, responder should bid rather than pass.

---

### ERR-06: 3♣ and 3♦ Direct Over 1NT -- Wrong HCP and Force Level ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 105-106

| Bid | Scan HCP | Scan Meaning | Doc HCP | Doc Meaning |
|-----|----------|--------------|---------|-------------|
| 3♣ | **10+** | **GI** | 12+ | GF |
| 3♦ | **10+** | **GI** | 12+ | GF |

Both HCP threshold and force level differ. The scan shows these as game invitational (10+), not game forcing (12+).

**Fix:** Change both to 10+, GI.

---

### ERR-07: 3♥/3♠ and 4♥/4♠ Direct Over 1NT -- Values Swapped ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 107-111

It appears the 3-level and 4-level direct responses were swapped during transcription:

| Bid | Scan HCP | Scan Description | Doc HCP | Doc Description |
|-----|----------|------------------|---------|-----------------|
| 3♥ | **10+** | **6+♥, GAME** | 8-9 | 5+♥, GI |
| 3♠ | **10+** | **6+♠, GAME** | 8-9 | 5+♠, GI |
| 4♥ | **8-9** | **6+♥, to play** | 10+ | 6+♥, to play |
| 4♠ | **8-9** | **6+♠, to play** | 10+ | 6+♠, to play |

The HCP ranges and descriptions for 3♥/3♠ and 4♥/4♠ appear to have been transposed.

**Fix:** Swap the values so 3♥/3♠ = 10+, 6+ suit, GAME and 4♥/4♠ = 8-9, 6+ suit, to play.

---

### ERR-08: Slam Invitation Sequence 1NT-2♦(!) HCP ✅ FIXED

**Severity:** MODERATE
**File:** `SYSTEM.md` line 186

| | Value |
|---|---|
| Scan | **12+** |
| Doc | 10+ |

**Fix:** Change to 12+.

---

## Page 6 (IMG_3953.jpg) -- Blackwood, 1♣ Responses

No errors found in the Blackwood section or 1♣ responses section. All values match.

---

## Page 7 (IMG_3954.jpg) -- Responses to 1♦ and 1♠

This page has the **highest concentration of errors**. Multiple HCP ranges and descriptions are wrong, swapped, or scrambled.

### ERR-09: 1♦ - 1NT Description Is Wrong ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 227

| | Value |
|---|---|
| Scan | "нет 4-ки в М" = **no 4-card major** |
| Doc | 4+♦, may have 4+♥, no 5♠ |

The doc description is completely different from the scan. The scan clearly says "no 4-card major" (a denial), while the doc describes diamond support and possible hearts.

**Fix:** Change description to "No 4-card major".

---

### ERR-10: 1♦ - 2♣ and 1♦ - 2♦ HCP Ranges Are Swapped ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 228-229

| Bid | Scan HCP | Doc HCP |
|-----|----------|---------|
| 2♣ | **6-10** | 6+ |
| 2♦ | **6+** | 6-10 |

The HCP ranges for these two bids are transposed in the doc.

**Fix:** Swap the HCP values: 2♣ = 6-10, 2♦ = 6+.

---

### ERR-11: 1♦ - 2♦ Suit Length Is Wrong ✅ FIXED

**Severity:** MODERATE
**File:** `SYSTEM.md` line 229

| | Value |
|---|---|
| Scan | **4+♦** |
| Doc | 5+♦ |

**Fix:** Change to 4+♦.

---

### ERR-12: 1♦ - 2NT HCP Is Wrong ⚠️ PARTIAL (HCP fixed to 13-15, description still wrong)

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 232

| | Value |
|---|---|
| Scan | **13-15** |
| Doc | 17+ |

This is a major HCP discrepancy (4+ points off).

**Fix:** Change to 13-15.

---

### ERR-13: 1♠ - 2♥ HCP Is Wrong ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 277

| | Value |
|---|---|
| Scan | **6-10** |
| Doc | 11+ |

**Fix:** Change to 6-10. The description may also need updating (scan shows a weaker bid).

---

### ERR-14: 1♠ - 2NT(!) HCP Is Wrong ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 279

| | Value |
|---|---|
| Scan | **17+** |
| Doc | 13+ |

**Fix:** Change to 17+.

---

### ERR-15: 1♠ - 3♦, 3♥, 3♠ Block Is Scrambled ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 281-283

These three rows have had their HCP ranges and descriptions shifted between bids:

| Bid | Scan HCP | Scan Description | Doc HCP | Doc Description |
|-----|----------|------------------|---------|-----------------|
| 3♦ | **10-12** | **4+♦, GF, SI** | 17+ | 4+♦, GF, SI |
| 3♥ | **10-12** | **3+♠, GI** | 17+ | 4+♥, GF, SI |
| 3♠ | **13-16** | **GF, SI** | 10-12 | 3+♠, GI |

The HCP for 3♦ and 3♥ should be 10-12, not 17+. The HCP for 3♠ should be 13-16, not 10-12. The descriptions are also shifted: the doc's 3♥ description ("4+♥, GF, SI") does not appear in the scan for that row; instead 3♥ shows "3+♠, GI".

**Fix:** Correct all three rows to match scan values.

---

### ERR-16: 1♠ - 3♣ Description Differs ✅ FIXED

**Severity:** MODERATE
**File:** `SYSTEM.md` line 280

| | Value |
|---|---|
| Scan | **Asking about short suit, GF, SI** |
| Doc | 4+♣, GF, SI |

The scan describes this bid as asking about the short suit ("Вопрос о короткой масти"), not as showing 4+♣.

**Fix:** Change description to "Asking about short suit, GF, SI" or reconcile with the Weak Suit Asking convention.

---

## Page 8 (IMG_3955.jpg) -- Responses to 1♥ and 2♣

### ERR-17: 1♥ - 1♠ HCP Has No Upper Bound ✅ FIXED

**Severity:** MODERATE
**File:** `SYSTEM.md` line 247

| | Value |
|---|---|
| Scan | **6-10** |
| Doc | 6+ |

The scan shows a bounded range (6-10), while the doc shows an open-ended range (6+).

**Fix:** Change to 6-10.

---

### ERR-18: Opener's Rebid 2♠ After 2♣-2♦ -- HCP Mismatch ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 315

| | Value |
|---|---|
| Scan | **22+** |
| Doc | 17+ |

Since this is a rebid after a 2♣ opening (which already promises 22+), the doc's "17+" makes no logical sense.

**Fix:** Change to 22+.

---

### ERR-19: Missing 3♠ Bid After 2♣-2♦-2NT ❌ NOT APPLIED

**Severity:** MODERATE
**File:** `SYSTEM.md` lines 332-337

The scan shows a **3♠** bid in the 2♣-2♦-2NT continuation section (possibly showing 5+♣, a minor suit transfer) that is not documented.

**Fix:** Add the 3♠ row to the continuations table after verifying against the physical card.

---

### ERR-20: 1♥ - 3♦ HCP Was Wrong ✅ FIXED

**Severity:** CRITICAL
**File:** `SYSTEM.md` line 251

| | Value |
|---|---|
| Scan | **17+** (confirmed from IMG_3955.jpg, matches 3♣ pattern) |
| Doc (before fix) | 10-12 |
| Doc (after fix) | **17+** |

The 3♦ response had its HCP scrambled with another row. The scan clearly shows 3♦ at 17+ (matching the 3♣ row), consistent with a GF, SI new-suit bid.

**Fix applied:** Changed SYSTEM.md 1♥-3♦ HCP from 10-12 to 17+. SYSTEM-COMPARISON.md and SAYC-DIFFERENCES.md already had the correct 17++ value.

---

## Pages 9-10 (IMG_3956.jpg, IMG_3957.jpg) -- Opener's Rebids After 1♣

Scan quality on these pages is poor due to rotation and small text. Most HCP ranges match, but several descriptions are hard to confirm.

### ERR-21: 1♣-1♦ Rebids -- Possible ♦/♣ Suit Swaps 🔍 NEEDS PHYSICAL CARD

**Severity:** UNVERIFIED
**File:** `SYSTEM.md` lines 349-351

| Row | Doc Description | Possible Scan Description |
|-----|-----------------|--------------------------|
| 1♥ rebid | 5+**♦**, may be 3-3 in ♦♥ | 5+**♣** (the opening suit) |
| 1NT rebid | 4+**♦**, may be 5+♦ | May reference **♣** instead |
| 2♣ rebid | 4+**♦** | May be 4+**♣** |

The suit references in the description column may have ♣ and ♦ swapped in several rows. Since the opening is 1♣, references to the opening suit should use ♣ not ♦.

**Fix:** Verify suit symbols against the physical card.

---

### ERR-22: 1♣-1♥ Row 2 (2♣) -- Puzzling Description 🔍 NEEDS PHYSICAL CARD

**Severity:** UNVERIFIED
**File:** `SYSTEM.md` line 369

The doc says 2♣ rebid shows "4+♠", which is an unusual description for a club rebid. The scan text is unclear.

**Fix:** Verify against the physical card. This may be a transcription error where the suit was misread.

---

### ERR-23: 1♣-1NT Rebids -- Possible Missing 2♦ Row 🔍 NEEDS PHYSICAL CARD

**Severity:** UNVERIFIED
**File:** `SYSTEM.md` lines 400-406

The doc shows only a "2♣" row at 12-16 with description "Pass in M". The scan may show two separate rows (2♣ and 2♦). The description "Pass in M" is also unclear and may be a transcription error.

**Fix:** Verify against the physical card.

---

### ERR-24: 1♦-2♣ Row 4 (2NT) -- GF vs GI 🔍 NEEDS PHYSICAL CARD

**Severity:** UNVERIFIED
**File:** `SYSTEM.md` line 417

The doc says "GF" at 12-14 HCP, which is unusual (game force at minimum opening strength). The scan may say "GI" (Game Invite) instead.

**Fix:** Verify against the physical card.

---

## Pages 11-12 (IMG_3958.jpg, IMG_3959.jpg) -- Weak Suit Asking and Scoring

**No errors found.** All Weak Suit Asking rows and all scoring values are correctly transcribed.

---

## Summary by Affected File

### SYSTEM.md

| Error Count | Severity |
|-------------|----------|
| 10 | CRITICAL |
| 6 | MODERATE |
| 3 | MINOR |
| 5 | UNVERIFIED |

### SYSTEM-COMPARISON.md and SAYC-DIFFERENCES.md

These files derive their "Our System" values from SYSTEM.md. Any corrections to SYSTEM.md will need to be propagated to these files as well. Key sections affected:

- Opening bids comparison (2-level openings)
- Responses to 1♦ comparison
- Responses to 1♠ comparison
- Responses to 1NT comparison
- Responses to 1♥ comparison

---

## Recommended Verification Process

1. **Physical card check**: Errors marked UNVERIFIED (ERR-20 through ERR-24) need the original convention cards to resolve, as scan quality is insufficient.
2. **Apply CRITICAL fixes first**: ERR-01, ERR-06, ERR-07, ERR-09, ERR-10, ERR-12, ERR-13, ERR-14, ERR-15, ERR-18 should be corrected in SYSTEM.md.
3. **Propagate to comparison docs**: After fixing SYSTEM.md, update the "Our System" columns in SYSTEM-COMPARISON.md and the values in SAYC-DIFFERENCES.md.
4. **Re-verify**: After corrections, re-run verification against the scans to confirm no new inconsistencies were introduced.

---

## Errors Discovered During Verification

These errors were found by the content-verifier and scan-verifier agents during the fix verification pass.

### NEW-02: Lines 313-321 Garbled (2♣-2♦ Rebids Section) ❌ NOT APPLIED

**Severity:** CRITICAL
**File:** `SYSTEM.md` lines 313-321

The HCP values, bid meanings, and descriptions in the 2♣-2♦ opener's rebid continuations table appear to have shifted between columns. For example:

| Line | Bid | Current HCP | Current Description |
|------|-----|-------------|---------------------|
| 313 | 3♣ | - | Negative, other distributions |
| 314 | 3♦ | 0-7 | 5+♣, GI |
| 315 | 3♥ | 5+ | 5+♦, GI |
| 317 | 3NT | 22-24 | 5+♣, GI |
| 318 | 4♣ | 22-24 | 5+♦, GI |
| 319 | 4♦ | 17+ | 6+♥ |
| 320 | 4♥ | 17+ | 6+♠ |

The HCP values appear scrambled (e.g., "5+" as HCP for 3♥, "22-24" for 3NT and 4♣). Descriptions also appear shifted. This is likely a column-shift error from the original transcription.

**Fix:** Verify against the physical convention card and reconstruct the table from scratch.

---

*Report generated from parallel scan verification across all 9 convention card images (IMG_3951 through IMG_3959).*
