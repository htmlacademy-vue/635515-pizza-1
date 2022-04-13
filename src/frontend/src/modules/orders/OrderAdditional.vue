<template>
  <li>
    <img :src="misc.image" width="20" height="30" :alt="misc.name" />
    <p>
      <span>{{ misc.name }}</span>
      <b v-if="misc.count === 1">{{ misc.price }} ₽</b>
      <b v-else>{{ misc.count }}x{{ misc.price }} ₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderAdditional",
  props: {
    misc: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
