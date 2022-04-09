import user from "@/static/user.json";

const setupState = () => ({
  user: { ...user },
  // user: null,
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    isAuthorized({ user }) {
      return user !== null;
    },
  },
};
