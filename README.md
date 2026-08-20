# A4 Travel & Tours — Frontend (React + Vite)

## Setup

```bash
cd travel-frontend
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your FastAPI backend
npm run dev
```

Opens at `http://localhost:5173`. Make sure the FastAPI backend (from the
other project) is running and reachable at the URL in `.env`, and that its
CORS `allow_origins` includes this dev URL.

## Folder structure — why it's organized this way

```
src/
  api/            One small file per backend resource (trips, bookSeat,
                   notifyMe, explore) — all built on api/client.js so the
                   base URL and error handling live in exactly one place.

  context/
    ModalContext.jsx   Global state for the Book Seat / Notify Me modals.
                        Any component calls useModal() to open either one —
                        no prop-drilling, and the modals only need to be
                        rendered once, at the root (see Layout.jsx).

  hooks/
    useFetch.js         Generic "load this API call, track loading/error"
                         hook so pages don't rewrite that boilerplate.
    useContactForm.js   Owns the name/address/email/phone form state +
                         validation shared by BOTH Book Seat and Notify Me,
                         since they collect identical fields.

  components/
    common/         Truly generic UI: Modal, Button, FormField, Spinner,
                     SuccessState. Used everywhere, styled once.
    layout/         Navbar, SocialSidebar (vertical icon rail), Layout
                     (wraps every page + mounts the two modals once).
    hero/            The animated landing hero:
                       - AnimatedRoadScene.jsx = crossfading scenery layers
                         + scrolling road + bouncing/spinning bus
                       - heroScenes.js = the array of "views" the bus
                         drives through (see below to swap in real photos)
                       - BusIllustration.jsx = flat vector bus (SVG, so it
                         scales and animates cleanly with no image asset)
    modals/         BookSeatModal, NotifyMeModal, and the ContactFields
                     they both reuse.

  pages/           Home, Destinations (grid from /explore), DestinationDetail
                    (single blog post + gallery + Notify Me), and the
                    DestinationCard used in the grid.

  styles/
    tokens.css      Every color/spacing value from the agreed palette,
                     as CSS variables — change a hex once here, it updates
                     everywhere.
    global.css       Resets, base typography, focus states.
```

**The rule this structure follows:** anything used in more than one place
(a form field, the contact form fields, a modal shell, a button) lives in
one file and gets imported, never copy-pasted. If you need a new form
later, reuse `FormField` / `Modal` / `Button` rather than writing new CSS.

## The animated hero — how it works, and how to add your real photos

Right now the "scenery" the bus drives past is drawn with CSS gradients +
a mountain silhouette (see `src/components/hero/heroScenes.js`) — so the
hero works immediately with zero image assets.

To swap in your own photography once you have it:

1. Drop your images into `public/images/hero-scenes/` (e.g. `view-1.jpg`,
   `view-2.jpg`, `view-3.jpg`).
2. In `heroScenes.js`, set `image: "/images/hero-scenes/view-1.jpg"` on
   each scene entry.

That's it — the crossfade timing, the scrolling road, and the bus
animation don't change at all; `SceneBackdrop.jsx` automatically uses the
photo instead of the CSS fallback whenever `image` is set. You can add as
many scenes as you want; they cycle in order every ~5.5s
(`SCENE_DURATION_MS` in `AnimatedRoadScene.jsx`).

## How the two CTA flows work

**Book Seat**
1. Modal opens → fetches `GET /trips?trip_timing=next&registration_status=open`.
2. If trips exist: admin's trip list fills a `<select>`, user fills the
   contact fields, submits → `POST /book-seat` with the chosen `trip_id`.
3. If the list is empty: shows "No next trip is planned right now" with a
   small "Notify me when a new trip is announced" link that switches
   straight into the Notify Me modal.
4. On success: shows the success state inline in the same modal.

**Notify Me**
- Same contact fields (`ContactFields.jsx`, shared with Book Seat).
- Can be opened generically (from the hero, from the Destinations page) or
  with context about a specific destination (from a destination's detail
  page) — either way it posts to `POST /notify-me`.
- Success message: *"Your form submitted successfully, we will notify you."*

**Explore Destinations**
- `/destinations` lists every row from `GET /explore` as a blog-style card
  (cover photo pulled from that record's first gallery image, if any).
- Clicking a card goes to `/destinations/:id`, which renders the full
  `detail_description` as a blog post, the full photo gallery, and a
  Notify Me button at the bottom.

## Things to do before this goes live

- **Real hero photography** — see above.
- **Logo** — `Navbar.jsx` currently renders a simple "A4" text mark; drop
  in the real logo file when you have it.
- **Services / Facilities / Contact sections** — only the Hero is built on
  the home page so far; the nav links to `/#services` etc. are placeholders
  ready for you to build those sections the same way Hero was built.
- Point `.env`'s `VITE_API_BASE_URL` at your deployed backend URL before
  building for production (`npm run build`).
