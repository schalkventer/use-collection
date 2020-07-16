import { types } from '..';

export interface AddProps<T> {
  values: T;
  destination: types.queries.destinationQuery<T>;

  /**
   * @default false;
   */
  strict?: boolean;
}

export interface AddAction<T extends types.general.BaseItem> {
  type: 'add';
  payload: AddProps<T>;
}
