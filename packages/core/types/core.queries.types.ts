import { types } from '..';

/**
 * @name query
 *
 * A find and return the index of a specific item in the collection. The query
 * can take one of three possible forms:
 *
 * - A `number` to get an item at a specific index in the collection.
 *
 * - An `object` to get an item/items that match the provided key-value
 *   combinations (is usually used to get an item via the identifier key-value).
 *
 * - A callback function to get an item/items that meet a custom condition.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type query<O extends types.general.BaseItem> = number | Partial<O> | ((item: O) => boolean);

/**
 * @name destinationQuery
 *
 * A specific query that is used when inserting or moving items around in a
 * collection.
 */
export type destinationQuery<T extends types.general.BaseItem> =
  | number
  | 'start'
  | 'end'
  | { before: query<T> }
  | { after: query<T> };
