import PositionTypes from "@/common/enums/positionTypes";

import {
  hiddenError,
  hiddenWarning,
  filterSelected,
  extensions,
} from "@/common/helpers";
import {
  ADD_POSITION,
  REMOVE_POSITION,
  RESET_BUILDER,
  SET_PIZZA,
  SET_ENTITY,
} from "@/store/mutation-types";
import resources from "@/common/enums/resources";

const defaultContent = {
  [resources.INGREDIENTS]: [],
  [resources.DOUGH]: [],
  [resources.SAUCES]: [],
  [resources.SIZES]: [],
};

const copyResources = (resource) => {
  return [...defaultContent[resource].map((item) => ({ ...item }))];
};

const setupState = () => ({
  [resources.INGREDIENTS]: copyResources(resources.INGREDIENTS),
  [resources.DOUGH]: copyResources(resources.DOUGH),
  [resources.SAUCES]: copyResources(resources.SAUCES),
  [resources.SIZES]: copyResources(resources.SIZES),

  ingredientsSet: {
    id: null,
    positions: [],
    metadata: [
      {
        internalName: "pizzaName",
        displayName: "Название пиццы",
        value: "",
        required: true,
      },
    ],
    count: 1,
  },
});

const getSelectedInternalName = (positions, type) => {
  const ret = filterSelected(positions, type);
  return ret !== null ? ret.internalName : "";
};

export default {
  namespaced: true,
  state: setupState(),

  getters: {
    selectedDough({ ingredientsSet }) {
      return getSelectedInternalName(
        ingredientsSet.positions,
        PositionTypes.Dough
      );
    },
    selectedSize({ ingredientsSet }) {
      return getSelectedInternalName(
        ingredientsSet.positions,
        PositionTypes.Size
      );
    },
    selectedSauce({ ingredientsSet }) {
      return getSelectedInternalName(
        ingredientsSet.positions,
        PositionTypes.Sauce
      );
    },
    addedIngredients({ ingredients }) {
      return ingredients.filter((ingredient) => ingredient.count > 0).slice();
    },
  },

  actions: {
    async queryRes({ commit }, resource) {
      const data = await this.$api[resource].query();
      defaultContent[resource] = data.map(extensions[resource]);
      commit(
        SET_ENTITY,
        {
          entity: resource,
          module: "Builder",
          value: copyResources(resource),
        },
        { root: true }
      );
    },
  },

  mutations: {
    [ADD_POSITION](state, position) {
      if (!("price" in position || "multiplier" in position)) {
        hiddenError(
          `Mutation ${ADD_POSITION} passed an object with the wrong structure. The object must contain a price or multiplier field.`
        );
        return;
      }

      state.ingredientsSet.positions = [
        ...state.ingredientsSet.positions,
        position,
      ];
    },
    [REMOVE_POSITION](state, position) {
      const { positions } = state.ingredientsSet;
      if (positions.length === 0) {
        hiddenWarning(
          `The collection of positions has already been cleared. Internal name ${position.internalName}`
        );
        return;
      }

      const findedPositions = positions.filter(
        (item) => item.internalName !== position.internalName
      );
      if (findedPositions.length === positions.length) {
        hiddenWarning(
          `Event RemovePosition passed an wrong object. The collection has no such object. Internal name ${position.internalName}`
        );
        return;
      }

      state.ingredientsSet.positions = findedPositions;
    },
    [SET_PIZZA](state, pizza) {
      state.ingredientsSet = { ...pizza };
      pizza.positions
        .filter((pos) => pos.type == PositionTypes.Ingredient)
        .forEach((pos) => {
          state.ingredients
            .filter((ing) => ing.internalName == pos.internalName)
            .forEach((current) => (current.count = pos.count));
        });
    },
    [RESET_BUILDER](state) {
      Object.assign(state, setupState());
    },
  },
};
