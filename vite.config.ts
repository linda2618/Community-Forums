import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080, //设置服务器启动端口号
    proxy: {
      "/api": {
        target: "http://localhost:7070/api",
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
