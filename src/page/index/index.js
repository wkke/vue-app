import Vue from "vue";
import Tpl from "./template.vue";
import "@assets/style/main.scss";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);



new Vue({
  render: h => h(Tpl),
}).$mount("#app");