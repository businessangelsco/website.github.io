# Launch checklist

Pre-launch review (12-0 "not ready as described") listed three conditions. Status:

## Done (verified)
- [x] Lighthouse (mobile): accessibility 100, best practices 100, SEO 100 on all pages; performance 96-100
- [x] Contrast: all text passes WCAG AA (green text #236b19 is 6.6:1 on white)
- [x] Content visible without JavaScript; reveal effects fail safe after 3s
- [x] Analytics and Messenger load only after consent; privacy notice added
- [x] Calendly link returns 200; phone (`tel:`), email (`mailto:`) and map embed wired up
- [x] Team and hero images compressed (about 1.4 MB removed)
- [x] Motion toned down, and fully off under reduced-motion

## Needs a person
- [ ] **Owner reviews and approves** copy, team photos, and the removal of testimonials/statistics
- [ ] **Real phone check** (iPhone Safari and an Android browser): nav menu, cookie banner, map, Calendly
- [ ] **Show real work**: add 2-3 client projects or results the owner can verify (name, what was built, outcome, with client permission). Until then the site says only who the agency serves, not what it has achieved
- [ ] **Domain**: add the GitHub Pages DNS records for businessangelsco.com in Cloudflare (4 A records to 185.199.108-111.153, www CNAME to businessangelsco.github.io, DNS only), set the custom domain in GitHub Pages and enable HTTPS
- [ ] Better team photos for Pulkit and Pankaj (optional)
- [ ] Unused `images/arcangelo.png` (332 KB): delete or use
