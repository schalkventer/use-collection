import { types } from '..';

/**
 * @name loopOverCollections
 *
 * @description Loops over a collection array and for each item in the collection that
 * matches the supplied condition it will return an object (as part of an array)
 * that has the index of the item and the item itself.
 */
export const loopOverCollection = <T extends types.general.BaseItem>(props: {
  collection: T[];
  amount: number;
  condition: (item: T) => boolean;
}): number[] => {
  const { collection, amount, condition } = props;
  let count = 0;

  return collection.reduce((result: number[], value: T, index: number) => {
    if (amount !== 0 && count >= amount) {
      return result;
    }

    const match = condition(value);

    if (match !== true) {
      return result;
    }

    count += 1;
    return [...result, index];
  }, [] as number[]);
};

/**
 * @name calcIndicesFromQuery
 *
 * @description Accepts one of three query types and runs it against the
 * provided collection array. If the query matches one of the items the index
 * number will be returned, if the query does match any of the items in the
 * array then a blank array will be returned. However, if `strict` is set to
 * true, then an error will be thrown instead of the latter.
 */
export const calcIndicesFromQuery = <T extends types.general.BaseItem>(props: {
  collection: T[];
  query: types.queries.query<T>;
  amount: number;
  strict: boolean;
}): number[] => {
  const { collection, query, amount = 1, strict } = props;

  /*
   * Query is number logic
   */

  if (typeof query === 'number' && collection.length <= query) {
    if (strict) {
      throw new Error('The provided index position does not exist on the collection');
    }

    return [];
  }

  if (typeof query === 'number') {
    return [query];
  }

  /*
   * Query is callback logic
   */

  if (typeof query === 'function') {
    const queryAsCallback = query as (item: T) => boolean;
    const indices = loopOverCollection({ collection, amount, condition: queryAsCallback });

    if (strict && indices.length < 1) {
      throw new Error('Could not match any items that met the query callback condition.');
    }

    return indices;
  }

  /*
   * Query is callback key-value pair logic
   */

  const queryAsObject = query as Partial<T>;
  const keys = Object.keys(queryAsObject);

  if (keys.length < 1) {
    throw new Error('Invalid query');
  }

  const condition = (item: T): boolean =>
    keys.filter((key) => item[key] !== queryAsObject[key]).length < 1;

  const indices = loopOverCollection({ collection, amount, condition });

  if (strict && indices.length < 1) {
    throw new Error('Could not match any items that have the supplied key-value combination.');
  }

  return indices;
};

/**
 * @name get
 *
 * @description Returns an array of objects (which contain `index` and `item` keys) that
 * match the supplied query.
 */
export const get = <T extends types.general.BaseItem>(props: {
  collection: T[];
  query: types.queries.query<T>;

  /**
   * @default 1;
   */
  amount?: number;

  /**
   * @default false;
   */
  strict?: boolean;
}): { index: number; item: T }[] => {
  const { collection, query: queryValue, amount = 1, strict = false } = props;

  const indices = calcIndicesFromQuery({ collection, amount, query: queryValue, strict });
  return indices.map((index) => ({ index, item: collection[index] }));
};

export default get;
