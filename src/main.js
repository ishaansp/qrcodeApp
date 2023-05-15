import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import UUID from "vue3-uuid";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(router).use(pinia).use(UUID).mount("#app");
