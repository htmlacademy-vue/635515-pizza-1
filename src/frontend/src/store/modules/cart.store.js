import misc from "@/static/misc.json";
import { ADD_TO_CART } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    misc,
    pizza: [],
    address: { street: "", house: null, apartment: null },
    phone: "",
    ReceiptType: 1,
  },
  mutations: {
    [ADD_TO_CART](state, newPizza) {
      state.pizza = [...state.pizza, newPizza];
    },
  },
};
