<template>
  <div class="new-page">
    <a-common-table
      :title="'Danh sách Bất động sản'"
      :columns="columns as TableColumnTypeDynamic[]"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      v-model:selected-row-ids="selectedRowids"
      @edit="(record: DataItem) => handleEdit(record)"
      @add="(record: DataItem) => handleAdd(record)"
      @delete="handleDelete"
      @change="handleTableChange"
      @update:selected-row-ids="onSelectChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Modal } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import CommonTable from '#/components/commons/CommonTable.vue';
import type { TableColumnTypeDynamic } from '#/type/tableType';

const ACommonTable = CommonTable;

interface DataItem {
  id: string;
  typeRealEstate: string;
  acreage: string;
  long: string;
  width: string;
  floors: string;
  metersBuilt: string;
  yearBuilt: string;
}

// Thêm state cho selected rows
const selectedRowids = ref<string[]>([]);
const isDeleteModalVisible = ref(false);
const onSelectChange = (ids: string[]) => {
  selectedRowids.value = ids;
};

const handleTableChange = (pagination: TablePaginationConfig) => {
  console.log(pagination);
};

const columns: TableColumnTypeDynamic[] = [
  { title: 'Loại BĐS', dataIndex: 'typeRealEstate', inputType: 'input' },
  { title: 'Diện tích', dataIndex: 'acreage', inputType: 'input' },
  { title: 'Dài', dataIndex: 'long', inputType: 'input' },
  { title: 'Rộng', dataIndex: 'width', inputType: 'input' },
  { title: 'Số tầng', dataIndex: 'floors', inputType: 'input' },
  { title: 'Số m xây dựng', dataIndex: 'metersBuilt', inputType: 'input' },
  { title: 'Năm xây dựng', dataIndex: 'yearBuilt', inputType: 'input' },
  { title: 'Thao tác', dataIndex: 'action' },
];

const dataSource = ref<DataItem[]>([
  {
    id: '1',
    typeRealEstate: 'Chung cư TTP',
    acreage: '100',
    long: '100',
    width: '100',
    floors: '100',
    metersBuilt: '100',
    yearBuilt: '2022',
  },
  {
    id: '2',
    typeRealEstate: 'Nhà Lầu',
    acreage: '100',
    long: '100',
    width: '100',
    floors: '100',
    metersBuilt: '100',
    yearBuilt: '2021',
  },
  {
    id: '3',
    typeRealEstate: 'Đất thổ cư',
    acreage: '100',
    long: '100',
    width: '100',
    floors: '100',
    metersBuilt: '100',
    yearBuilt: '2024',
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
      } else if (selectedRowids.value.length > 0) {
        dataSource.value = dataSource.value.filter(
          (item) => !selectedRowids.value.includes(item.id),
        );
        selectedRowids.value = [];
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

<style scoped>
.container {
  padding: 24px;
}
</style>
