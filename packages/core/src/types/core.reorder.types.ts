import { types } from '..';

export interface ReorderProps<T> {
  key: string;

  /**
   * @default 'ascending'
   */
  direction: 'ascending' | 'descending';

  /**
   * @default false;
   */
  strict?: boolean;
}

export interface ReorderAction<T extends types.general.BaseItem> {
  type: 'reorder';
  payload: ReorderProps<T>;
}
