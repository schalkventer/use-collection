// eslint-disable-next-line import/no-extraneous-dependencies
import { useReducer, useRef, useCallback } from 'react';
import { reducer, types, get } from '@use-collection/core';

interface Actions<T> {
  get: (props: Omit<types.get.GetProps<T>, 'strict'>) => { index: number; item: T }[];
  add: (props: Omit<types.add.AddProps<T>, 'strict'>) => void;
  remove: (props: Omit<types.remove.RemoveProps<T>, 'strict'>) => void;
  update: (props: Omit<types.update.UpdateProps<T>, 'strict'>) => void;
  move: (props: types.move.MoveProps<T>) => void;
  reorder: (props: types.reorder.ReorderProps<T>) => void;
  reset: (props: types.reset.ResetProps<T>) => void;
}

/**
 * @name useCollection
 *
 * A React-hook wrapper for use-collection.
 */
export const useCollection = <T extends types.general.BaseItem>(
  items: T[],
  config: types.api.Config<T>,
): [T[], Actions<T>, types.api.reducer] => {
  const [collection, dispatch] = useReducer(reducer, items);

  const actions: Actions<T> = {
    get: useCallback(
      (props: Omit<types.get.GetProps<T>, 'strict'>) =>
        get({
          collection,
          query: props.query,
          amount: props.amount ?? 1,
          strict: config.strict || false,
        }),
      [],
    ),

    add: useCallback(
      (props: Omit<types.add.AddProps<T>, 'strict'>) =>
        dispatch({
          type: 'add',
          payload: {
            values: props.values,
            destination: props.destination,
            strict: config.strict || false,
          },
        }),
      [],
    ),

    remove: useCallback(
      (props: Omit<types.remove.RemoveProps<T>, 'strict'>) =>
        dispatch({
          type: 'remove',
          payload: {
            query: props.query,
            amount: props.amount ?? 1,
            strict: config.strict || false,
          },
        }),
      [],
    ),

    update: useCallback(
      (props: Omit<types.update.UpdateProps<T>, 'strict'>) =>
        dispatch({
          type: 'update',
          payload: {
            query: props.query,
            values: props.values,
            amount: props.amount ?? 1,
            strict: config.strict || false,
          },
        }),
      [],
    ),

    move: useCallback(
      (props: types.move.MoveProps<T>) =>
        dispatch({
          type: 'move',
          payload: {
            from: props.from,
            to: props.to,
          },
        }),
      [],
    ),

    reorder: useCallback(
      (props: types.reorder.ReorderProps<T>) =>
        dispatch({
          type: 'reorder',
          payload: {
            key: props.key,
            direction: props.direction,
          },
        }),
      [],
    ),

    reset: useCallback(
      (props: types.reset.ResetProps<T>) =>
        dispatch({
          type: 'reset',
          payload: {
            values: props.values,
          },
        }),
      [],
    ),
  };

  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  return [collection, actionsRef.current, reducer];
};
