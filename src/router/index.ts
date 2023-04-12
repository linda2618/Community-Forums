import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "../pages/Index/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "/",
        name: "所有文章",
        component: () => import("../pages/forum/articleList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
