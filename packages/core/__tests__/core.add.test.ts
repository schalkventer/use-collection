import { add } from '../helpers';

const STARTING_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const INSERTING_ARRAY = [
  { id: 'e', value: 1 },
  { id: 'f', value: 2 },
  { id: 'g', value: 3 },
  { id: 'h', value: 2 },
];

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('add', () => {
        test('Adding with "start"', () => {
          expect(
            add({ collection: STARTING_ARRAY, newValues: INSERTING_ARRAY, destination: 'start' }),
          ).toEqual([...INSERTING_ARRAY, ...STARTING_ARRAY]);
        });

        test('Adding with "end"', () => {
          expect(
            add({ collection: STARTING_ARRAY, newValues: INSERTING_ARRAY, destination: 'end' }),
          ).toEqual([...STARTING_ARRAY, ...INSERTING_ARRAY]);
        });

        test('Adding at index of 0', () => {
          expect(
            add({ collection: STARTING_ARRAY, newValues: INSERTING_ARRAY, destination: 1 }),
          ).toEqual([STARTING_ARRAY[0], ...INSERTING_ARRAY, ...STARTING_ARRAY.slice(1)]);
        });

        test('Adding before index of 2', () => {
          expect(
            add({
              collection: STARTING_ARRAY,
              newValues: INSERTING_ARRAY,
              destination: { before: 2 },
            }),
          ).toEqual([
            ...STARTING_ARRAY.slice(0, 2),
            ...INSERTING_ARRAY,
            ...STARTING_ARRAY.slice(2),
          ]);
        });

        test('Adding after index of 2', () => {
          expect(
            add({
              collection: STARTING_ARRAY,
              newValues: INSERTING_ARRAY,
              destination: { after: 2 },
            }),
          ).toEqual([
            ...STARTING_ARRAY.slice(0, 3),
            ...INSERTING_ARRAY,
            ...STARTING_ARRAY.slice(3),
          ]);
        });
      });
    });
  });
});
