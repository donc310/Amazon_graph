
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueCustomElement from 'vue-custom-element'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'intro.js/introjs.css';
import VueIntro from 'vue-introjs';
import WidgetComponent from './Widget'
Vue.config.devtools = true;
Vue.use(VueIntro);
Vue.use(VueCustomElement)
Vue.use(BootstrapVue)
Vue.customElement('widget-app', WidgetComponent)
