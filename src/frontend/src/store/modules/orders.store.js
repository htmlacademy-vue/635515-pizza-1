import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  ADD_TO_ORDERS,
} from "@/store/mutation-types";

import { capitalize } from "@/common/helpers";
import resources from "@/common/enums/resources";
import PositionTypes from "@/common/enums/positionTypes";

const entity = resources.ORDERS;
const module = capitalize(entity);
const namespace = { entity, module };

const setupState = () => ({
  [resources.ORDERS]: [],
});

const transformPizza = ({ count, metadata, positions }) => {
  const name = metadata.find((data) => (data.interNalName = "pizzaName")).value;

  const sauceId = positions.find((pos) => pos.type == PositionTypes.Sauce).id;
  const doughId = positions.find((pos) => pos.type == PositionTypes.Dough).id;
  const sizeId = positions.find((pos) => pos.type == PositionTypes.Size).id;

  const ingredients = positions
    .filter((pos) => pos.type == PositionTypes.Ingredient)
    .map((pos) => ({ ingredientId: pos.id, quantity: pos.count }));

  return {
    name,
    sauceId,
    doughId,
    sizeId,
    quantity: count,
    ingredients,
  };
};

const transformOrder = ({ userId, pizza, misc, contacts }) => {
  const address =
    contacts.id === null
      ? {
          street: contacts.street,
          building: contacts.house,
          flat: contacts.apartment,
          comment: contacts.comment,
        }
      : { id: contacts.id };
  return {
    userId,
    phone: contacts.tel,
    address,
    misc: misc.map((m) => ({ miscId: m.id, quantity: m.count })),
    pizzas: pizza.map(transformPizza),
  };
};

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
  actions: {
    async query({ commit }) {
      const data = await this.$api[entity].query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    async post({ commit }, item) {
      const data = await this.$api[entity].post(transformOrder(item));
      commit(
        ADD_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api[entity].delete(id);
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id,
        },
        { root: true }
      );
    },
  },
};
