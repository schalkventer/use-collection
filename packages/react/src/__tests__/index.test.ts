import { renderHook, act } from '@testing-library/react-hooks';
import { useCollection } from '..';

const STARTING_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const NEW_ARRAY = [
  { id: 'e', value: 1 },
  { id: 'f', value: 2 },
  { id: 'g', value: 3 },
  { id: 'h', value: 2 },
];

describe('react', () => {
  describe('useCollection', () => {
    test('Create empty', async () => {
      const { result } = renderHook(() => useCollection<{ id: string; value: number }>());
      expect(result.current[0]).toEqual([]);
    });

    test('Create populated', async () => {
      const { result } = renderHook(() =>
        useCollection<{ id: string; value: number }>(STARTING_ARRAY),
      );
      expect(result.current[0]).toEqual(STARTING_ARRAY);
    });

    test('Remove', async () => {
      const { result } = renderHook(() =>
        useCollection<{ id: string; value: number }>(STARTING_ARRAY),
      );
      act(() => result.current[1].remove({ query: 1 }));
      expect(result.current[0]).toEqual([STARTING_ARRAY[0], STARTING_ARRAY[2], STARTING_ARRAY[3]]);
    });

    test('Add and get', async () => {
      let getValue = null;

      const { result } = renderHook(() =>
        useCollection<{ id: string; value: number }>(STARTING_ARRAY),
      );

      act(() => result.current[1].add({ values: NEW_ARRAY }));
      expect(result.current[0]).toEqual([...STARTING_ARRAY, ...NEW_ARRAY]);

      act(() => {
        getValue = result.current[1].get({ query: 1 });
      });

      expect(getValue).toEqual([{ index: 1, item: { id: 'b', value: 2 } }]);
    });
  });
});
