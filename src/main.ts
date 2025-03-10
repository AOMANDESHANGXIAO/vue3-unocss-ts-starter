import { createApp } from 'vue'
import 'virtual:uno.css'
import './styles/common.css'
import './styles/variates.css'
import 'animate.css'
import App from './App.vue'
import router from './routers'
import stores from './stores'
import { library } from '@fortawesome/fontawesome-svg-core'  
import { fas } from '@fortawesome/free-solid-svg-icons'  
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'  
  
library.add(fas) 
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(stores).use(router).mount('#app')
