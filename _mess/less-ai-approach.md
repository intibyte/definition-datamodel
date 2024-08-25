### Menej AI prístup

## Ako to bude celé fungovať

1. V nejakom software-i si namodelujem DB model (entity, vzťahy).
2. Potom namodelujem (v rovnakom alebo v nejakom inom software-i) CRUDy atď.
3. Výsledkom týchto "modelovaní" su nejaké JSONy.
4. Na základe týchto JSONov sa potom "vygeneruje" konkrétna appka.

Tento pristup sa líší od prístupu aký má napr. Filament v tom, že "modelovanie" je oddelené od "implementácie", kdežto
pri Filamente sa "modeluje" priamo v PHP kóde a teda "model" je naviazaný na konkrétnu technológiu (v tomto prípade
PHP + Laravel + Livewire ...).

Náš prístup je viac generický:

- model
- generátor
- vygenerovaný kód (hotová appka)
