// import user from "@/static/user.json";
import { SET_ENTITY } from "@/store/mutation-types";

const setupState = () => ({
  // user: { ...user },
  user: null,
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
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },
  },
};
