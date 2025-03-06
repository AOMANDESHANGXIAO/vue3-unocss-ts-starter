import { createApp } from 'vue'
import 'virtual:uno.css'
import './styles/common.css'
import './styles/variates.css'
import App from './App.vue'
import stores from './stores'

const app = createApp(App)

app.use(stores).mount('#app')
