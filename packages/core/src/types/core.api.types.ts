import { types } from '..';

export type Action<T> =
  | types.add.AddAction<T>
  | types.remove.RemoveAction<T>
  | types.update.UpdateAction<T>
  | types.move.MoveAction<T>
  | types.reorder.ReorderAction<T>
  | types.reset.ResetAction<T>;

export type reducer = <T extends types.general.BaseItem>(collection: T[], action: Action<T>) => T[];

/**
 * @name Config
 *
 * Additional configuration options that can be passed to the hook during
 * initialisation.
 */
export interface Config<T extends types.general.BaseItem> {
  /**
   * @TODO Add description
   *
   * @default false
   */
  strict?: boolean;

  /**
   * Designates the unique identifier key that is used in the collection.
   *
   * @default 'id'
   */
  identifier?: string;

  /**
   * A handler that catches the error thrown when you are adding an item that
   * already exists in the collection. The returned object from the function is
   * then used instead.
   *
   * Note that if `null` is returned nothing happens.
   *
   * @example: (item) => (({ item }) => ({ ...item, id: `${item}-${new
   * Date().getTime()` });
   *
   * @default undefined
   */
  handleDuplicate?: ((item: T) => T | null) | undefined;

  /**
   * A handler that catches the error thrown when you are trying to
   * update/remove and item that does not exist. The returned id is then used
   * instead.
   *
   * Note that if `null` is returned then nothing happens.
   *
   * @example: (id) => id.replace(/\w+/(?=\-)/i, '')
   *
   * @default undefined
   */
  handleMissing?: ((item: T) => T | null) | undefined;
}
