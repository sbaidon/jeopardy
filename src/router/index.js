import Vue from 'vue';
import Router from 'vue-router';
import RegisterContainer from '@/components/containers/RegisterContainer';
import GameContainer from '@/components/containers/GameContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterContainer,
    },
    {
      path: '/play',
      name: 'play',
      component: GameContainer,
    },
  ],
});
