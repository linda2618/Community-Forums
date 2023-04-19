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
      {
        path: "/forum/:pBoardId",
        name: "一级板块",
        component: () => import("../pages/forum/articleList.vue"),
      },
      {
        path: "/forum/:pBoardId/:boardId",
        name: "二级板块",
        component: () => import("../pages/forum/articleList.vue"),
      },
      {
        path: "/post/:articleId",
        name: "文章详情",
        component: () => import("../pages/forum/articleDetail.vue"),
      },
      {
        path: "/user/:userId",
        name: "用户信息",
        component: () => import("../pages/userCenter/UCenter.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
