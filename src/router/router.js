import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import About from './views/AboutView.vue';
import Contact from './views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'about',
          component: About,
        },
        {
          path: 'contact',
          component: Contact,
        },
      ],
    },
  ],
});

export default router;