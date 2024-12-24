import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'ListRealEstate',
        path: '/list-real-estate',
        component: () => import('#/views/dashboard/list-real-estate/index.vue'),
        meta: {
          icon: 'lucide:building',
          title: 'Danh sách bất động sản',
        },
      },
      {
        name: 'PropertyDetails',
        path: '/property-details',
        component: () => import('#/views/dashboard/property-details/index.vue'),
        meta: {
          icon: 'lucide:building',
          title: 'Thông tin chi tiết tài sản',
        },
      },
    ],
  },
];

export default routes;
