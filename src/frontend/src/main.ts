import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'element-plus/dist/index.css'
import "vue-toastification/dist/index.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)

import axios from "axios";
import { env } from "../env";
axios.defaults.baseURL = env.BASE_URL ? env.BASE_URL : "http://127.0.0.1:8000"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
Sentry.init({
  app,
  dsn: "https://d64daf164ae14fbb8f6dda79e25cdfd3@o4504201565503488.ingest.sentry.io/4504201703129092",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
app.use(store).use(router).use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('QuillEditor', QuillEditor)
app.mount('#app')