import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as bootstrap from "bootstrap";
import axios from "axios";
import "./assets/main.css";

window.bootstrap = bootstrap;
window.axios = axios;

createApp(App).use(router).mount("#app");
