<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <Counter
        counterName="cart-list"
        :value="item.count"
        :isOrange="true"
        @change="changeCount"
      />

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import Counter from "@/common/components/Counter.vue";
export default {
  name: "CartAdditional",
  components: { Counter },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeCount({ newCount }) {
      this.$emit("changeCount", {
        newCount,
        id: this.item.id,
      });
    },
  },
};
</script>

<style></style>
