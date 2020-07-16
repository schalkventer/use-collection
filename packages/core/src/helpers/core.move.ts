import { types } from '..';
import { get, convertDestination } from '.';

/**
 * @name move
 *
 * @description Moves an item from a specific location (determined by a query)
 * to a new position in the collection (determined by a destinationQuery)
 */
export const move = <T extends types.general.BaseItem>(props: {
  collection: T[];
  from: types.queries.query<T>;
  to: types.queries.destinationQuery<T>;

  /**
   * @default false
   */
  strict?: boolean;
}): T[] => {
  const { collection, from, to, strict } = props;

  const [{ index: fromIndex, item: fromItem }] = get({
    collection,
    query: from,
    amount: 1,
    strict,
  });

  if (to === 'end') {
    const toIndex = collection.length;
    const modifiedArray = [...collection.slice(0, fromIndex), ...collection.slice(fromIndex + 1)];
    return [...modifiedArray.slice(0, toIndex), fromItem, ...modifiedArray.slice(toIndex)];
  }

  const toQuery = convertDestination({ collection, destination: to });

  const [{ index: toIndex }] = get({
    collection,
    query: toQuery.queryValue,
    amount: 1,
    strict,
  });

  if (fromIndex === toIndex) {
    throw new Error(
      'Attempted to move to the same location that item is currently in. This is probably a mistake.',
    );
  }

  const modifiedArray = [...collection.slice(0, fromIndex), ...collection.slice(fromIndex + 1)];
  return [...modifiedArray.slice(0, toIndex), fromItem, ...modifiedArray.slice(toIndex)];
};
