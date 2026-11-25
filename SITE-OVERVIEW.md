# SmartAvatar website: page overview

All pages share the same system: paper `#F2F2EE` and ink `#111` with pastel accents, Pixelify Sans headings, Satoshi body, halftone dot illustrations, the bottom dock, pixel transitions, the bracket cursor and Lenis smooth scroll. Every inner page ends with the "SAY HI" dot-playground footer.

## Site map

```
/                         Home (the current prototype)
├── /platform             Real-Time Digital Services Platform
│   ├── /platform/live-twin
│   ├── /platform/ota-updates
│   ├── /platform/remote-control
│   ├── /platform/edge-ai
│   └── /platform/zero-trust
├── /machines             Use cases and industries
│   ├── /machines/heavy-equipment
│   ├── /machines/robotics
│   ├── /machines/healthcare
│   ├── /machines/insurance
│   ├── /machines/agriculture
│   └── /machines/security
├── /research             Horizon Europe programmes
│   └── /research/[project]   (6 pages)
├── /play                 Full-screen arcade
├── /team                 People, offices, careers
├── /consulting           Project consulting, funding, Zero Trust
├── /banded               BÅNDED programme
├── /contact              Book a demo
├── /verify               Verify a certificate
└── /legal                Privacy, cookies, terms
```

## What leads where (from Home)

| Where you click on Home | Goes to |
|---|---|
| Hero · "Book a demo" | /contact |
| Hero · "Play the demo" | scrolls to the game section |
| Machines · "See all machines" | /machines |
| Platform · "Explore the platform" | /platform |
| Platform · a strip (click) | opens it here; a second link inside goes to /platform/[feature] |
| Use cases · "Read the case" on a card | /machines/[case] |
| Game · cartridges | swap the game in place (no page change) |
| Research · "View project" | /research/[project] |
| Team · "Meet the team" | /team |
| Team cards · TulipTech | tuliptech.nl (new tab) |
| Footer · links | /platform, /machines, /research, /team, /legal, /verify |
| Dock icons | sections on Home; on inner pages they jump back to Home sections |

In the prototype, links to pages that don't exist yet show a small toast ("Opens /platform …") instead of a broken page.

## Page by page

### /platform
- **Hero:** the five-strip avatar again, large. Scroll splits it, and each strip becomes a tab.
- **Interactive diagram:** cloud → edge → machine, drawn in dots. Click a layer to see what runs there.
- **Feature rows:** one per power, each with a halftone illustration and a 3-line explanation.
- **Specs:** latency, protocols, Hyperledger and GDPR notes in plain words.
- **CTA:** Book a demo.

### /platform/[feature] (5 pages)
- **Hero:** the feature's mini avatar (globe, chip, controller, bolt, shield) as a big dot illustration.
- **"How it works":** 3 steps, each a small scroll scene.
- **One live mini-demo per page:**
  - OTA: push an update, then roll it back.
  - Remote: drive a dot tractor.
  - Zero Trust: block intruders.
  - Edge AI: a wear prediction bar.
  - Live twin: a moving dot machine with live data chips.
- **Related use cases:** a row of cards.

### /machines
- **Filterable grid:** six use-case cards, with industry chips (Transportation, Manufacturing, Healthcare, Insurance, Industrial IoT, Retail).
- **Card behaviour:** cards flip on click, the same as on Home.

### /machines/[case] (6 pages)
- **Hero:** the machine in dots, morphing into its avatar on scroll.
- **Story:** problem → what SmartAvatar did → result, with one big number per case (40 km, 212 h, 100 %, …).
- **Next case:** a pixel-transition link to the next case.

### /research
- **Bars:** the six thin-line bars from Home, full width.
- **Interactive timeline:** 2023 → 2029.
- **Partner logos:** in a dot grid.

### /research/[project] (6 pages)
- **Goal:** what the project is for.
- **Our role:** what SmartAvatar does in it.
- **Work packages and outputs**
- **Funding note:** the EU funding acknowledgement.

### /play
- **Device:** the handheld, full screen, with all cartridges.
- **Leaderboard:** this device only.
- **Story:** how each game maps to a real platform idea.

### /team
- **Offices:** Delft, Amsterdam and Mountain View, with live clocks.
- **People:** team members as halftone portraits; hover shows a pixel version.
- **Careers:** open roles across the Netherlands, Bangladesh and Taiwan.
- **Sister studio:** a TulipTech card.

### /consulting
- **Three services:** tech project consulting, secure innovation funding, Zero Trust.
- **Process:** 4 steps.
- **CTA:** Book a call.

### /banded
- **Audiences:** institutions & cities, universities & NGOs, BåndFixIt.

### /contact
- **Book a demo:** a terminal-style form (name, company, machine type), plus an email copy button.
- **Offices:** a dot map.

### /verify
- **Lookup:** enter a certificate ID, and a dot avatar "scans" it to show a valid or invalid result.

### /legal
- **Text pages:** plain pages with the same header, dock and footer.
