# Anshul weds Gunjan — invitation (groom's side)

Wedding invitation for Anshul & Gunjan — Barsar, Himachal Pradesh, 10–12 December 2026.

Static site: no build step, no dependencies. Open on GitHub Pages or any static host.

**Flow:** tap anywhere to open → Blessings (Ganesh shloka plays) → The invitation
(wedding song takes over) → Thursday → Friday → Vidai & Vadhu Pravesh → R.S.V.P.,
ending with a three-column table of when / what / where and a map link per venue.
One long scroll; nothing is locked.

## Project layout

```text
index.html           Structure / content
css/styles.css       Styles
js/app.js            Interactions, scroll scenes, audio
assets/
  couple.webp        Couple illustration
  shloka.mp3         Blessings track (loads on first gate touch)
  wedding.mp3        Main wedding song (warms after entry / near invitation)
.nojekyll            Required for GitHub Pages
```

Audio starts with `preload="none"` so the first HTML paint stays light on mobile.
The shloka arms on the first gate touch; the wedding track warms after music starts
(or when the invitation chapter approaches). Save-Data / 2G skips early wedding prefetch.

## Put it on GitHub Pages

1. Make a new public repository, e.g. `anshul-weds-gunjan-simple`.
2. **Unzip on your computer first** — GitHub does not unpack ZIPs.
3. In the repo: **Add file → Upload files**, drag in the whole project folder contents:
   `index.html`, `.nojekyll`, `css/`, `js/`, and `assets/`.
   On a Mac press `Cmd + Shift + .` in the file picker if `.nojekyll` is hidden.
4. Commit to `main`.
5. **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
6. Live in a minute or two at `https://<username>.github.io/<repo-name>/`

Updating later: replace the changed files, then open the link in a private tab —
phones and WhatsApp cache hard.

## Local preview

Serve the folder over HTTP (file:// can block audio on some browsers):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Editing common things

| To change | Where |
|---|---|
| Venue table | `index.html` — search `class="vtab` |
| Event timings / labels | `index.html` — function names (e.g. `Sehra Bandi`) |
| Calendar times | `js/app.js` — `const EVS=[` (times are UTC = IST − 5:30) |
| Phone numbers | `index.html` — `tel:+9194181` |
| Map links | `js/app.js` — `HOMEMAP` / `HOTELMAP` |
| Where music switches | `js/app.js` — `setTrack(c2.getBoundingClientRect()` |
| Volume | `js/app.js` — `const VOL=.7` |
| Styles | `css/styles.css` |
| Songs / photo | Replace files under `assets/` (keep the same names) |
