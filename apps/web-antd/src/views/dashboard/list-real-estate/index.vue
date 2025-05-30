<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Modal } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import CommonTable from '#/components/commons/CommonTable.vue';
import type { TableColumnTypeDynamic } from '#/type/tableType';
import {
  mockProperties,
  mockPropertyTypes,
  mockSellers,
  mockWebsites,
} from '#/mocdata';
import type { IProperty } from '#/type/dataType';

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
  { title: 'Đường', dataIndex: 'street', isEditable: true, inputType: 'input' },
  {
    title: 'Địa chỉ chi tiết',
    dataIndex: 'detailAddress',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Loại BĐS',
    dataIndex: ['type', 'name'],
    isEditable: true,
    inputType: 'select',
    options: mockPropertyTypes.map((type) => ({
      label: type.name,
      value: type.id,
    })),
  },
  {
    title: 'Diện tích (m²)',
    dataIndex: 'acreage',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Chiều dài (m)',
    dataIndex: 'length',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Chiều rộng (m)',
    dataIndex: 'width',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Số tầng',
    dataIndex: 'floors',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Năm xây dựng',
    dataIndex: 'constructionYear',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Diện tích xây dựng (m²)',
    dataIndex: 'constructionMeter',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Giá (VNĐ)',
    dataIndex: 'price',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Giá/m²',
    dataIndex: 'metPrice',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Loại tiền',
    dataIndex: 'typePrice',
    isEditable: true,
    inputType: 'select',
  },
  {
    title: 'Người bán',
    dataIndex: ['seller', 'name'],
    inputType: 'select',
    isEditable: false,
    options: mockSellers.map((seller) => ({
      label: seller.name,
      value: seller.id,
    })),
  },
  {
    title: 'Website',
    dataIndex: ['web', 'name'],
    inputType: 'select',
    options: mockWebsites.map((web) => ({ label: web.name, value: web.id })),
  },
  {
    title: 'Phường/Xã',
    dataIndex: 'ward',
    isEditable: true,
    inputType: 'input',
  },
  { title: 'Thao tác', dataIndex: 'action' },
];

const dataSource = ref<IProperty[]>(mockProperties);

const editableData = reactive<Record<string, IProperty>>({});

const loading = ref(false);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
});

const handleEdit = (record: IProperty) => {
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
      } else if (selectedRowKeys.value.length > 0) {
        dataSource.value = dataSource.value.filter(
          (item) => !selectedRowKeys.value.includes(item.id),
        );
        selectedRowKeys.value = [];
        isDeleteModalVisible.value = false;
      }
    },
  });
};
const handleAdd = (newData: IProperty) => {
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
      @edit="(record: IProperty) => handleEdit(record)"
      @add="(record: IProperty) => handleAdd(record)"
      @delete="handleDelete"
      @change="handleTableChange"
      @select="onSelectChange"
    />
  </div>
</template>
