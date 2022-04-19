﻿import PositionTypes from "@/common/enums/positionTypes";
import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

import SauceNames from "@/common/enums/sauceNames";
import SizeNames from "@/common/enums/sizeNames";

export const extendDough = (dough) => {
  const { image } = dough;
  const regexResult = /dough-(\w*).svg/.exec(image);
  return {
    ...dough,
    type: PositionTypes.Dough,
    internalName: regexResult.length > 1 ? regexResult[1] : "",
  };
};

export const extendIngredient = (ingredient) => {
  const { image } = ingredient;
  const regexResult = /(\w*).svg/.exec(image);
  return {
    ...ingredient,
    internalName: regexResult.length > 1 ? regexResult[1] : "",
    count: 0,
    type: PositionTypes.Ingredient,
  };
};

export const extendSize = (size) => ({
  ...size,
  internalName: SizeNames[size.multiplier],
  type: PositionTypes.Size,
});

export const extendSauce = (sauce) => ({
  ...sauce,
  internalName: SauceNames[sauce.name],
  type: PositionTypes.Sauce,
});

export const extensions = {
  [resources.INGREDIENTS]: extendIngredient,
  [resources.DOUGH]: extendDough,
  [resources.SAUCES]: extendSauce,
  [resources.SIZES]: extendSize,
};

export const hiddenError = (msg) => {
  var console = window.console || {
    error: function () {},
  };
  console.error(msg);
};

export const hiddenWarning = (msg) => {
  var console = window.console || {
    warn: function () {},
  };
  console.warn(msg);
};

export const extendToType = (item, type) => {
  return { ...item, type };
};

export const calculateAmount = (positions) => {
  const withPrice = positions.filter((position) => "price" in position);
  const withMultiplier = positions.filter(
    (position) => "multiplier" in position
  );
  const sum =
    withPrice.length > 0
      ? withPrice.map((item) => item.price).reduce((a, b) => a + b)
      : 0;
  const multiplier =
    withMultiplier.length > 0
      ? withMultiplier.map((item) => item.multiplier).reduce((a, b) => a * b)
      : 1;
  return sum * multiplier;
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const filterSelected = (positions, type) => {
  return positions.find((pos) => pos.type === type) || null;
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),

    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),

    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};
