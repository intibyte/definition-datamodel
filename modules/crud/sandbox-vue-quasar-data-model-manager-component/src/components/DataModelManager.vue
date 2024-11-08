<template>
  <q-splitter
    v-model="splitterModel"
  >

    <template v-slot:before>
      <namespace-editor
        v-model:data-model="dataModel"
        v-model:selected-namespace="selectedNamespace"
      />
    </template>

    <template v-slot:after>
      <data-model-editor
        v-if="selectedNamespace"
        v-model:data-model="dataModel"
        v-model:selected-namespace="selectedNamespace"
      />
    </template>


  </q-splitter>
</template>

<script setup>
import { ref } from 'vue'

import NamespaceEditor from 'components/NamespaceEditor.vue'
import DataModelEditor from 'components/DataModelEditor.vue'

defineOptions({
  name: 'DataModelManager'
})

const dataModel = defineModel({
  type: Object,
})

const selectedNamespace = defineModel('selectedNamespace', {
  type: String,
  default: ''
})

const splitterModel = ref(20)
</script>
