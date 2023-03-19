import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//导入全局样式表
import "./assets/global.less";
//导入字体图标
import "./assets/icon/iconfont.css";

createApp(App).use(router).use(ElementPlus).mount("#app");
