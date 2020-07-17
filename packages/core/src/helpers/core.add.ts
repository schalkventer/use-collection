import { types } from '..';
import { get, generalHelpers, convertDestination } from '.';

/**
 * @name add
 *
 * @description Adds an array of items to the collection at a location
 * designated via the query passed to the destination propery.
 */
export const add = <T extends types.general.BaseItem>(props: {
  collection: T[];
  values: T[];
  strict?: boolean;
  destination?: types.queries.destinationQuery<T>;
}): T[] => {
  const { collection, values, strict = false, destination = 'end' } = props;
  const { queryValue, isAfter } = convertDestination({ collection, destination });

  /*
   * If location is one space after the actual size of array, then skip the
   * logic below and just add it to the end of the array.
   */
  if (typeof queryValue === 'number' && queryValue === collection.length) {
    return generalHelpers.insertIntoArray({ array: collection, value: values, index: 'end' });
  }

  const [{ index }] = get<T>({ collection, strict, query: queryValue });

  return generalHelpers.insertIntoArray({
    array: collection,
    value: values,
    index: index + (isAfter ? 1 : 0),
  });
};

export default add;
