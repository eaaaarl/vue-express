import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth.store";

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
    meta: {
      title: "Dashbaord",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );

  let isAuthenticated = authStore.isAuthenticated;

  if (!isAuthenticated) {
    isAuthenticated = authStore.checkAuth();
  }

  if (isProtectedRoute && !isAuthenticated) {
    return next({ name: "Login" });
  }

  if (isAuthenticated && to.name === "Login") {
    return next({ name: "Dashboard" });
  }

  next();
});
export default router;
