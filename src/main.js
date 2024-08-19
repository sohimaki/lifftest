import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import config from '@/config.js'
import liff from '@line/liff'

const liffid = config.liffid

loadFonts()

liff
  .init({ liffId: liffid }) 
  .then(() => {
    if (!liff.isLoggedIn() && window.navigator.userAgent.includes("Line")) {
      liff.login();
    }    
    window.liff = liff; // グローバル変数として設定
    createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')
  })
  .catch((err) => {
    alert(" liff.init({ liffId: '" + liffid + "' }) ERROR: " + err)
  })
