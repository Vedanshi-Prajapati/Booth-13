# BOOTH 13 — Spec

## Concept
A haunted photo booth. The visitor takes 4 photos; each one gets stranger.
Photo 4: the visitor is gone. Output: a downloadable photo strip.
Tagline: "Four photos. One of them won't include you."

## Subject sources (all feed the same compositor)
1. Webcam (4 captured stills, segmented on-device)
2. Photo upload (1 still, reused with small shifts for shots 1-3)
3. Illustrated avatar (backup; pick from 5 avatars)
Fallback order: webcam -> upload -> avatar. Never dead-end.

## Shots
1: backdrop + subject
2: + faint shape/eyes in backdrop
3: + darkened second silhouette beside subject
4: backdrop only + chalk-style outline (from subject alpha mask) + shadow on wall
Caption under shot 4: "Occupant not found."

## State
subjectSource: webcam | upload | avatar
subjectCutouts: transparent PNGs
avatar, colorway, backdrop: ids
shot: 1..4

## Rules
- All processing on-device. No backend. State this on the first screen.
- Segment captured stills only, never live video.
- Preload segmentation model while the user picks a backdrop.
- Mobile-first, touch-friendly. Respect prefers-reduced-motion.
- Sound off by default, with a visible toggle.

## Visual direction
Mood: aged photo booth, sodium-lamp night, film grain. Tactile, not glossy.
Colors:
  paper   #F2E8D5
  oxblood #6B1A1F
  amber   #FFB347
  midnight #0E1224
  ghost-green #8FD18A
Type:
  Sign/headings: Alfa Slab One
  Strip footer/captions: Special Elite (typewriter)
  UI text: DM Sans
Texture: film grain, vignette, light leaks, slightly uneven strip borders.
Motion: flash 120ms; countdown tick 900ms (final tick stutters);
        strip print 2.4s ease-out; curtain open 700ms.

## Copy
Sign: BOOTH 13 · PHOTOS · 4 FOR 1 SOUL
Coin slot: INSERT 13¢
Between shots: "Hold still." / "Again." / "Don't look behind you." / "Almost done."
Printing: "Developing..."
Strip footer: BOOTH 13 · STRIP NO. 0013 · [date]

## Easter eggs
- Strip number is always 0013.
- Click the coin slot 13 times: an extra strip prints.
