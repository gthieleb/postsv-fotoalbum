# HyperUI Redesign Prompt

## Ziel
Redesign des PostSV Fotoalbum mit HyperUI-Komponenten für ein modernes, visuell ansprechendes Design.

## Quellen
- HyperUI: https://hyperui.dev/
- Komponenten: Blog Cards, CTAs, Cards
- Tailwind CSS v4 kompatibel

## Änderungen

### 1. CSS-Basis (src/app/globals.css)
- Tailwind v4 Theme-Variablen korrigieren
- `--color-card` statt `--color-card-bg` für Tailwind-Utilities
- `--color-muted-foreground` für secondary text
- Dark Mode Kontraste verbessern (kein weiß-auf-weiß/schwarz-auf-schwarz)

### 2. PhotoGallery.tsx
- HyperUI Blog Card Style für Galerie-Items:
  - Gradient Border mit Hover-Animation
  - Floating Image mit Schatten
  - Clean Typography
- Hero Section mit CTA-Style
- Stats-Section mit Card-Komponenten
- Bilder: picsum.photos mit seeded URLs

### 3. galerie/page.tsx
- Alle Bilder auf picsum.photos umstellen
- Konsistente Seeds pro Kategorie:
  - mannschaft: seed=mannschaft1, mannschaft2, ...
  - training: seed=training1, training2, ...
  - oldies: seed=oldies1
  - historisch: seed=historisch1

### 4. UI-Komponenten (Card.tsx, Button.tsx)
- HyperUI Card Styles adaptieren
- Gradient Border Animation
- Hover Effects

## Design-Merkmale
- Gradient Borders mit Hover-Animation
- Floating Images mit Schatten
- Konsistente Dark Mode Kontraste
- Responsive Grid-Layouts
- Smooth Transitions

## Pre-Commit Checks
```bash
npm run lint
npm run build
```

## Playwright MCP Tests
- Homepage visuell prüfen
- Galerie-Seite testen
- Responsive (iPhone 13, iPad)
- Console-Logs auf Fehler prüfen
