import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/all.scss';
import router from './router'  // 引入路由
import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入 Vee Validate 元件跟功能
import {Form, Field, ErrorMessage, defineRule, configure} from 'vee-validate'
// 引入 Vee Validate 全部驗證規則
import { required, email, min } from '@vee-validate/rules';
// 引入 Vee Validate 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 Vee Validate 繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// 加入 Vee Validate 繁體中文語系檔
// *將當前 Vee Validate 語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
})

// *設定預設語系
setLocale('zh_TW')
// Vee Validate 表單驗證語法結束

const app = createApp(App)

// 註冊全域的表單驗證元件（VForm, VField, ErrorMessage）
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.use(createPinia())
app.use(router)  // 註冊路由
app.use(VueAxios, axios)

app.mount('#app')
