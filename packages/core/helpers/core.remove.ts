import { types } from '..';
import { get, generalHelpers } from '.';

/**
 * @name remove
 *
 * Removes a specific amount of items from the collection that meet the passed
 * query (amount of items removed is dependant on the number passed to `amount`)
 */
export const remove = <T extends types.general.BaseItem>(props: {
  collection: T[];
  strict?: boolean;
  amount?: number;
  query: types.queries.query<T>;
}): T[] => {
  const { collection, strict = false, query, amount = 1 } = props;
  const results: { index: number; item: T }[] = get<T>({ collection, strict, amount, query });
  const indices = results.map(({ index }) => index);
  return generalHelpers.removeFromArray<T>({ array: collection, index: indices, strict });
};

export default remove;
