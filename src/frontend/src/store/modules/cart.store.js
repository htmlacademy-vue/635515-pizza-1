import misc from "@/static/misc.json";
import {
  ADD_TO_CART,
  RESET_CART,
  CHANGE_PIZZA_COUNT,
  CHANGE_MISC_COUNT,
  CHANGE_CONTACTS,
} from "@/store/mutation-types";
import { hiddenError, calculateAmount } from "@/common/helpers";

const setupState = () => ({
  misc: misc.map((item) => ({ ...item, count: 0 })),
  pizza: [],
  contacts: {
    street: "",
    tel: "",
    house: null,
    apartment: null,
    receiptType: "1",
  },
});

let increment = 0;

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    amount({ pizza, misc }) {
      let ret = 0;

      pizza.forEach((pizza) => {
        ret += calculateAmount(pizza.positions) * pizza.count;
      });
      misc.forEach((item) => {
        ret += item.count * item.price;
      });

      return ret;
    },
    orderedPizza({ pizza }) {
      return pizza.sort((a, b) => (a.id < b.id ? -1 : 1));
    },
  },
  mutations: {
    [ADD_TO_CART](state, newPizza) {
      if (newPizza.id === null) {
        state.pizza = [...state.pizza, { ...newPizza, id: increment++ }];
        return;
      }

      const withoutCurrent = state.pizza.filter(
        (product) => product.id !== newPizza.id
      );

      state.pizza = [...withoutCurrent, { ...newPizza }];
    },
    [CHANGE_PIZZA_COUNT](state, { newCount, id }) {
      if (newCount === 0) {
        const findedPizza = state.pizza.filter((item) => item.id !== id);
        state.pizza = findedPizza;
        return;
      }

      const pizzaById = state.pizza.filter((item) => item.id === id);
      if (pizzaById.length === 0) {
        hiddenError(
          `Collections crash. Can't find element with internal name "${id}" (${newCount}).`
        );
        return;
      }
      pizzaById[0].count = newCount;
    },
    [CHANGE_MISC_COUNT](state, { newCount, id }) {
      const miscById = state.misc.filter((item) => item.id === id);
      if (miscById.length === 0) {
        hiddenError(
          `Collections crash. Can't find element with internal name "${id}" (${newCount}).`
        );
        return;
      }
      miscById[0].count = newCount;
    },
    [CHANGE_CONTACTS](state, contacts) {
      state.contacts = { ...contacts };
    },
    [RESET_CART](state) {
      Object.assign(state, setupState());
    },
  },
  actions: {
    async sendOrder({ commit }) {
      commit(RESET_CART);
    },
  },
};
