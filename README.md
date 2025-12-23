# get-dmg

Statyczna strona (one-page) do prezentacji i pobierania aplikacji dla macOS.

## Struktura projektu

- `index.html`: cała strona (HTML + CSS + JS + i18n).  
- `aplikacje/<nazwa>/...`: pliki DMG oraz obrazki instrukcji (np. `Instrukcja1.png`).  
- `Ikony aplikacji/<nazwa>/...`: ikonki/miniatury aplikacji używane na stronie.  
- `CNAME`: domena dla hostingu (np. GitHub Pages).

## Języki

Strona jest tłumaczona w 4 językach: **EN / PL / DE / UA** (i18n jest wbudowane w `index.html`).

## Dodawanie nowej aplikacji (skrót)

1. Dodaj zasoby do:
   - `aplikacje/<app>/` (DMG + screeny instrukcji)
   - `Ikony aplikacji/<app>/` (ikona/miniatura)
2. Podepnij aplikację w `index.html`:
   - karta aplikacji (sekcja)
   - wpis w `Downloads` (tabela)
   - opisy/tłumaczenia w słownikach
