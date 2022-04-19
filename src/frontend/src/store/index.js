﻿import Vue from "vue";
import Vuex from "vuex";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { uniqueId } from "lodash";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import resources from "@/common/enums/resources";

Vue.use(Vuex);

const actions = {
  async init({ dispatch }) {
    dispatch("Cart/queryMisc");
    dispatch("Builder/queryRes", resources.SAUCES);
    dispatch("Builder/queryRes", resources.SIZES);
    dispatch("Builder/queryRes", resources.INGREDIENTS);
    dispatch("Builder/queryRes", resources.DOUGH);
    dispatch("Orders/queryRes", resources.SAUCES);
    dispatch("Orders/queryRes", resources.SIZES);
    dispatch("Orders/queryRes", resources.INGREDIENTS);
    dispatch("Orders/queryRes", resources.DOUGH);
    dispatch("Orders/queryRes", resources.MISC);
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
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },
    [ADD_ENTITY](state, { module, entity, value }) {
      if (module) {
        state[module][entity] = [...state[module][entity], value];
      } else {
        state[entity] = [...state[entity], value];
      }
    },
    [UPDATE_ENTITY](state, { module, entity, value }) {
      if (module) {
        const index = state[module][entity].findIndex(
          ({ id }) => id === value.id
        );
        if (~index) {
          state[module][entity].splice(index, 1, value);
        }
      } else {
        const index = state[entity].findIndex(({ id }) => id === value.id);
        if (~index) {
          state[entity].splice(index, 1, value);
        }
      }
    },
    [DELETE_ENTITY](state, { module, entity, id }) {
      if (module) {
        state[module][entity] = state[module][entity].filter(
          (e) => +e.id !== +id
        );
      } else {
        state[entity] = state[entity].filter((e) => +e.id !== +id);
      }
    },
  },
  actions,
  modules,
  plugins: [VuexPlugins],
});
