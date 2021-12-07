<template>
  <div>
    <label v-for="field in fields" :key="field.internalName" class="input">
      <span class="visually-hidden">{{ field.displayName }}</span>
      <input
        :required="field.required"
        type="text"
        :name="field.internalName"
        :value="field.value"
        @keyup="onChange"
        @change="onChange"
        :placeholder="`Введите ${field.displayName.toLowerCase()}`"
      />
    </label>
  </div>
</template>

<script>
import { hiddenError } from "@/common/helpers";

export default {
  name: "BuilderPizzaFields",
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChange(ev) {
      const { name, value } = ev.target;
      const targetFields = this.fields.filter(
        (field) => field.internalName === name
      );
      if (targetFields.length == 0) {
        hiddenError(`We can't find fields by name "${name}" in the props`);
        return;
      }

      const targetField = targetFields[0];
      this.$emit("onChange", {
        internalName: name,
        newValue: value,
        oldValue: targetField.value,
      });
    },
  },
};
</script>

<style></style>
