<template>
  <li :class="`${nameOfTheSelectable}__item`">
    <span
      class="filling"
      :class="`filling--${internalName}`"
      :draggable="isDraggable"
      @dragstart.self="onDrag"
      @dragover.prevent
      @dragenter.prevent
    >
      {{ label }}
    </span>

    <div
      class="counter counter--orange"
      :class="`${nameOfTheSelectable}__counter`"
    >
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="handleDecrease"
        :disabled="isDecreaseUnavailable"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="value" />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="handleIncrease"
        :disabled="isIncreaseUnavailable"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
import DropEffects from "./../enums/dropEffects";

export default {
  name: "ItemCounter",
  props: {
    nameOfTheSelectable: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    internalName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: false,
    },
    transferData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return { count: this.value };
  },
  watch: {
    count(newCount, oldCount) {
      this.$emit("change", {
        newCount,
        oldCount,
        internalName: this.internalName,
      });
    },
  },
  computed: {
    isIncreaseUnavailable() {
      return this.max ? this.count >= this.max : false;
    },
    isDecreaseUnavailable() {
      return this.count === 0;
    },
    isDraggable() {
      return this.transferData !== undefined && !this.isIncreaseUnavailable;
    },
  },
  methods: {
    handleIncrease() {
      this.count = this.value + 1;
    },
    handleDecrease() {
      this.count = this.value - 1;
    },
    onDrag({ dataTransfer }) {
      if (!this.isDraggable) {
        return;
      }
      dataTransfer.effectAllowed = DropEffects.Link;
      dataTransfer.dropEffect = DropEffects.Link;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

<style></style>
