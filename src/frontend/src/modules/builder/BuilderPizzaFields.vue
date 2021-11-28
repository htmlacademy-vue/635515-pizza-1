<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      required
      type="text"
      ref="inputPizzaName"
      name="pizza_name"
      :value="pizzaName"
      @keyup="onChange"
      @change="onChange"
      placeholder="Введите название пиццы"
    />
  </label>
</template>

<script>
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";

export default {
  name: "BuilderPizzaFields",
  data() {
    return { pizzaName: "" };
  },
  watch: {
    pizzaName(newName) {
      EventBus.$emit(EventsEnum.ChangeFields, { pizzaName: newName });
    },
  },
  methods: {
    onChange(ev) {
      this.pizzaName = ev.target.value;
    },
  },
};
</script>

<style></style>
