<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Modal } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import CommonTable from '#/components/commons/CommonTable.vue';
import type { TableColumnTypeDynamic } from '#/type/tableType';

interface DataItem {
  id: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  area: string;
  project: string;
  fullAddress: string;
}

// Thêm state cho selected rows
const selectedRowKeys = ref<string[]>([]);
const isDeleteModalVisible = ref(false);

const onSelectChange = (newSelectedRowKeys: string[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
  console.log('newSelectedRowKeys: ', newSelectedRowKeys);
};
const handleTableChange = (pagination: TablePaginationConfig) => {
  console.log(pagination);
};

const columns: TableColumnTypeDynamic[] = [
  { title: 'Đất nước', dataIndex: 'country', inputType: 'input' },
  { title: 'Tỉnh/Thành', dataIndex: 'province', inputType: 'input' },
  { title: 'Quận/Huyện', dataIndex: 'district', inputType: 'input' },
  { title: 'Phường/Xã', dataIndex: 'ward', inputType: 'input' },
  { title: 'Đường', dataIndex: 'street', inputType: 'input' },
  { title: 'Khu vực', dataIndex: 'area', inputType: 'input' },
  {
    title: 'Dự án',
    dataIndex: 'project',
    inputType: 'input',
  },
  { title: 'Thao tác', dataIndex: 'action' },
];

const dataSource = ref<DataItem[]>([
  {
    id: '1',
    country: 'Việt Nam',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 7',
    ward: 'Phường Tân Phú',
    street: 'Đường Nguyễn Thị Thập',
    area: 'Khu đô thị Phú Mỹ Hưng',
    project: 'Sunrise City',
    fullAddress: '23 Nguyễn Thị Thập, P.Tân Phú, Q.7, TP.HCM',
  },
  {
    id: '2',
    country: 'Việt Nam',
    province: 'Hà Nội',
    district: 'Nam Từ Liêm',
    ward: 'Phường Mễ Trì',
    street: 'Đường Đỗ Đức Dục',
    area: 'Khu đô thị Mỹ Đình',
    project: 'Vinhomes Smart City',
    fullAddress: '458 Đỗ Đức Dục, P.Mễ Trì, Q.Nam Từ Liêm, Hà Nội',
  },
  {
    id: '3',
    country: 'Việt Nam',
    province: 'Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    ward: 'Phường Mỹ An',
    street: 'Đường Võ Nguyên Giáp',
    area: 'Khu du lịch biển',
    project: 'Aria Đà Nẵng',
    fullAddress: '168 Võ Nguyên Giáp, P.Mỹ An, Q.Ngũ Hành Sơn, Đà Nẵng',
  },
]);

const editableData = reactive<Record<string, DataItem>>({});

const loading = ref(false);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
});

const handleEdit = (record: DataItem) => {
  editableData[record.id] = { ...record };
  const index = dataSource.value.findIndex((item) => item.id === record.id);
  if (index !== -1) {
    // Tạo bản sao của dataSource
    const newDataSource = [...dataSource.value];
    // Cập nhật bản ghi đã sửa
    newDataSource[index] = { ...record };
    // Gán lại cho dataSource
    dataSource.value = newDataSource;
  }
};


const handleDelete = (ids: string[]) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa?',
    onOk: () => {
      if (ids.length > 0) {
        dataSource.value = dataSource.value.filter(
          (item) => !ids.includes(item.id),
        );
        ids = [];
      }
      else if (selectedRowKeys.value.length > 0) {
        dataSource.value = dataSource.value.filter(
          (item) => !selectedRowKeys.value.includes(item.id),
        );
        selectedRowKeys.value = [];
        isDeleteModalVisible.value = false;
      }
    },
  });
};
const handleAdd = (newData: DataItem) => {
  try {
    loading.value = true;
    // Sau này sẽ gọi API tại đây
    // const response = await apiService.addRealEstate(newData);

    // Tạm thời xử lý với local data
    const finalRow = {
      ...newData,
      id: (dataSource.value.length + 1).toString(),
    };
    dataSource.value = [
      ...dataSource.value.filter((item) => !item.id.startsWith('new-')),
      finalRow,
    ];

    Modal.success({
      title: 'Thành công',
      content: 'Đã thêm mới thành công',
    });
  } catch (error) {
    console.error('Lỗi khi thêm mới:', error);
    Modal.error({
      title: 'Lỗi',
      content: 'Có lỗi xảy ra khi thêm mới dữ liệu',
    });
  } finally {
    loading.value = false;
  }
};
</script>



<template>
  <div class="new-page">
    <CommonTable
      :title="'Danh sách Bất động sản'"
      :columns="columns as TableColumnTypeDynamic[]"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      v-model:selected-row-keys="selectedRowKeys"
      @edit="(record: DataItem) => handleEdit(record)"
      @add="(record: DataItem) => handleAdd(record)"
      @delete="handleDelete"
      @change="handleTableChange"
      @select="onSelectChange"
    />
  </div>


</template>

