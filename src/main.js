import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
// import './assets/global.css'
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
Vue.use(Antd)
Vue.prototype.$http = axios

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
const hls = require('videojs-contrib-hls')
Vue.use(hls)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
