<template>
  <ProfileFormAddress
    v-if="editMode"
    :address="address"
    @save="saveHandler"
    @removeAddress="removeHandler"
  />
  <div v-else class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editMode = true">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import ProfileFormAddress from "@/modules/profile/ProfileFormAddress";

export default {
  name: "ProfileAddress",
  components: { ProfileFormAddress },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    editMode: false,
  }),
  methods: {
    saveHandler(editedAddress) {
      this.editMode = false;
      this.$emit("saveAddress", editedAddress);
    },
    removeHandler(editedAddress) {
      this.editMode = false;
      this.$emit("removeAddress", editedAddress);
    },
  },
};
</script>

<style></style>
