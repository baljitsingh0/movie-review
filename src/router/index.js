import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MovieReview from '../views/MovieReview.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/review/:slug', name: 'MovieReview', component: MovieReview },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
