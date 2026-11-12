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

## Sections

Hero, How it works, Notes, Manifesto (`#manifesto`), Share, Privacy, laptop demo, Pricing (`#pricing`), FAQ, Team (`#team`), Join.

- **Price:** search `index.html` for `PRICE:` and replace `TBD`. The FAQ answer "What does it cost?" needs the same update.
- **Founder photos:** search for `FOUNDERS:`; the comment shows the `<img>` that replaces each initials circle. Put square photos in `assets/`.
- **Video in place of the rehearsal photo:** the comment above the manifesto `<img>` has the `<video>` tag to swap in. Keep clips muted, under about 3 MB, and keep `rehearsal.jpg` as the poster.

## Sign-up form

The join form posts to Netlify Forms under the name `beta`. In Netlify: Site configuration > Forms > enable form detection, then redeploy. Sign-ups appear under Forms > beta. On any other host (including the local preview) the form shows its error message, because nothing is there to receive the post.

## Before launch

- Turn on Netlify form detection and send one test sign-up.
- `og:url` and `og:image` in `index.html` point at chorvivo.com. Update both when the domain changes.
- Privacy section: the page says a full policy will be posted before the beta opens. Write it, link it, and restore a Terms link in the footer.
- Confirm the team bios and titles, and add photos.
- Set the price.
- Licences for the photos (assets/*.jpg and the photos inside the app screens) need confirming.
