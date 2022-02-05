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

    <Counter
      :counterName="nameOfTheSelectable"
      :max="max"
      :value="value"
      @change="changeValue"
    />
  </li>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
import DropEffects from "./../enums/dropEffects";
import Counter from "@/common/components/Counter.vue";

export default {
  name: "ItemCounter",
  components: { Counter },
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
  computed: {
    isDraggable() {
      return this.transferData !== undefined && !this.isIncreaseUnavailable;
    },
  },
  methods: {
    changeValue({ newCount, oldCount }) {
      this.$emit("change", {
        newCount,
        oldCount,
        internalName: this.internalName,
      });
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
