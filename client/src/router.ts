import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/auth/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("./views/dashboard/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
