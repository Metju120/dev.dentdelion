# Verze webu

| Verze | Větev | Výchozí commit | Stav |
| --- | --- | --- | --- |
| A | `verze-a` | `40dadb0f4ab0c3c9385cdfe58de25f92a27e84ee` | Zachovaný stav před optimalizací |
| B | `verze-b` | Verze A | Optimalizace k porovnání a kontrole |

Hlavní větev `main` a její GitHub Pages náhled zůstávají při přípravě B na verzi A.

## Změny B

- Klinické fotografie mají menší responzivní náhledy. Odkazy na plné klinické originály a vodoznaky zůstávají zachovány.
- Portréty převedeny do bezeztrátového WebP se zachováním všech pixelů včetně průhlednosti.
- Obrázek na hlavní stránce má nadále 459 × 156 px, s jemnou kompresí WebP.
- Tři kontaktní ikony používají přímo SVG Font Awesome Free 7.3.1, bez externího CSS a fontů ikon. Licenční podmínky jsou v `assets/icons/LICENSE-fontawesome.txt`.
- Všechny stránky používají shodnou verzi adres společného CSS a JavaScriptu.
- Odstraněny nepoužívané selektory CSS a opakované zápisy aktivního menu při scrollování.
- Mapa, paralax, texty, ceny, chování profilů a ikona koferdamu jsou zachovány.

## Návrat

Do sloučení B stačí ponechat `main` beze změny. Po případném sloučení použít revert příslušného PR; větev `verze-a` uchovává úplný původní stav. Starší historii není nutné přepisovat.
