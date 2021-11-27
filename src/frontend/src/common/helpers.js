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
  };
};

export const hiddenError = (msg) => {
  var console = console || {
    error: function () {},
  };
  console.error(msg);
};

export const initCoutns = (ingredients) => {
  let ret = {};
  ingredients.forEach((ingredient) => {
    ret[ingredient.internalName] = {
      price: ingredient.price,
      count: 0,
    };
  });
  return ret;
};

export const extendToType = (item, type) => {
  return { ...item, type };
};
