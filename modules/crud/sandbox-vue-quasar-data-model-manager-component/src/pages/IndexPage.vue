<template>
  <q-page class="column">

    <data-model-manager
      v-model="dataModel"
      class="col col-grow"
    />

    <pre class="col col-shrink bg-dark q-ma-none q-pa-xl">{{ dataModel }}</pre>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

import DataModelManager from 'components/DataModelManager.vue'

const dataModel = ref({})

defineOptions({
  name: 'IndexPage'
})
</script>
