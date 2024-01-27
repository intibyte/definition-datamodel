import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-data-model-manager'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
