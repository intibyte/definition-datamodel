<template>
  <div>
    <q-btn
      no-caps
      unelevated
      icon="eva-plus"
      size="sm"
      label="New namespace"
      color="primary"
      @click="onAddNamespace()"
    />
    <q-tree
      class="q-mt-sm"
      :nodes="treeNodes"
      node-key="name"
      label-key="name"
      v-model:selected="selectedNamespace"
      selected-color="primary"
      no-nodes-label="No namespaces"
    >
      <template #default-body="{ key, node }">
        <div class="q-px-lg">
          <pre>entities: {{ node.entities.length }}</pre>
          <q-btn
            no-caps
            unelevated
            size="sm"
            label="Delete Namespace"
            color="primary"
            icon="eva-archive-outline"
            @click="onDeleteNamespace(key)"
          />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'

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

const treeNodes = computed(() => dataModel.value.model.namespaces)

const $q = useQuasar()

function onAddNamespace() {
  $q.dialog({
    title: 'New namespace',
    message: 'Enter the name of the new namespace',
    color: 'primary',
    prompt: {
      isValid: val => !!val,
      type: 'text'
    },
    cancel: true,
  }).onOk((namespaceName) => {
    dataModel.value.model.namespaces.push({
      name: namespaceName,
      // TODO meta
      meta: {
        description: "Namespace for content-related entities",
        created_by: "John Doe"
      },
      entities: []
    })

    // Automatically select newly created namespace
    selectedNamespace.value = namespaceName
  })
}

function onDeleteNamespace(deleteNamespaceKey) {
  // When currently selected namespace is being deleted, select another namespace
  if (selectedNamespace.value === deleteNamespaceKey) {
    selectedNamespace.value = dataModel.value.model.namespaces.find((namespace) => namespace.name !== deleteNamespaceKey)?.name
  }

  // Remove namespace
  dataModel.value.model.namespaces = dataModel.value.model.namespaces.filter((namespace) => namespace.name !== deleteNamespaceKey)
}
</script>
