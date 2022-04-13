// import user from "@/static/user.json";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import resources from "@/common/enums/resources";

const setupState = () => ({
  // user: { ...user },
  user: null,
  addresses: [],
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    isAuthorized({ user }) {
      return user !== null;
    },
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  actions: {
    // во время успешного логина:
    async login({ dispatch }, credentials) {
      const data = await this.$api[resources.AUTH].login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api[resources.AUTH].setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api[resources.AUTH].logout();
      }
      this.$jwt.destroyToken();
      this.$api[resources.AUTH].setAuthHeader();
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api[resources.AUTH].getMe();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },

    async query({ commit }) {
      const data = await this.$api[resources.ADDRESSES].query();
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "addresses", value: data },
        { root: true }
      );
    },

    async post({ commit }, item) {
      const data = await this.$api[resources.ADDRESSES].post(item);
      commit(
        ADD_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },

    async put({ commit }, item) {
      const newItem = await this.$api[resources.ADDRESSES].put(item);
      commit(
        UPDATE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: newItem,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api[resources.ADDRESSES].delete(id);
      commit(
        DELETE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          id,
        },
        { root: true }
      );
    },
  },
};
