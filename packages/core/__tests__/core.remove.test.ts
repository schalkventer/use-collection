import { remove } from '../helpers';

const STARTING_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('remove', () => {
        test('Remove index of 0', () => {
          expect(remove({ collection: STARTING_ARRAY, query: 0 })).toEqual(STARTING_ARRAY.slice(1));
        });

        test('Remove index of 4', () => {
          expect(remove({ collection: STARTING_ARRAY, query: 4 })).toEqual(STARTING_ARRAY);
        });

        test('Remove index of 4 with strict-mode', () => {
          expect(() => remove({ collection: STARTING_ARRAY, query: 4, strict: true })).toThrow(
            Error,
          );
        });

        test('Remove value of 2', () => {
          expect(
            remove({ collection: STARTING_ARRAY, query: { value: 2 }, strict: true }),
          ).toEqual([STARTING_ARRAY[0], ...STARTING_ARRAY.slice(2)]);
        });

        test('Remove value of 2 with a count of 2', () => {
          expect(remove({ collection: STARTING_ARRAY, query: { value: 2 }, amount: 2 })).toEqual([
            STARTING_ARRAY[0],
            STARTING_ARRAY[2],
          ]);
        });

        test('Remove value of 2 with a count of 0', () => {
          expect(remove({ collection: STARTING_ARRAY, query: { value: 2 }, amount: 0 })).toEqual([
            STARTING_ARRAY[0],
            STARTING_ARRAY[2],
          ]);
        });
      });
    });
  });
});
