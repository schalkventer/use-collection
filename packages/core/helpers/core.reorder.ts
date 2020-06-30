import { types } from '..';

/**
 * @name reorder
 *
 * @description Reorders all items in a collection bases on a specific key
 * (either ascending or descending)
 */
export const reorder = <T extends types.general.BaseItem>(props: {
  collection: T[];
  key: string;
  direction: 'ascending' | 'descending';
}): T[] => {
  const { collection, key, direction } = props;

  const result = collection.sort((a, b) => {
    if (typeof a[key] === 'string') {
      return a[key].localeCompare(b[key]);
    }

    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return a[key] - b[key];
    }

    return 0;
  });

  return direction === 'ascending' ? result : result.reverse();
};

export default reorder;
