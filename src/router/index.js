import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import ViewUIPlus from 'view-ui-plus'

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  }
})


router.beforeEach((to, from, next) => {
  ViewUIPlus.LoadingBar.start();
  next();
});

router.afterEach(route => {
  ViewUIPlus.LoadingBar.finish();
});

export default router
