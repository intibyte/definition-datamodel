<template>
  <q-tree
    :nodes="treeNodes"
    node-key="name"
    label-key="name"
    v-model:selected="selectedNamespace"
    selected-color="primary"
  />
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'NamespaceEditor'
})

const dataModel = defineModel('dataModel', {
  type: Object,
  required: true
})

const selectedNamespace = defineModel('selectedNamespace', {
  type: String,
})

const treeNodes = computed(() => dataModel.value.model.namespaces.map((namespace) => ({
  name: namespace.name
})))
</script>
