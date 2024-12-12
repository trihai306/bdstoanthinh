import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@vben/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';

/**
 *  @zh_CN Tạo đối tượng vue-router
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // Các tuyến đường ban đầu cần được thêm vào danh sách tuyến đường.
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // Có nên cấm dấu gạch chéo cuối cùng không.
  strict: true,
});

const resetRoutes = () => resetStaticRoutes(router, routes);

// Tạo các bảo vệ định tuyến
createRouterGuard(router);

export { resetRoutes, router };
