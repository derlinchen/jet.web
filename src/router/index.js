import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import ViewUIPlus from 'view-ui-plus'
import { getUserInfoFromLocalstorage, getMenuListFromLocalstorage } from '@/libs/util'

const LOGIN_PAGE_NAME = 'login'

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  }
})


router.beforeEach((to, from, next) => {
  ViewUIPlus.LoadingBar.start();
  const token = getUserInfoFromLocalstorage().token
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else {
    next();
  }

});

router.afterEach(route => {
  ViewUIPlus.LoadingBar.finish();
});

export default router
