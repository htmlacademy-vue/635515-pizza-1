import user from "@/static/user.json";

const setupState = () => ({
  user: { ...user },
});

export default {
  namespaced: true,
  state: setupState(),
};
