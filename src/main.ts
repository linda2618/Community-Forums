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

//定义成全局组件
import Dialog from "./components/Dialog.vue";
//定义全局方法
import Verity from "./utils/verify";
import Message from "./utils/message";
import Request from "./utils/axios/http";

const app = createApp(App);
app.config.globalProperties.verify = Verity;
app.config.globalProperties.message = Message;
app.config.globalProperties.request = Request;
app.component("Dialog", Dialog);
app.use(router).use(ElementPlus).mount("#app");
