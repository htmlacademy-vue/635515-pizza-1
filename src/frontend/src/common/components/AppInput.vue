<template>
  <div>
    <label class="input">
      <span v-if="isRequired">{{ name }}*</span>
      <span v-else>{{ name }}</span>
      <input
        ref="input"
        :type="type"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :required="isRequired"
        @input="$emit('input', $event.target.value)"
      />
      <span v-if="isShowError" class="sign-form__text--error">
        {{ errorText }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShowError() {
      return this.errorText !== "";
    },
  },
};
</script>

<style></style>
