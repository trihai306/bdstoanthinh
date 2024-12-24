<template>
  <div class="bg-white p-[24px]">
    <div class="flex items-center justify-between">
      <h1 class="mb-[24px] text-[24px] font-bold">{{ title }}</h1>
      <div class="flex gap-2">
        <Button type="primary" @click="handleAdd">Thêm mới</Button>
        <Button type="primary" :disabled="!selectedRowKeys.length" @click="handleDelete(selectedRowKeys)"
          >Xoá ({{ selectedRowKeys.length }}) mục đã chọn</Button
        >
      </div>
    </div>
    <Table
      :columns="columns"
      :data-source="dataSource"
      :loading="props.loading"
      :pagination="props.pagination"
      :row-selection="rowSelection"
      row-key="id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="editableData[record.id]">
          <!-- Input thường -->
          <Input
            v-if="column.inputType === 'input'" 
            v-model:value="editableData[record?.id as string][column.dataIndex as string]"
            :placeholder="column.placeholder || `Nhập ${column.title}`"
          />
          <!-- Select -->
          <Select
            v-else-if="column.inputType === 'select'"
            v-model:value="editableData[record.id as string][column.dataIndex as string]"
            :placeholder="column.placeholder || `Chọn ${column.title}`"
            :options="column.options"
            style="width: 100%"
          />
          <!-- Cột action khi đang edit -->
          <template v-else-if="column.dataIndex === 'action'">
            <div class="action-buttons">
              <a-button type="primary" size="small" @click="save(record.id)">
                <!-- <VbenIcon :icon="'save" class="size-5" /> -->
                Lưu
              </a-button>
              <a-button size="small" @click="cancel(record.id)">
                <!-- <VbenIcon :icon="'close'" class="size-5" /> -->
                Hủy
              </a-button>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-if="column.dataIndex === 'action'">
            <div class="action-buttons">
              <a-button size="small" @click="handleEdit(record as DataItem)" class="flex-center">
                <VbenIcon :icon="SvgEditIcon" class="size-5" />
              </a-button>
              <a-button size="small" @click="handleDelete([record.id])">
                <VbenIcon :icon="SvgDeleteIcon" class="size-5" />
              </a-button>
            </div>
          </template>
          <template v-else>
            {{ record[column.dataIndex as string] }}
          </template>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import {
  type TablePaginationConfig,
  Table,
  Button,
  Select,
  Input,
  Modal,
} from 'ant-design-vue';
import { SvgEditIcon, SvgDeleteIcon } from '@vben/icons';
import { ref, reactive, type UnwrapRef } from 'vue';
import { VbenIcon } from '../../../../../packages/@core/ui-kit/shadcn-ui/src/components';
import type { TableColumnTypeDynamic } from '#/type/tableType';

interface DataItem {
  id: string;
  [id: string]: any;
}

// Thêm editableData để quản lý trạng thái edit
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const selectedRowKeys = ref<string[]>([]);

interface Props {
  title: string;
  columns: TableColumnTypeDynamic[];
  dataSource: any[];
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
}

interface Emits {
  (e: 'edit', record: DataItem): void;
  (e: 'delete', ids: string[]): void;
  (e: 'add', record: DataItem): void;
  (e: 'select', ids: string[]): void;
  (e: 'change', pagination: TablePaginationConfig): void;
  (e: 'update:dataSource', dataSource: DataItem[]): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: () => ({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number) => `Tổng ${total} bản ghi`,
  }),
});



const emit = defineEmits<Emits>();

const handleEdit = (record: DataItem) => {
  // Kiểm tra nếu đang có bản ghi khác đang edit
  if (Object.keys(editableData).length > 0) {
    Modal.warning({
      title: 'Cảnh báo',
      content: 'Vui lòng hoàn thành chỉnh sửa hiện tại trước khi sửa mục khác'
    });
    return;
  }
  // Tạo bản sao của record để edit
  editableData[record.id] = { ...record };
};

const handleDelete = (record: string[]) => {
  emit('delete', record);
};

const handleAdd = () => {
  const newid = `new-edit-row`;
  const newRow: DataItem = {
    id: newid,
  };
  // Khởi tạo giá trị rỗng cho các trường
  props?.columns?.forEach((column) => {
    if (column.dataIndex && typeof column.dataIndex === 'string') {
      newRow[column.dataIndex as string] = '';
    }
  });

  // Thêm vào đầu dataSource
  props.dataSource.unshift(newRow);
  
  // Đưa hàng vào trạng thái edit
  editableData[newid] = { ...newRow };
};

const rowSelection = ref({
  checkStrictly: false,
  onChange: (keys: (string | number)[]) => {
    selectedRowKeys.value = keys as string[];
    emit('select', keys as string[]);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});

const handleTableChange = (pagination: TablePaginationConfig) => {
  emit('change', pagination);
};

const save = (id: string) => {
  try {
    const editedRow = editableData[id];
    if (!editedRow) return;
    // Emit event với data đã edit
    if (id.startsWith('new-edit-row')) {
      emit('add', editedRow);
    } else {
      emit('edit', editedRow);
    }
    // Xóa khỏi editableData
    delete editableData[id];
  } catch (error) {
    console.error('Lỗi khi lưu:', error);
  }
};

const cancel = (id: string) => {
  // Nếu là hàng mới thêm, xóa khỏi dataSource
  if (id.startsWith('new-')) {
    const index = props.dataSource.findIndex(item => item.id === id);
    if (index !== -1) {
      props.dataSource.splice(index, 1);
    }
  }
  // Xóa khỏi editableData để hủy trạng thái edit
  delete editableData[id];
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
}

.editable-cell {
  position: relative;
}

.editable-row:hover .editable-cell-value-wrap {
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}
</style>
