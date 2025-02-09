import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import './styles/main.scss';
import Particles from "vue3-particles";

const app = createApp(App)
// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}




app.use(Particles)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
