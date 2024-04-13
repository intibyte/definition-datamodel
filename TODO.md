# TODO List

## Modules

- [ ] auth
- [ ] roles & permissions
- [ ] settings
- [ ] file manager
- [ ] CRUD
    - [ ] Data Model
        - [X] Data Model JSON Schema
        - [ ] Data Model Specification
        - [X] Data Model Validator npm package
        - [ ] Data Model Vue Manager Component (`DataModelManager.vue`)
    - [ ] Reflectors
        - Reflectors should be configurable (enable / disable specified reflector)
        - Reflectors might be implemented using "events" architecture
        - [ ] Database Reflector
            - na zaklade toho datamodel JSONu musi upravit DB ("zmigrovat" zmeny)
        - [ ] Eloquent Reflector
            - na zaklade toho datamodel JSONu musi vytvorit laravel modely
        - [ ] API Reflector
            - na zaklade toho datamodel JSONu musi vystavit API endpointy (JSON:API alebo ine)
        - [ ] GUI Reflector
            - na zaklade toho datamodel JSONu musi vytvorit GUI CRUD pre editaciu danych entit
    - [ ] Resource Model
        - [ ] Resource Model JSON Schema
        - [ ] Resource Model Specification
        - [ ] Resource Model Validator npm package
        - [ ] Resource Model Vue Manager Component (`ResourceModelManager.vue`)
