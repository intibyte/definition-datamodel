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

---------------

# Postup

- Generické - nie viazané na Laravel: User manipuluje s GUI desktop appkou (komponentom) a tak spravuje datovy model.
  Vystupom appky je JSON ulozeny dakde v nejakom subore.
- Generické - nie viazané na Laravel: User manipuluje s GUI desktop appkou (komponentom) (moze to byt ta ista appka
  alebo ina) a spravuje "CRUD model". Vystupom je JSON ktory popisuje "CRUDy". Teda tabulky, formulare, validačne
  pravidla, či sa ma zobrazovať edit v samostatnej stranke alebo ako sheet atď. Proste popiše nejako to vysledne CRUD
  GUI.
- Viazané na konkrétnu technológiu - "Reflektor" nasledne zoberie tie dva JSONy (datamodel + CRUD model) a na zaklade
  toho "reflektuje" potrebne zmeny do aplikacie. Pre každy typ aplikacie bude samostatný reflektor. Napr. pre Laravel
  aplikácie bude "Laravel datamodel reflektor" resp. "Laravel CRUD reflektor" a pod. Ten "reflektor" môže byť
  implementovaný hocijak. Ideálne asi ako nejaká CLI utilita. Niečo ako $ laravel-datamodel-reflect
  ./path/to/datamodel.json ./path/to/laravel-app/
- Tak isto môžem mať reflektor pre frontend, napr. pre Quasar alebo React a pod.
- Následne si viem spraviť nejaký watcher (napr. pomocou yarn alebo nejakej node utilitky alebo inak) ktorá bude robiť
  to, že bude sledovať zmeny v tom datamodel.json súbore a ak nastanú tak automaticky spustí ten reflektor. Takže keď
  user zmení datamodel automaticky sa spustí reflektor a upraví mi databázu, modely, migrácie atď proste všetko. Tak
  isto to môže fungovať pre "CRUD reflektor".
- Vo výsledku bude user iba "klikať" do tých "dvoch" aplikácii kde si "nakliká" datamodel + CRUDy a na pozadí sa mu
  automaticky vygeneruje aplikácia. Aplikácia bude mať použité technológie aké ja chcem. Ak si predstavím že mám napr.
  backendové reflektory pre Laravel/Javu/Nodejs a frontendové reflektory pre Quasar/React/Emberjs tak viem kombinovať
  akými technológiami bude výsledná appka vygenerovaná podľa toho, ktoré reflektory použijem. Teoreticky viem takto
  vygenerovať aj inú než webovú appku. Viem si spraviť napr. "Desktop reflector" alebo "Electrom reflector" atď. a
  generovať desktop CRUD appky.

## Ako implementovať custom logiku na backende

- Povedzme že "datamodel-backend-laravel-reflector" mi vygeneruje nejake API routy ktoré= smerujú na nejaké controlery
  ktoré dačo robia.
- Vždy keď sa zmení datamodel/CRUD tak tieto routy+controlery sa pregenerujú, takže ak ako programátor spravím zmeny do
  týchto súborov tak sa mi to vždy premaže. Preto by tieto kontrolery mohli volať nejaké "hooky". Napr. if (
  method_exists("beforeLoadData")) $this->befoleLoadData(...)
- A potom môžem mať nejaký svoj kontrolér ktorý sa vygeneruje iba raz (ak taký súbor zatial neexistuje) a ten bude dediť
  od toho ktorý sa generuje. V tom "mojom" ktorý sa vygeneruje iba raz si viem implementovať tie "hook" metody ktore
  zcustomizuju tu logiku toho vygenerovaneho.

## Ako implementovať custom logiku na frontende

- zatial neviem

## Prečo je možno dobré nepoužiť JSON:API

- každý CRUD "view" môže mať svoju routu ktorá presne vracia tie dáta ktoré ten view zobrazuje
- výhody:
    - žiadne dáta navyše sa neposielajú po sieti
    - ľahké protectovanie CRUD viewov na základe URLky (napr. CRUD view "posts" vie spravovať iba role "posts-manager" a
      pod. teda rieši to ten problém čo som mal napr. na scaff že niektoré resourcy spravovalo viac rolí ale každý
      spravoval iné fieldy v rámci tej entity)
    - JSON:API vracia dáta pre jednu entitu, takto by som si ale vedel vracať ľubovolné dáta, napr. z nejakého
      relationshipu a pod.
