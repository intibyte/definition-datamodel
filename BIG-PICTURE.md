# Big picture

# Definícia pojmov

## A: Špecifikácia
- slovná
- technická (napr. JSON Schema)

### Príklady špecifikácie
- špecifikácia dátového modelu v DB
- špecifikácia settings
- špecifikácia CRUD gui

## B: Konkrétny dokument podľa špecifikácie
Konkrétny súbor, vytvorený na základe špecifikácie, ktorý obsahuje informácie o konkrétnej aplikácii.

### Príklady
- súbor, ktorý reprezentuje databázový model aplikácie ABC
- súbor, ktorý reprezentuje množinu settingov pre aplikáciu ABC

## CLI validátor tool
CLI executable schopný overiť, či je konkrétny súbor validný podľa špecifikácie. Môže byť implementovaný ako executable alebo ako nejaký JS ktorý sa bude spúšťať cez node a pod. To treba ešte domyslieť, ale uvažujme, že je to proste executable (napr. nejaký `.sh`).

## Studio
Desktop aplikácia, ktorá slúži na vytváranie/upravovanie konkrétnych dokumentov podľa špecifikácie.

Vstupom/výstupom tohto programu sú práve tie konkrétne dokumenty zo sekcie B.

Niečo ako IDE kde si programátor/architekt vie "naklikať" súbory podľa špecifikácie. Napr. si vizuálne nakliká:
- databázový model
- zoznam settings
- rôzne GUI pre CRUD
- a pod.

