# Easy TODO

*Zatial zabudni na webove appky, databazu, Quasar, Vue, Laravel ...*

### 1. krok

Chcem spravit appku (Vue component) ktora:

- bude vediet vytvarat/upravovat datamodely (nieco ako UML class diagram)
- tieto datamodely ukladat do JSON (suborov)
- hint: [tento package](https://github.com/nymphaea-v1/quasar-app-extension-q-tel-input/tree/master/ui) pouziva .vue
  subory
  vnutri app-extension
- naštuduj toto: https://quasar.dev/app-extensions/introduction#what-can-an-app-extension-do

### 2. krok

Chcem spravit appku (Vue component) ktory bude vediet vytvarat/upravovat resource-modely. Resource moze byt
jedna-k-jednej s entitami z datamodelu, ale nemusi. Pre jednu entitu z datamodelu moze existovat aj viac resources.
Napr. pre entitu user mozu byt 3 resources: admin, worker, contractor. Kazdy resource potom moze mat "views" (tabulky)
a "forms" atd. Neviem, nad tym sa este zamysliet ako to spravit flexibilne.

### 3. krok

Sprav niečo, čo by vedelo na zaklade JSON datamodelu spraviť:

- modely
- migracie
- policy 
