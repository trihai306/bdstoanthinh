import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences } from './preferences';

/**
 * Sau khi ứng dụng được khởi tạo hoàn tất, tiến hành tải và render trang
 */
async function initApplication() {
  // name được sử dụng để chỉ định định danh duy nhất của dự án
  // Được sử dụng để phân biệt các cài đặt ưu tiên khác nhau của dự án và các tiền tố key lưu trữ dữ liệu cũng như một số dữ liệu cần được cách ly khác
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // Khởi tạo cài đặt ưu tiên của ứng dụng
  await initPreferences({
    namespace,
    overrides: overridesPreferences,
  });

  // Khởi động và gắn kết ứng dụng
  // Logic chính và giao diện của ứng dụng vue
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // Gỡ bỏ và hủy loading
  unmountGlobalLoading();
}

initApplication();
