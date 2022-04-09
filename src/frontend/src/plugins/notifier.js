import notificationTypes from "@/common/enums/notificationTypes";

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.ERROR,
    });
  }
}
