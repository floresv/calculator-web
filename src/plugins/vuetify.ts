// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  components: {
    ...components,
    ...labsComponents
  },
  directives,
  blueprint: md3,
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: 'dark'
  }
})
