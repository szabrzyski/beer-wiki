import { createRouter, createWebHistory } from 'vue-router';
import Index from '../components/Index.vue';
import BeerDetails from '../components/BeerDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      props: route => ({ page: route.query.page, beerName: route.query.name, ibuFilterType: route.query.filter, ibuFilterValue: route.query.ibu })
    },
    {
      path: '/beers/:beer',
      name: 'beerDetails',
      component: BeerDetails,
      props: true
    },
  ]
})

export default router
