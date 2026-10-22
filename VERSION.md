# Verze C

Výchozí verze B: `089c5be50284eb3649ec5e5cec4edda78cbc5792`.
Samostatná větev `verze-c`; `verze-b` zachována pro návrat.

- Vysoká priorita přednačítání úvodní fotografie.
- Scroll skript nejprve čte rozložení a potom mění styly. Inicializace přes requestAnimationFrame.
- Zachovány prahy kompaktní hlavičky 120/16 px a ovládání profilů.
- Kontrast navigace a ordinačních hodin: bílá na #367c80 (4,83:1).
- Drobné zlaté nadpisy #876500 (4,90:1 na #f4f4f3).
- Logo bezeztrátové WebP. Portréty WebP kvalita 95, původní rozměry a alfa kanál.
- Texty, odkazy, mapa, klinické fotografie a rozložení zachovány.

Kontroly: syntaxe JS, pořadí čtení/zápisů při scrollu, hystereze hlavičky, aktivní menu, shoda textů/odkazů/mapy, obrazové rozměry/alfa, pixelová shoda loga, výpočet kontrastu.

Zrychlení ani nové skóre PageSpeed zatím nebylo změřeno. Po přepnutí GitHub Pages na větev verze-c je nutná vizuální kontrola a opakování mobilního měření. Příčinu celé prodlevy vykreslení úvodní fotografie zatím nelze považovat za prokázanou.
