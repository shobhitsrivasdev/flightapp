import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueRouter from "vue-router";
import Home from "../src/components/home.vue";
import Flights from "../src/components/flights.vue";
import store from "./store";
Vue.use(Buefy);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home },
  { path: "/flights", name: "flights", component: Flights },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
