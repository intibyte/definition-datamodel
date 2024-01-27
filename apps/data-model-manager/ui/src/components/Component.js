import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'DataModelManager',

  setup () {
    return () => h(QBadge, {
      class: 'DataModelManager',
      label: 'DataModelManager'
    })
  }
}
