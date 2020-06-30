import { types } from '..';

export interface MoveProps<T> {
  from: types.queries.query<T>;
  to: types.queries.destinationQuery<T>;

  /**
   * @default false;
   */
  strict?: boolean;
}

export interface MoveAction<T extends types.general.BaseItem> {
  type: 'move';
  payload: MoveProps<T>;
}
