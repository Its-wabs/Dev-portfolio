
# WABS Personal Portfolio

Personal portfolio and creative playground for me an aspiring design engineer based in Algeria. Built to sit at the intersection of editorial design and frontend engineering.

🔗 **Live:** [itswabs.vercel.app](https://itswabs.vercel.app/)

---

## The Honest Version

This portfolio was built before the projects existed to fill it. Deliberately. It was the first thing I built as a design engineer not a software project I was forcing myself to care about, a real creative build. It's where I fell deep into GSAP, motion design, and making things that _feel_ right.

Taste has grown since. A v2 is coming for sure. But this one stays.

---

## ✨ Features

- **Scene-based scroll architecture :** each section is an independent GSAP timeline, composing into a single choreographed experience
- **Modal-first navigation :**  case studies and bio load as overlays, no page reloads, no mental resets
- **Constraint-driven design :**  max 3 elements on screen at once; animations cut by 60% from initial concepts
- **Mobile-tested :**  developed and tested on a Samsung J7 Pro throughout, not just at the end
- **Editorial visual identity :**  bold typography, intentional whitespace, subtle whimsy

---

## 🛠️ Tech Stack

| Layer     | Choice                    | Reasoning                                    |
| --------- | ------------------------- | -------------------------------------------- |
| Framework | React 18 + Vite           | Dev speed over features at this scale        |
| Styling   | Tailwind CSS 3.4          | Utility-first matched component architecture |
| Animation | GSAP 3.12 + ScrollTrigger | Better scroll precision than Framer Motion   |
| Hosting   | Vercel                    | Zero-config deploys                          |

> **What I'd choose now:** Next.js 14 over Vite for the SEO, image optimization, and routing benefits outweigh the dev speed difference for a portfolio context.

---

## 🎬 Animation Architecture

The core pattern is treating every section as a self-contained **scene** with its own GSAP timeline, triggered by ScrollTrigger:

```javascript
// Each section owns its animation — no global state, no tight coupling
const HeroScene = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      }
    });
    // Scene-specific animations here
  }, []);
};
```

**Why this matters:** sections stay maintainable, reusable, and performant animations only run when the section is in viewport.

---

## 🧪 Testing Checklist

- [x] Mobile (iPhone SE, Samsung J7 Pro, Android mid-range)
- [x] Tablet (iPad)
- [x] Desktop (1440px, 1920px)
- [x] Scroll animations at 60fps
- [x] Modal open/close states
- [x] Keyboard navigation
- [x] Reduced motion preference respected

---

## 📚 Key Lessons

**Build projects before the portfolio.** The portfolio is the gallery, not the art. Should have shipped 2–3 client projects first, then built the showcase.

**Design-then-develop beats design-while-developing.** Switching between creative and engineering modes in the same session costs more than it saves. A dedicated design phase even rough pays off.

**Test on real devices, early.** Emulators lie. An actual old phone is a reality check that saves hours of late-stage fixes.

**Constraints enable creativity.** "Do whatever you want" leads to paralysis. "Three elements max per screen" leads to focused, intentional work.

---

## 🗺️ What's Next

- [x] Launch v1 (this)
- [ ] Ship client projects with full case studies ( EDG informatique)
- [ ] Rebuild v2 with Next.js 14, real case study showcase, analytics
- [ ] The Wabs Lab : open-source GSAP animation library

---

## 📝 License

Built as a personal portfolio piece. Design and code by Wabs. Not a template but feel free to take inspiration.

---

## 👤 Developer

[Portfolio](https://itswabs.vercel.app/) · [GitHub](https://github.com/Its-wabs) · [LinkedIn](https://www.linkedin.com/in/itswabs)

---

_Built with stubbornness and slightly too much GSAP. Algeria, 2026._
