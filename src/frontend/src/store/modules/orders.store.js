import { ADD_TO_ORDERS } from "@/store/mutation-types";

const setupState = () => ({
  orders: [],
});
export default {
  namespaced: true,
  state: setupState(),
  mutations: {
    [ADD_TO_ORDERS](state, newOrder) {
      state.orders = [
        ...state.orders,
        {
          ...newOrder,
        },
      ];
    },
  },
};
