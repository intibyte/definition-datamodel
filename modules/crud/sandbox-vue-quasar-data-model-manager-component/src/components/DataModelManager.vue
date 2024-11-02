<template>
  <q-splitter
    v-model="splitterModel"
  >

    <template v-slot:before>
      <namespace-editor/>
    </template>

    <template v-slot:after>
      <data-model-editor/>
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
  required: true
})

const splitterModel = ref(20)
</script>
