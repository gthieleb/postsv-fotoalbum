# Agent Instructions

## Pipeline

Bei jedem Commit und Push wird die GitHub Actions Pipeline ausgeführt:
- `.github/workflows/deploy.yml` baut das Projekt und deployt zu GitHub Pages

## Pre-Commit Checks

Vor jedem Commit sind folgende Checks auszuführen:

```bash
npm run lint
npm run build
```

Beide Commands müssen erfolgreich sein, bevorcommitted werden darf.

## Playwright MCP Testing

Nach erfolgreichem Build wird Playwright MCP verwendet, um die deployedte Seite zu testen.

### Test-Workflow

1. Site öffnen mit `playwright_navigate`:
   ```
   URL: https://[owner].github.io/postsv-fotoalbum/
   ```

2. Visuelle Tests durchführen:
   - `playwright_screenshot` - Screenshots für visuelle Validierung
   - `playwright_get_visible_text` - Textinhalt prüfen
   - `playwright_get_visible_html` - HTML-Struktur validieren

3. Interaktionen testen:
   - `playwright_click` - Klick-Interaktionen
   - `playwright_fill` - Formular-Eingaben
   - `playwright_hover` - Hover-Effekte

4. Responsives Verhalten prüfen:
   - `playwright_resize` mit Device-Presets (z.B. "iPhone 13", "iPad Pro 11")

### Wichtige Hinweise

- Immer `playwright_close` am Ende aufrufen, um Ressourcen freizugeben
- Console-Logs mit `playwright_console_logs` auf Fehler prüfen
- Nach Deployment warten, bis GitHub Pages die Seite aktualisiert hat (ca. 1-2 Minuten)
