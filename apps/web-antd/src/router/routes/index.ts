import type { RouteRecordRaw } from 'vue-router';

import { mergeRouteModules, traverseTreeValues } from '@vben/utils';

import { coreRoutes, fallbackNotFoundRoute } from './core';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

// Nếu cần, có thể mở chú thích và tạo thư mục
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true });
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/** Định tuyến động */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** Danh sách định tuyến bên ngoài, những trang này có thể không cần Layout, có thể được nhúng vào hệ thống khác (không hiển thị trong menu) */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles);
// const staticRoutes: RouteRecordRaw[] = mergeRouteModules(staticRouteFiles);
const staticRoutes: RouteRecordRaw[] = [];
const externalRoutes: RouteRecordRaw[] = [];

/** Danh sách các định tuyến, bao gồm các định tuyến cơ bản, định tuyến bên ngoài và định tuyến 404 dự phòng
 *  Không cần kiểm tra quyền (sẽ luôn hiển thị trong menu) */
const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...externalRoutes,
  fallbackNotFoundRoute,
];

/** Danh sách các định tuyến cơ bản, những định tuyến này không cần vào kiểm tra quyền */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

/** Danh sách các định tuyến có kiểm tra quyền, bao gồm các định tuyến động và tĩnh */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];
export { accessRoutes, coreRouteNames, routes };
