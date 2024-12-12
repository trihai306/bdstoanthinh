import type { Router } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * Cấu hình bảo vệ chung
 * @param router
 */
function setupCommonGuard(router: Router) {
  // Ghi lại các trang đã tải
  const loadedPaths = new Set<string>();

  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Thanh tiến trình tải trang
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Ghi lại trang đã tải, nếu đã tải, các hiệu ứng chuyển trang sau đó sẽ không lặp lại

    loadedPaths.add(to.path);

    // Đóng thanh tiến trình tải trang
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * Cấu hình bảo vệ truy cập
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // Các tuyến cơ bản, các tuyến này không cần kiểm tra quyền truy cập
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) || DEFAULT_HOME_PATH,
        );
      }
      return true;
    }

    // Kiểm tra accessToken
    if (!accessStore.accessToken) {
      // Rõ ràng tuyên bố bỏ qua quyền truy cập, thì có thể truy cập
      if (to.meta.ignoreAccess) {
        return true;
      }

      // Không có quyền truy cập, chuyển đến trang đăng nhập
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // Nếu không cần, xóa trực tiếp query
          query: { redirect: encodeURIComponent(to.fullPath) },
          // Mang theo trang hiện tại, sau khi đăng nhập sẽ chuyển lại trang này
          replace: true,
        };
      }
      return to;
    }

    // Đã tạo tuyến động chưa
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Tạo bảng tuyến
    // Danh sách các vai trò của người dùng hiện tại
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    const userRoles = userInfo.roles ?? [];

    // Tạo menu và tuyến
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // Sẽ hiển thị trong menu, nhưng truy cập sẽ bị chuyển hướng đến 403
      routes: accessRoutes,
    });

    // Lưu thông tin menu và tuyến
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ?? to.fullPath) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Cấu hình bảo vệ dự án
 * @param router
 */
function createRouterGuard(router: Router) {
  /** Chung */
  setupCommonGuard(router);
  /** Truy cập quyền */
  setupAccessGuard(router);
}

export { createRouterGuard };
