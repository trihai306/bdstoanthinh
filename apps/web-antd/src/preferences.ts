import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description Tệp cấu hình dự án
 * Chỉ cần ghi đè một phần cấu hình trong dự án, các cấu hình không cần thiết không cần ghi đè, sẽ tự động sử dụng cấu hình mặc định.
 * !!! Sau khi thay đổi cấu hình, vui lòng xóa bộ nhớ cache, nếu không thay đổi có thể không có hiệu lực.
 */
export const overridesPreferences = defineOverridesPreferences({
  // Ghi đè
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    locale: import.meta.env.VITE_APP_LOCALE,
  },
});
