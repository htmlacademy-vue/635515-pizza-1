import Vue from "vue";
import Vuex from "vuex";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
} from "@/store/mutation-types";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { uniqueId } from "lodash";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

Vue.use(Vuex);

const actions = {
  async init({ dispatch }) {
    dispatch("Cart/queryMisc");
  },
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export default new Vuex.Store({
  state: {
    notifications: [],
  },
  getters: {},
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
  actions,
  modules,
  plugins: [VuexPlugins],
});
