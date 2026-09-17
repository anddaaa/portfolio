# Ka Social Studio — Portfolio Website

A one-page, animated portfolio site for **Ka Social Studio** (Anda Oltean) — creative content & storytelling for lifestyle brands.

## Structure
```
index.html      – page markup (hero, about, services, portfolio, contact)
styles.css      – all styling (fonts, colors, layout, animations, responsive rules)
script.js       – nav scroll state, mobile menu, scroll-reveal animations
images/         – profile photo, portfolio phone mockups, logo
```

## Run it locally
No build step needed — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html` to open it in a browser.

## Deploy with GitHub Pages
1. Create a new repository on GitHub (e.g. `ka-social-studio`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, set **Source** to the `main` branch (root), and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Customizing
- **Colors / fonts**: edit the `:root` variables at the top of `styles.css`.
- **Text**: edit directly in `index.html`.
- **Portfolio links**: update the `href` values in the `.portfolio__grid` section of `index.html`.
- **Contact info**: update the `tel:`, `mailto:`, LinkedIn and Instagram links (appear twice — hero and contact section).
