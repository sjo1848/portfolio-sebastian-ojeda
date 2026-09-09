# Branding — Stone / Andes Copper — Palette REWORK

Issue: #63
PR: #68
Trigger: Human visual validation
Status: **REWORK IN PROGRESS**

## Why this rework exists

The approved direction was Stone / Andes Copper, but validation exposed a material implementation defect: the palette shipped in BUILD Increment 1 was almost identical to the pre-branding baseline.

Baseline tokens already included:
- canvas `#F4F1EA`;
- ink around `#151A1F`;
- copper `#A94F1C`;
- copper dark `#843A13`;
- night `#111820`.

Because the branding layer reused nearly the same values, the structural redesign was visible but the chromatic identity was not. This fails the intent of creating a recognizable brand system.

## Rework principle

Keep the approved **Stone / Andes Copper** concept, but create a perceptible and coherent tonal system rather than preserving the old UI palette.

The new scale is warmer in the light surfaces, slightly mineral in the dark surfaces, and clearer in its copper signal.

## Reworked palette

| Role | Rework | Intent |
| --- | --- | --- |
| Canvas / stone | `#EEE6DA` | visibly warmer sandstone field |
| Paper / surface | `#FFF9F1` | warm paper instead of near-white UI card |
| Ink | `#172027` | deep mineral charcoal |
| Muted | `#5F6968` | neutral mineral gray with AA contrast |
| Line | `#D4C5B4` | warmer structural divider |
| Copper | `#B84E1E` | clearer burnt-copper signal |
| Copper strong | `#843713` | headings/hover emphasis |
| Copper soft | `#F0CBB4` | soft fields and low-emphasis accents |
| Copper light | `#F1A06B` | dark-surface signal |
| Night | `#17272E` | deep blue-mineral dark surface |
| Night raised | `#21343C` | depth inside dark evidence/system areas |
| Night text | `#FFF8ED` | warm high-contrast text |
| Night muted | `#AEB9BA` | restrained metadata |
| Focus | `#0E6870` | accessible non-brand focus signal |

## Contrast checks used as guardrails

Representative pairs:
- Ink on Stone: > 13:1
- Muted on Stone: > 4.5:1
- Copper strong on Stone: > 5.5:1
- White on primary Copper: > 5:1
- Night text on Night: > 14:1
- Copper light on Night: > 7:1

These are implementation guardrails; automated accessibility/performance checks remain authoritative during VALIDATE.

## Perceptual acceptance criteria

The rework is not a PASS merely because CSS values changed. Visual evidence must show:

1. the page field is recognizably warmer than the pre-branding baseline;
2. paper/surface cards separate from the stone canvas without becoming sterile white SaaS panels;
3. copper reads as a deliberate brand signal rather than the old accent surviving unchanged;
4. dark technical surfaces feel mineral/ink rather than generic black/navy;
5. project screenshots remain more important than decorative color;
6. ES/EN and desktop/tablet/mobile preserve the same identity;
7. no contrast, Lighthouse, focus, media or responsive regression.

## Method decision

This is a **VALIDATE → REWORK** loop inside the already approved Direction 01. It does not reopen the original Human Gate because the concept is unchanged; it corrects an implementation that failed to produce the approved perceptual outcome.

PR #68 remains blocked from merge until the new palette passes automated gates, manual visual review, Independent Critic and Integration Review.