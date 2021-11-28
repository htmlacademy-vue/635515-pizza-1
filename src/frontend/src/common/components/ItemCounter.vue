<template>
  <li :class="`${nameOfTheSelectable}__item`">
    <span
      class="filling"
      :class="`filling--${internalName}`"
      :draggable="isDraggable()"
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
        :disabled="isDecreaseUnavailable()"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="count" />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="handleIncrease"
        :disabled="isIncreaseUnavailable()"
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
    count: {
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
  watch: {
    count(newCount, oldCount) {
      this.$emit("change", {
        newCount,
        oldCount,
        internalName: this.internalName,
      });
    },
  },
  methods: {
    isIncreaseUnavailable() {
      return this.max ? this.count >= this.max : false;
    },
    isDecreaseUnavailable() {
      return this.count === 0;
    },
    isDraggable() {
      return this.transferData !== undefined && !this.isIncreaseUnavailable();
    },
    handleIncrease() {
      this.count++;
    },
    handleDecrease() {
      this.count--;
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
