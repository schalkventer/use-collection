import { types } from '..';

export interface ResetProps<T extends types.general.BaseItem> {
  /**
   * @default []
   */
  values?: T[];
}

export interface ResetAction<T extends types.general.BaseItem> {
  type: 'reset';
  payload: ResetProps<T>;
}
