
import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import WidgetComponent from './Widget'
Vue.config.devtools = true;
Vue.use(VueCustomElement)
Vue.customElement('widget-app', WidgetComponent)
