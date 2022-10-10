import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import Toast from 'vue-toastification'

import 'element-plus/dist/index.css'
import "vue-toastification/dist/index.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
