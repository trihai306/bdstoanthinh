<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Modal } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import CommonTable from '#/components/commons/CommonTable.vue';
import type { TableColumnTypeDynamic } from '#/type/tableType';
import { mockSellers } from '#/mocdata';
import type { ISeller } from '#/type/dataType';
import { useRouter } from 'vue-router';

// Thêm state cho selected rows
const selectedRowKeys = ref<string[]>([]);
const isDeleteModalVisible = ref(false);
const router = useRouter();
const onSelectChange = (newSelectedRowKeys: string[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
  console.log('newSelectedRowKeys: ', newSelectedRowKeys);
};
const handleTableChange = (pagination: TablePaginationConfig) => {
  console.log(pagination);
};

const handleSellerClick = (id: string) => {
  router.push(`/workspace?sellerId=${id}`);
};

const columns: TableColumnTypeDynamic[] = [
  {
    title: 'Tên người bán',
    dataIndex: 'name',
    isEditable: true,
    inputType: 'input',
    customCell: (record) => {
      return {
        onClick: () => handleSellerClick(record.id),
        style: 'cursor: pointer; color: #006be6;',
      };
    },
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    isEditable: true,
    inputType: 'input',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    isEditable: true,
    inputType: 'input',
  },
  { title: 'Thao tác', dataIndex: 'action' },
];

const dataSource = ref<ISeller[]>(mockSellers);

const editableData = reactive<Record<string, ISeller>>({});

const loading = ref(false);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
});

const handleEdit = (record: ISeller) => {
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
const handleAdd = (newData: ISeller) => {
  try {
    loading.value = true;
    // Sau này sẽ gọi API tại đây
    // const response = await apiService.addRealEstate(newData);

    // Tạm thời xử lý với local data
    const finalRow = {
      ...newData,
      id: (dataSource.value.length + 1).toString(),
    };
    // Ensure finalRow conforms to the expected type before adding it to dataSource
    const formattedFinalRow = {
      ...finalRow,
    };
    dataSource.value = [
      ...dataSource.value.filter((item) => !item.id.startsWith('new-')),
      formattedFinalRow,
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
      :title="'Danh sách người bán'"
      :columns="columns as TableColumnTypeDynamic[]"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      v-model:selected-row-keys="selectedRowKeys"
      @edit="(record: ISeller) => handleEdit(record)"
      @add="(record: ISeller) => handleAdd(record)"
      @delete="handleDelete"
      @change="handleTableChange"
      @select="onSelectChange"
    />
  </div>
</template>
