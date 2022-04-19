import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  ADD_TO_ORDERS,
} from "@/store/mutation-types";

import { capitalize, extensions } from "@/common/helpers";
import resources from "@/common/enums/resources";
import PositionTypes from "@/common/enums/positionTypes";

const entity = resources.ORDERS;
const moduleName = capitalize(entity);
const namespace = { entity, module: moduleName };

const setupState = () => ({
  [resources.ORDERS]: [],
  [resources.INGREDIENTS]: [],
  [resources.DOUGH]: [],
  [resources.SAUCES]: [],
  [resources.SIZES]: [],
  [resources.MISC]: [],
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

const calculatePrice = (a, b) => a + b.count * b.price;

const extend = (orders, state) => {
  const { ingredients, dough, sauces, sizes, misc } = state;
  return orders.map((order) => {
    const pizzas = order.orderPizzas.map((pizza) => {
      const { sauceId, doughId, sizeId } = pizza;
      const sauce = sauces.find((s) => s.id == sauceId);
      const doughItem = extensions[resources.DOUGH](
        dough.find((d) => d.id == doughId)
      );
      const size = sizes.find((s) => s.id == sizeId);
      const fillings = (pizza.ingredients || []).map((ingredient) => {
        return {
          ...ingredients.find((ingr) => ingr.id == ingredient.ingredientId),
          count: ingredient.quantity,
        };
      });
      const sum =
        (sauce.price + doughItem.price + fillings.reduce(calculatePrice, 0)) *
        size.multiplier;

      return {
        ...pizza,
        ingredients: fillings,
        sauce,
        doughItem,
        size,
        price: sum,
        count: pizza.quantity,
      };
    });

    const additions = (order.orderMisc || []).map((addon) => {
      return {
        ...misc.find((m) => m.id == addon.miscId),
        count: addon.quantity,
      };
    });

    const sum =
      pizzas.reduce(calculatePrice, 0) + additions.reduce(calculatePrice, 0);

    return { ...order, orderPizzas: pizzas, price: sum, orderMisc: additions };
  });
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
    async queryRes({ commit }, resource) {
      const data = await this.$api[resource].query();
      commit(
        SET_ENTITY,
        {
          entity: resource,
          module: "Orders",
          value: data,
        },
        { root: true }
      );
    },
    async query({ commit, state }) {
      const data = await this.$api[entity].query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: extend(data, state),
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
