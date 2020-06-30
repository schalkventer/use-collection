import { move } from '../helpers';

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
        test('Moves from index of 0 to index of 2', () => {
          expect(move({ collection: STARTING_ARRAY, from: 0, to: 2 })).toEqual([
            STARTING_ARRAY[1],
            STARTING_ARRAY[2],
            STARTING_ARRAY[0],
            STARTING_ARRAY[3],
          ]);
        });

        test('Moves from index of 2 to index of 0', () => {
          expect(move({ collection: STARTING_ARRAY, from: 2, to: 0 })).toEqual([
            STARTING_ARRAY[2],
            STARTING_ARRAY[0],
            STARTING_ARRAY[1],
            STARTING_ARRAY[3],
          ]);
        });

        test('Moves from index of 2 to "start"', () => {
          expect(move({ collection: STARTING_ARRAY, from: 2, to: 'start' })).toEqual([
            STARTING_ARRAY[2],
            STARTING_ARRAY[0],
            STARTING_ARRAY[1],
            STARTING_ARRAY[3],
          ]);
        });

        test('Moves from index of 2 to "end"', () => {
          expect(move({ collection: STARTING_ARRAY, from: 2, to: 'end' })).toEqual([
            STARTING_ARRAY[0],
            STARTING_ARRAY[1],
            STARTING_ARRAY[3],
            STARTING_ARRAY[2],
          ]);
        });
      });
    });
  });
});
