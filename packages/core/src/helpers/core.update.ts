import { types } from '..';
import { get } from '.';

/**
 * @name update
 *
 * Modifies only the specified key-value pairs present in the `values` prop -
 * everything else remains as is.
 */
export const update = <T extends types.general.BaseItem>(props: {
  collection: T[];
  strict?: boolean;
  amount?: number;
  query: types.queries.query<T>;
  values: Partial<T>;
}): T[] => {
  const { collection, strict = false, query, amount = 1, values } = props;

  const matches: { index: number; item: T }[] = get<T>({ collection, strict, amount, query });
  const clonedCollection = Array.from(collection);

  matches.forEach(({ index, item }) => {
    clonedCollection[index] = {
      ...item,
      ...values,
    };
  });

  return clonedCollection;
};

export default update;
