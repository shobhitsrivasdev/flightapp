import Vue from "vue";
import Vuex from "vuex";
import { filterData } from "../utils.js";
import config from "../../config.json";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    initialoutbound: [],
    initialinbound: [],
    filteredInbound: [],
    filteredOutbound: [],
  },
  mutations: {
    saveInbound(state, payload) {
      state.filteredInbound = state.initialinbound = [...payload];
    },
    saveOutbound(state, payload) {
      state.filteredOutbound = state.initialoutbound = [...payload];
    },
    filterOutbound(state, payload) {
      let data = filterData(state.initialoutbound, payload);
      state.filteredOutbound = [...data];
    },
    filterInbound(state, payload) {
      let data = filterData(state.initialinbound, payload);
      state.filteredInbound = [...data];
    },
  },
  getters: {
    outbound(state) {
      return state.filteredOutbound;
    },
    inbound(state) {
      return state.filteredInbound;
    },
  },
  actions: {
    searchPlaces(context, query) {
      return fetch(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/IN/GBP/en-GB/?query=${query}`,
        {
          method: "GET",
          headers: config.header,
        }
      ).then((res) => {
        return (res = res.json());
      });
    },
    flights(context, payload) {
      return fetch(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/IN/INR/en-IN/${payload.query.source.id}/${payload.query.dest.id}/${payload.date}?inboundpartialdate=2020-14-04`,
        {
          method: "GET",
          headers: config.header,
        }
      ).then((res) => {
        return (res = res.json());
      });
    },
  },
  modules: {},
});
