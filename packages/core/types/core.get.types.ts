import { types } from '..';

export interface GetProps<T extends types.general.BaseItem> {
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
