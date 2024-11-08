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
<!--    <q-tree-->
<!--      class="q-mt-sm"-->
<!--      :nodes="treeNodes"-->
<!--      node-key="name"-->
<!--      label-key="name"-->
<!--      v-model:selected="selectedNamespace"-->
<!--      selected-color="primary"-->
<!--      no-nodes-label="No namespaces"-->
<!--    >-->
<!--      <template #default-body="{ key, node }">-->
<!--        <div class="q-px-lg">-->
<!--          <pre>entities: {{ node.entities.length }}</pre>-->
<!--          <q-btn-->
<!--            no-caps-->
<!--            unelevated-->
<!--            size="sm"-->
<!--            label="Delete Namespace"-->
<!--            color="primary"-->
<!--            icon="eva-archive-outline"-->
<!--            @click="onDeleteNamespace(key)"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
<!--    </q-tree>-->

    <q-list v-if="Array.isArray(dataModel?.model?.namespaces) && dataModel?.model?.namespaces.length">
      <q-item
        v-for="namespace of dataModel?.model?.namespaces"
        clickable
        v-ripple
        :active="selectedNamespace === namespace.name"
        @click="selectedNamespace = namespace.name"
      >
        <q-item-section>
          <q-item-label>{{ namespace.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn-group
            flat
          >
            <q-btn
              round
              icon="eva-edit-2-outline"
              size="sm"
              @click.stop="onRenameNamespace(namespace)"
            >
              <q-tooltip>Rename Namespace</q-tooltip>
            </q-btn>
            <q-btn
              round
              icon="eva-archive-outline"
              size="sm"
              @click.stop="onDeleteNamespace(namespace)"
            >
              <q-tooltip>Delete Namespace</q-tooltip>
            </q-btn>
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>

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

const $q = useQuasar()

const treeNodes = computed(() => dataModel.value.model.namespaces)

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

function onDeleteNamespace({ name: deleteNamespaceName }) {
  $q.dialog({
    title: 'Delete namespace',
    message: `Do you really want to delete namespace "${deleteNamespaceName}"?`,
    color: 'primary',
    cancel: true,
  }).onOk((namespaceName) => {
    // When currently selected namespace is being deleted, select another namespace
    if (selectedNamespace.value === deleteNamespaceName) {
      selectedNamespace.value = dataModel.value.model.namespaces.find((namespace) => namespace.name !== deleteNamespaceName)?.name
    }

    // Remove namespace
    dataModel.value.model.namespaces = dataModel.value.model.namespaces.filter((namespace) => namespace.name !== deleteNamespaceName)
  })
}

function onRenameNamespace(namespace) {
  $q.dialog({
    title: 'Rename namespace',
    message: 'Enter the new name of the new namespace',
    color: 'primary',
    prompt: {
      isValid: val => !!val,
      type: 'text',
      model: namespace.name
    },
    cancel: true,
  }).onOk((namespaceName) => {
    // Automatically select renamed namespace
    if (selectedNamespace.value === namespace.name) {
      selectedNamespace.value = namespaceName
    }

    namespace.name = namespaceName
  })
}
</script>
