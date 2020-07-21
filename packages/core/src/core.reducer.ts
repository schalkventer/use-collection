import { types } from '.';
import { add, move, remove, reorder, update } from './helpers';

export const reducer = <T extends types.general.BaseItem>(
  collection: T[],
  action: types.api.Action<T>,
): T[] => {
  if (!collection) {
    throw new Error('Collection not passed to reducer.');
  }

  if (!collection) {
    throw new Error('Action not passed to reducer.');
  }

  if (!action.type) {
    throw new Error('Action passed to reducer does not have a type.');
  }

  switch (action.type) {
    case 'add':
      return add<T>({
        collection,
        destination: action.payload.destination || 'end',
        values: Array.isArray(action.payload.values)
          ? action.payload.values
          : [action.payload.values],
        strict: action.payload.strict || false,
      });

    case 'remove':
      return remove<T>({
        collection,
        query: action.payload.query,
        amount: action.payload.amount ?? 1,
        strict: action.payload.strict || false,
      });

    case 'update':
      return update<T>({
        collection,
        query: action.payload.query,
        amount: action.payload.amount ?? 0,
        values: action.payload.values,
        strict: action.payload.strict || false,
      });

    case 'move':
      return move<T>({
        collection,
        to: action.payload.to,
        from: action.payload.from,
        strict: action.payload.strict || false,
      });

    case 'reorder':
      return reorder<T>({
        collection,
        key: action.payload.key,
        direction: action.payload.direction || 'ascending',
      });

    case 'reset':
      return action.payload.values || [];

    default:
      throw new Error('Invalid action type passed to reducer.');
  }
};
