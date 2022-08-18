import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import config from '@/config'

// import './mock'

const app = createApp(App)
app.config.globalProperties.$config = config
app.use(store)
  .use(router)
  .use(ViewUIPlus)
  .mount('#app')
