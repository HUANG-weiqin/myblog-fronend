import { createRouter, createWebHashHistory } from "vue-router";

import Index from "~/Pages/Index.vue"
import NotFound from "~/Pages/404.vue"
import Login from "~/Pages/login.vue"
import edit from "~/Pages/add.vue"
import HomeLogin from "~/Pages/HomeLogin.vue"

let routes = [
    { path: "/", component: Index},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: "/login", component: Login},
    { path: "/edit", component: edit},
    { path: "/userhome", component: HomeLogin},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router