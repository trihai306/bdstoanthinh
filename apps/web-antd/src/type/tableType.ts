import type { TableColumnType } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table';

export type InputTypeOptions = 'input' | 'select' | 'date' | 'textarea' | 'number' | 'switch';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: SelectOption[];
}

// Extend từ TableColumnType và thêm các properties mới
export interface TableColumnTypeDynamic<T = any> extends TableColumnType<T> , ColumnType<T> {
  inputType?: InputTypeOptions;
  options?: SelectOption[];
  required?: boolean;
  placeholder?: string;
  rules?: any[]; // Validation rules
  hidden?: boolean; // Ẩn trường trong form
  dependencies?: string[]; 
}
