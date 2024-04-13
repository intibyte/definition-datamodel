# CMS / CRM

## TODO List na dokončenie systému

Potrebujem navrhnúť a implementovať tieto moduly:

    [?] auth
    [?] roles & permissions
    [?] settings
    [?] file manager
    [ ] CRUD
        [X] specification
        [X] validator
        [ ] Vue manager component

*? znamená, že mám implementovanú starú veriu, ale neviem či ju použijem alebo spravím novú.*

## Čo myslím pod jednotlivými modulmi:

#### Auth

	- login
	- register
	- prihlasovanie cez google
	- rozdelit na BE / FE

#### Roles & Permissions

	- spatie ?
	- rozdelit na BE / FE

#### Settings

	- global settings
	- chcelo by to mozno tiez dorobit nejaky "editor" + JSON schemu tak ako pri crude, proste by som zadefinoval ake settingy existuju
	- z toho by vznikla nejaka JSON definicia
	- jej sucastou by mohla byt aj validacia
	- na jej zaklade by sa potom "vygenerovalo" GUIko pre editaciu tych settings

#### File Manager

	- hmm... ?
	- rozdelit na BE / FE

#### CRUD

	[X] struktura JSONu na definovanie entit a vztahov (MD dokument pre ľudí)
	[X] nejaka validacia toho JSONu - napr. JSON schema
	[ ] vizualny editor - web-based software (da sa zbuildit ako electrom, pwa, spa ...) na editovanie takych JSONov

	to je "Datamodel JSON definition", ale potom potrebujem nieco ako "Resource JSON definition" (datamodel je akoby databaza, resource su uz GUI entity ktore viem editovat, nemusi to byt jedna k jednej s databazou)
	tie "Resource" by mali definovat napr. validacne pravidla, nejake vizualne veci (ako bude vzyerat editovaci formular a pod.)
	takze to bude vlastne samostatna JSON schema nejaka ina ako ta "datamodel definicia", bude to skratka oddelene

	tool "datamodel validator" - na vstupe dostane datamodel (ten by mal obsahovat verziu specifikacie) a na vystupe povie ci je ok alebo nie. Ak nie je, optionally moze vratit aj nejaky zoznam "chyb"

	modul "database" - na zaklade toho JSONu musi upravit DB ("zmigrovat" zmeny)
	modul "models" - na zaklade toho JSONu musi vytvorit laravel modely
	modul "api" - na zaklade toho JSONu musi vystavit API endpointy (JSON:API alebo ine)
	modul "gui" - na zaklade toho JSONu musi vytvorit GUI CRUD pre editaciu danych entit

	cele to zautomazitovat (mozno cez nejake "eventy" ?)

---------------------------------

## Poznámky

#### Dobre napdy AI

	- Consider providing integrations or plugins for popular development tools, IDEs, or continuous integration platforms to enable seamless validation during the development process.

#### Git Repos Structure

	- *-specification - human readable specification
	- *-schema - computer-readable JSON Schema
	- js-package-* - any JS/TS package source code

	# Examples:

		- docs-schema-datamodel
		- json-schema-datamodel
		- npm-datamodel-validator
		- composer-settings
		- composer-settings-api

		- datamodel-specification
		- datamodel-schema
		- datamodel-validator-package
		- datamodel-validator-app
