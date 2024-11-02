<template>
  <q-page>

    <data-model-manager
      v-model="dataModel"
      style="min-height: 400px;"
    />

    <pre class="bg-dark q-ma-none q-pa-xl">{{ dataModel }}</pre>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import dataModelExample1 from '../../../data-model-examples/1.0/1.json'

import DataModelManager from 'components/DataModelManager.vue'

const dataModel = ref(dataModelExample1)

defineOptions({
  name: 'IndexPage'
})
</script>
