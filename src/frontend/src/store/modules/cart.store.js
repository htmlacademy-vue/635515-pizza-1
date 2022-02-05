import misc from "@/static/misc.json";

export default {
  namespaced: true,
  state: {
    misc,
    pizza: [],
    address: { street: "", house: null, apartment: null },
    phone: "",
    ReceiptType: 1,
  },
};
