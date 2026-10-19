# Business Angels design system

Derived from the logo (green "Ba." mark, grey wordmark) and the existing Calendly accent.

## Tokens (defined on `:root` in `css/site.css`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0f1f2e` | Headings, dark sections |
| `--text` | `#475467` | Body copy |
| `--brand` | `#7ed957` | Logo green: accents, fills on dark |
| `--brand-dark` | `#236b19` | Green text/links on light (AA, 6.6:1 on white) |
| `--sky` | `#38b6ff` | Secondary accent, Calendly |
| `--bg` / `--bg-alt` | `#ffffff` / `#f4f8f3` | Page / alternate sections |
| Radius | 12px cards, 999px buttons | |
| Spacing | 4/8px scale, sections 80px (56px mobile) | |
| Type | Plus Jakarta Sans (headings 700-800), Inter (body) | max 2 families |

## Rules
1. One primary action per view: a solid green button ("Book a free call").
2. Dark ink sections carry the hero and the closing call to action; everything else is light.
3. Real copy only. No placeholder text, no invented clients or statistics.
4. Every image has alt text; zoom is never disabled; focus rings stay visible.
5. Third-party trackers (Analytics, Messenger) load only after consent. Shared header and footer on every page; styles live in `css/site.css`, no inline styles.
