import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state?/:country/:city?",
      name: "CityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.city ? `${to.params.city}, ${to.params.country}` : to.meta.title
  } | Meteo`;
  next();
});
export default router;
