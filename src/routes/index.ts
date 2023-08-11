import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './MainPage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: MainPage,
      children: [
        {
          name: 'Search',
          path: '/search',
          component: MainPage,
          props: (route) => ({
            query: route.query.q,
            movieId: route.query.movie,
          }),
        },
      ],
    },
  ],
});
