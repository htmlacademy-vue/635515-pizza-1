import Vue from "vue";
import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
