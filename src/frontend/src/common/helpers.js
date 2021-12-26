import PositionTypes from "@/common/enums/positionTypes";

export const extendDough = (dough) => {
  const { image } = dough;
  const regexResult = /dough-(\w*).svg/.exec(image);
  return {
    ...dough,
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

export const hiddenError = (msg) => {
  var console = window.console || {
    error: function () {},
  };
  console.error(msg);
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
