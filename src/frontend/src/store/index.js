import Vue from "vue";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const actions = {
  async init({ dispatch }) {
    dispatch("Cart/queryMisc");
  },
};

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },
  },
  actions,
  modules,
  plugins: [VuexPlugins],
});
