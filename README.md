# Zuhal Brand Mall

A responsive luxury women's fashion store built with **React 18**, **Tailwind CSS 3** and **Vite**.
Made by **Zuhal Sohaib**.

## Run it
```
npm install
npm run dev        # open the address it prints (usually http://localhost:5173)
npm run build      # production build in the dist/ folder
npm run preview    # test the production build
```
Needs Node.js 18 or newer.

## Project structure
```
index.html              page shell and fonts
tailwind.config.js      colours, fonts, keyframes and animations
src/
  main.jsx              starts React
  index.css             Tailwind + the site's custom CSS
  App.jsx               header, footer, routing (#home, #shop, #cart ...), state
  data.js               products, categories, brands, colour and season tags
  helpers.jsx           icons, storage helper, shared button and card styles
  components/           ui (photos, cards, reveal, counter), effects (intro curtain,
                        sparkles, tilt), sections (flash sale, style finder, lookbook,
                        newsletter), chrome (top banner, search)
  pages/                Home, Categories, Shop, Product, Checkout (bag, checkout,
                        order done), Account (sign in, about, saved, 404), Dashboard
public/images/          all product photos, one folder per category
```

## Features
- 213 styles in 8 categories, with a Categories page (dresses by season, bags by brand, others by colour)
- Search (Ctrl/Cmd + K), filters, sorting, product pages with size choice and photo zoom
- Saved styles, shopping bag, promo code `ROSE20`, checkout with validation, order confirmation
- Sign in / create account, light and dark mode
- Admin dashboard (admin@zuhalmall.com / admin123)
- Style finder quiz, lookbook, opening curtain, sparkle trail, 3D tilt
- Hero numbers count up slowly and softly
- Everything animates in from top to bottom
- Responsive for phones, tablets and desktops

## Notes
Cart, saved styles and accounts are stored in the browser only (demo, no backend or real payments).
