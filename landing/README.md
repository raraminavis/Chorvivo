# DoDance · landing page

Static one-page site. Open `index.html` through any static host (GitHub Pages, Netlify, Vercel); nothing needs building to deploy.

```
index.html          the page (styles and page script inline)
assets/             app screens (WebP), photos, favicon
js/dodance.js       built bundle: hero sphere + the two product demos
js/dodance.css      styles for the demos
src/                source for js/ (rebuild only if you change the demos or the sphere)
  main.jsx          mounts the sphere (#hero-sphere) and demos (#demo-phone, #demo-notes, #demo-flow)
  demos.tsx/.css    phone demo, notes phone, phone-to-laptop demo; rebuilt from the DoDance MVP screens
  kit/              Stageshow kit by Benji Taylor (MIT, see src/kit/LICENSE)
build.mjs, package.json
```

Hero sphere: ShaderGradient (`@shadergradient/react`), Space palette `#D66B66` / `#8B8E89` / `#F3F3EF`.
Demos: Stageshow. They play while on screen, show a still frame under reduced motion,
and send a `dd:step` event that lights the matching step in "How it works".

Libraries on CDNs: GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (jsDelivr). Fonts: David Libre, Exo, Hind Guntur (Google Fonts).

## Rebuild js/

```
npm install
npm run build
```

## Preview

```
python3 -m http.server
```
then open http://localhost:8000.

## Before launch

- The join form validates the email but does not send it. Point it at the beta sign-up endpoint.
- Privacy, Terms and Contact links have no destinations.
- Pricing answer is "TBD".
- Licences for the photos (assets/*.jpg and the photos inside the app screens) need confirming.
