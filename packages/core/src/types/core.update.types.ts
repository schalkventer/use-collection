import { types } from '..';

export interface UpdateProps<T> {
  values: Partial<T> | ((item: T) => Partial<T>);
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

export interface UpdateAction<T extends types.general.BaseItem> {
  type: 'update';
  payload: UpdateProps<T>;
}
