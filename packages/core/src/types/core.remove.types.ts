import { types } from '..';

export interface RemoveProps<T> {
  query: types.queries.query<T>;

  /**
   * @default 1
   */
  amount?: number;

  /**
   * @default false;
   */
  strict?: boolean;
}

export interface RemoveAction<T extends types.general.BaseItem> {
  type: 'remove';
  payload: RemoveProps<T>;
}
