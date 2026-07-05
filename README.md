# Aura Photography

A premium, responsive photography studio website template built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

![Aura Photography](https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop)

## Features

- **12 pages** — Home, About, Portfolio, Portfolio Detail, Services, Service Detail, Pricing, Blog, Blog Detail, Contact, Coming Soon, 404
- **Elegant design** — Gold & charcoal palette, Cormorant Garamond + Raleway typography
- **Dark / Light mode** — CSS variables with localStorage persistence
- **RTL support** — Full right-to-left layout toggle
- **Lightbox2 gallery** — Click-to-expand portfolio images
- **Form validation** — Client-side booking enquiry validation
- **SEO ready** — Unique meta tags, JSON-LD, sitemap.xml, robots.txt
- **Accessible** — WCAG 2.1 AA patterns (skip links, ARIA, focus states)
- **Responsive** — Mobile, tablet, desktop, and large screen breakpoints
- **Premium hover effects** — Smooth card lifts, button scales, image zooms

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 + Variables | Theming & styling |
| Bootstrap 5.3 | Grid, components, responsive nav |
| JavaScript ES6+ | Dark mode, validation, filters |
| Lightbox2 | Image gallery lightbox |
| Font Awesome 6 | Icons |
| Google Fonts | Cormorant Garamond + Raleway |

## Quick Start

1. Clone or download this template.
2. Open `pages/index.html` in a browser (use a local server for best results).
3. See `documentation/installation-guide.txt` for deployment options.

```bash
cd photography-studio
python -m http.server 8000
# Visit http://localhost:8000/pages/index.html
```

## Project Structure

```
photography-studio/
├── assets/
│   ├── css/          style.css, dark-mode.css, rtl.css
│   ├── js/           main.js, plugins/lightbox2
│   ├── images/       Your WebP images
│   └── fonts/        Optional local fonts
├── pages/            12 HTML pages
├── documentation/    Installation, customization, credits
├── sitemap.xml
├── robots.txt
└── README.md
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Hero, services, portfolio preview, testimonials, newsletter |
| `about.html` | Studio story, team, equipment, certifications |
| `portfolio.html` | Filterable masonry gallery with Lightbox2 |
| `portfolio-details.html` | Single project gallery + testimonial |
| `services.html` | 6 service cards with pricing |
| `service-details.html` | Packages, FAQ, sample gallery |
| `pricing.html` | Pricing tables, add-ons, FAQ |
| `blog.html` | 6 articles with sidebar |
| `blog-details.html` | Full article, share, comments |
| `contact.html` | Booking form + map + WhatsApp |
| `coming-soon.html` | Countdown + email signup |
| `404.html` | Custom error page |

## Customization

See `documentation/customization-guide.txt` for:
- Color variables
- Font changes
- Formspree / Mailchimp setup
- Google Maps embed
- Image replacement

## Integrations (Placeholders)

- **Contact form:** Formspree — update `YOUR_FORM_ID` in `contact.html`
- **Newsletter:** Mailchimp — update action URLs in `index.html` and `coming-soon.html`
- **Maps:** Google Maps iframe in `contact.html`
- **Calendar:** Comment marker in `service-details.html`

## Browser Support

Chrome 90+ · Firefox 88+ · Safari 14+ · Edge 90+

## Credits

See `documentation/credits.txt` for full attributions including Lightbox2 by Lokesh Dhakar.

## License

Free to customize for personal and commercial client projects.
