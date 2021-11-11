import { createApp } from 'vue'
import Wrapper from './DevComps/wrapper.vue'

import vInput from './DevComps/v-input.vue'
import vIcon from './DevComps/v-icon.vue'

const app = createApp(Wrapper)

app.component('v-input', vInput)
app.component('v-icon', vIcon)

app.mount('#app')