import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antd';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '#/locales';

import { initComponentAdapter } from './adapter/component';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // Khởi tạo bộ điều hợp thành phần
  await initComponentAdapter();

  const app = createApp(App);

  // Cấu hình quốc tế hóa i18n
  await setupI18n(app);

  // Cấu hình pinia-store
  await initStores(app, { namespace });

  // Cài đặt chỉ thị quyền truy cập
  registerAccessDirective(app);

  // Cấu hình định tuyến và bảo vệ định tuyến
  app.use(router);

  // Cập nhật tiêu đề động
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
