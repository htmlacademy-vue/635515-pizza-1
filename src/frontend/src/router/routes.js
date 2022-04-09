import { HOME, LOGIN, CART, ORDERS, PROFILE } from "@/router/route-names";

export default [
  {
    path: "/",
    name: HOME,
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/login",
        name: LOGIN,
        component: () => import("../views/Login.vue"),
        meta: { layout: "AppLayoutDefault" },
      },
    ],
  },
  {
    path: "/cart",
    name: CART,
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/orders",
    name: ORDERS,
    meta: { layout: "AppLayoutCabinet" },
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/profile",
    name: PROFILE,
    meta: { layout: "AppLayoutCabinet" },
    component: () => import("../views/Profile.vue"),
  },
];
