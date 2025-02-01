<template>
  <div class="q-pa-lg">

    <div>
      <div class="text-h5">
        Namespace:
        {{ dataModelForSelectedNamespace.name }}
        <q-btn
          round
          icon="eva-edit-2-outline"
          size="sm"
          @click.stop="onRenameNamespace(namespace)"
        >
          <q-tooltip>Rename Namespace</q-tooltip>
        </q-btn>
      </div>
      <div class="text-subtitle2">Created by {{ dataModelForSelectedNamespace?.meta?.created_by }}</div>
      <div class="text-caption">{{ dataModelForSelectedNamespace?.meta?.description }}</div>
    </div>

    <div class="q-mt-sm q-gutter-sm">
      <q-btn
        no-caps
        unelevated
        size="sm"
        label="New Entity"
        color="primary"
        icon="eva-plus"
        @click="onAddEntity()"
      />
    </div>

    <div class="row q-gutter-lg q-mt-md">
      <q-card
        v-for="entity of entitiesInSelectedNamespace"
      >
        <q-card-section>
          <div>{{ entity.name }}</div>
        </q-card-section>
        <q-card-section>
          <q-btn
            no-caps
            unelevated
            size="sm"
            label="Delete Entity"
            color="primary"
            icon="eva-archive-outline"
            @click="onDeleteEntity(entity)"
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            no-caps
            unelevated
            size="sm"
            label="Add field"
            color="primary"
            icon="eva-plus"
            @click="onAddField(entity)"
          />
        </q-card-section>
        <q-card-section>
          <ul>
            <li
              v-for="field of entity.fields"
            >
              {{ field.name }} ({{ field.type }})
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </div>

  </div>

</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'DataModelEditor'
})

const dataModel = defineModel('dataModel', {
  type: Object,
  required: true
})

const selectedNamespace = defineModel('selectedNamespace', {
  type: String,
})

const dataModelForSelectedNamespace = computed({
  get: () => dataModel.value.model.namespaces
    .find((namespace) => namespace.name === selectedNamespace.value) ?? {},
  set: (changedDataModel) => dataModel.value = changedDataModel
})

const entitiesInSelectedNamespace = computed({
  get: () => dataModelForSelectedNamespace.value.entities ?? [],
  set: (entities) => dataModelForSelectedNamespace.value.entities = entities
})

const $q = useQuasar()

function onAddEntity() {
  $q.dialog({
    title: 'New entity',
    message: 'Enter the name of the new entity',
    color: 'primary',
    prompt: {
      isValid: val => !!val,
      type: 'text'
    },
    cancel: true,
  }).onOk((entityName) => {
    entitiesInSelectedNamespace.value.push({
      name: entityName,
      fields: [
        {
          name: 'id',
          type: 'integer'
        }
      ]
    })
  })
}

function onAddField(entity) {
  $q.dialog({
    title: 'New field',
    message: 'Enter the name of the new field',
    color: 'primary',
    prompt: {
      isValid: val => !!val,
      type: 'text'
    },
    cancel: true,
  }).onOk((fieldName) => {
    entity.fields.push({
      name: fieldName,
      type: 'integer' // TODO
    })
  })
}

function onDeleteEntity(entityForDelete) {
  entitiesInSelectedNamespace.value = entitiesInSelectedNamespace.value.filter((entity) => entity !== entityForDelete)
}
</script>
