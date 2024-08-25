# Easy TODO

### Prvy krok

**Chcem spravit appku (Vue component) ktora bude vediet vytvarat/upravovat datamodely (nieco ako UML class diagram) a
tieto datamodely
ukladat do JSON (suborov).**

*Zatial zabudni na webove appky, databazu, Quasar, vue laravel ...*

---

### Druhy krok

**Chcem spravit appku (Vue component) ktory bude vediet vytvarat/upravovat resource-modely. Resource moze byt
jedna-k-jednej s entitami z datamodelu, ale nemusi. Pre jednu entitu z datamodelu moze existovat aj viac resources.
Napr. pre entitu user mozu byt 3 resources: admin, worker, contractor. Kazdy resource potom moze mat "views" (tabulky)
a "forms" atd. Neviem, nad tym sa este zamysliet ako to spravit flexibilne.**

---

### Treti krok

Sprav niečo, čo by vedelo na zaklade JSON datamodelu spraviť:
- modely
- migracie
- policy 
