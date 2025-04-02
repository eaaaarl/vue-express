import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth.store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/auth/LoginView.vue"),
  },
  {
    path: "/",
    component: () => import("./layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("./views/dashboard/DashboardView.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "post",
        name: "Post",
        component: () => import("./views/post/PostView.vue"),
        meta: { title: "Post" },
      },
    ],
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

  // Ensure auth state is verified on protected routes
  if (isProtectedRoute && !authStore.isAuthenticated) {
    const isAuthVerified = await authStore.verifyAuth();

    if (!isAuthVerified) {
      return next({ name: "Login" });
    }
  }

  console.log("isAuthenticated:", authStore.isAuthenticated);

  // Prevent logged-in users from accessing the login page
  if (authStore.isAuthenticated && to.name === "Login") {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
