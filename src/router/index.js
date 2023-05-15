import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Planner",
    name: "Planner",
    component: () => import("../views/PlannerView.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Emp",
    name: "Emp",
    component: () => import("../views/EmpView.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/testStation",
    name: "TestStation",
    component: () => import("../views/TestStationView.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let isLoggedIn = localStorage.getItem("user") ? true : false;
    if (isLoggedIn) {
      let role = localStorage.getItem("role");
      if (["/Admin", "/admin"].includes(to.fullPath)) {
        if (role === "Admin") {
          next();
        } else {
          next("/");
        }
      } else if (["/Planner", "/planner"].includes(to.fullPath)) {
        if (role === "Planner") {
          next();
        } else {
          next("/");
        }
      } else if (["/Emp", "/emp"].includes(to.fullPath)) {
        if (role === "Emp") {
          next();
        } else {
          next("/");
        }
      } else if (["/testStation", "/TestStation"].includes(to.fullPath)) {
        if (role === "testStation") {
          next();
        } else {
          next("/");
        }
      }
    } else {
      alert("you don't have access!");
      next("/");
    }
  } else {
    let isLoggedIn = localStorage.getItem("user") ? true : false;
    if (isLoggedIn) {
      let role = localStorage.getItem("role");
      if (["/"].includes(to.fullPath)) {
        if (role) {
          next(`/${role}`);
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
export default router;
