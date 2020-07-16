import { types } from '..';

/**
 * @name convertDestination
 *
 * Converts a destination query into a regular query, to be consumed by the
 * query helper function.
 */
export const convertDestination = <T extends types.general.BaseItem>(props: {
  collection: T[];
  destination: types.queries.destinationQuery<T>;
}): { queryValue: types.queries.query<T>; isAfter: boolean } => {
  const { collection, destination } = props;

  if (typeof destination === 'number') {
    return { queryValue: destination, isAfter: false };
  }

  if (destination === 'start') {
    return { queryValue: 0, isAfter: false };
  }

  if (destination === 'end') {
    return { queryValue: collection.length, isAfter: false };
  }

  if ('before' in destination) {
    return { queryValue: destination.before as types.queries.query<T>, isAfter: false };
  }

  if ('after' in destination) {
    return { queryValue: destination.after as types.queries.query<T>, isAfter: true };
  }

  throw new Error('Invalid query supplied');
};

export default convertDestination;
