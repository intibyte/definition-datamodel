<template>
  <div>DataModelEditor</div>
  <div>namespace: {{ selectedNamespace }}</div>
  <pre>dataModelForSelectedNamespace: {{ dataModelForSelectedNamespace }}</pre>
</template>

<script setup>
import { computed } from 'vue'

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
  get: () => dataModel.value.model.namespaces.find((namespace) => namespace.name === selectedNamespace.value)
})
</script>
