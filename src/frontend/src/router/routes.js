export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    meta: { layout: "AppLayoutCabinet" },
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "AppLayoutCabinet" },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];
