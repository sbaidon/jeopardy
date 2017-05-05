import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import RegisterContainer from '@/components/containers/RegisterContainer';
import GameContainer from '@/components/containers/GameContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Hello,
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
