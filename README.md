# Thai Time Clock

En enkel webbapp som visar klockan i 24-timmarsformat och översätter tiden till vardaglig thai.  
När du klickar på tiden läses den upp med webbläsarens talsyntes på thai.

## Funktioner

- Visar aktuell tid i 24-timmarsformat.
- Visar samma tid på thai.
- Visar fonetiskt uttal.
- Spelar upp tiden på thai vid klick.
- Mobilvänlig och responsiv design.
- Bygger på HTML, CSS och JavaScript.

## Thai tidsgrupper

Appen använder vanliga thai-uttryck för tid:

- ตี för 01:00–05:59
- โมงเช้า för 06:00–11:59
- บ่าย / เย็น för 13:00–18:59
- ทุ่ม för 19:00–23:59

00:00 visas som เที่ยงคืน och 12:00 som เที่ยง.

## Filstruktur

```text
thai-time-app/
  index.html
  style.css
  script.js
  README.md
```

## Så kör du lokalt

Öppna `index.html` i din webbläsare.

## Så lägger du upp på GitHub Pages

1. Skapa ett repo på GitHub.
2. Lägg upp filerna i repo-rot.
3. Se till att startsidan heter `index.html`.
4. Gå till **Settings → Pages**.
5. Välj branch `main` och folder `/ (root)`.
6. Spara och vänta tills länken blir aktiv.

## Notering

Om talsyntes inte fungerar perfekt beror det ofta på vilken webbläsare eller vilka röster som är installerade på enheten.
