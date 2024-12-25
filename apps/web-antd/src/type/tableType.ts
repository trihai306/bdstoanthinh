import type { ColumnType } from 'ant-design-vue/es/table';
import type { ColumnType as RcColumnType } from 'ant-design-vue/es/vc-table/interface';

export type InputTypeOptions =
  | 'input'
  | 'select'
  | 'date'
  | 'textarea'
  | 'number'
  | 'switch';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: SelectOption[];
}

// Extend từ TableColumnType và thêm các properties mới
type TableDynamic = {
  inputType?: InputTypeOptions;
  options?: SelectOption[];
  required?: boolean;
  placeholder?: string;
  rules?: any[]; // Validation rules
  hidden?: boolean; // Ẩn trường trong form
  dependencies?: string[];
  isEditable?: boolean;
  render?: (opt: { text: any; record: any }) => any;
};

// Thêm DefaultRecordType để có thể sử dụng render
export type TableColumnTypeDynamic<RecordType = any> =
  RcColumnType<RecordType> & ColumnType<RecordType> & TableDynamic;
