import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../components/IndexPage.vue";
import BeerDetails from "../components/BeerDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexPage,
      props: (route) => ({
        page: route.query.page,
        beerName: route.query.name,
        ibuFilterType: route.query.filter,
        ibuFilterValue: route.query.ibu,
      }),
    },
    {
      path: "/beers/:beerId",
      name: "beerDetails",
      component: BeerDetails,
      props: true,
    },
  ],
});

export default router;
