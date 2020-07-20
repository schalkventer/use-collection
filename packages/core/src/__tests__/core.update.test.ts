import { update } from '../helpers';

const STARTING_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const LONGER_ARRAY = [
  ...STARTING_ARRAY,
  { id: 'e', value: 1 },
  { id: 'f', value: 2 },
  { id: 'g', value: 3 },
  { id: 'h', value: 2 },
];

const VALUES = {
  value: 99,
};

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('update', () => {
        test('Update index of 0', () => {
          expect(update({ collection: STARTING_ARRAY, query: 0, values: VALUES })).toEqual([
            { ...STARTING_ARRAY[0], ...VALUES },
            ...STARTING_ARRAY.slice(1),
          ]);
        });
      });

      test('Updates a single item', () => {
        expect(
          update({ collection: STARTING_ARRAY, query: { value: 2 }, values: VALUES }),
        ).toEqual([
          STARTING_ARRAY[0],
          { ...STARTING_ARRAY[1], ...VALUES },
          ...STARTING_ARRAY.slice(2),
        ]);
      });

      test('Updates first item', () => {
        expect(update({ collection: STARTING_ARRAY, query: () => true, values: VALUES })).toEqual([
          { ...STARTING_ARRAY[0], ...VALUES },
          ...STARTING_ARRAY.slice(1),
        ]);
      });

      test('Updates all items', () => {
        expect(
          update({ collection: STARTING_ARRAY, query: () => true, amount: 0, values: VALUES }),
        ).toEqual(STARTING_ARRAY.map((item) => ({ ...item, ...VALUES })));
      });

      test('Updates no items', () => {
        expect(
          update({ collection: STARTING_ARRAY, query: () => false, amount: 0, values: VALUES }),
        ).toEqual(STARTING_ARRAY);
      });

      test('Updates two items', () => {
        expect(
          update({ collection: STARTING_ARRAY, query: { value: 2 }, amount: 0, values: VALUES }),
        ).toEqual([
          STARTING_ARRAY[0],
          {
            ...STARTING_ARRAY[1],
            ...VALUES,
          },
          STARTING_ARRAY[2],
          { ...STARTING_ARRAY[3], ...VALUES },
        ]);
      });

      test('Updates all matching items', () => {
        expect(
          update({
            collection: LONGER_ARRAY,
            query: { value: 2 },
            amount: 0,
            values: { value: 9 },
          }),
        ).toEqual(
          LONGER_ARRAY.map((item) => ({ ...item, value: item.value === 2 ? 9 : item.value })),
        );
      });

      test('Updates via function', () => {
        expect(
          update({
            collection: STARTING_ARRAY,
            query: { value: 2 },
            values: ({ value }) => ({ value: value * 1000 }),
          }),
        ).toEqual([
          STARTING_ARRAY[0],
          {
            ...STARTING_ARRAY[1],
            value: 2000,
          },
          STARTING_ARRAY[2],
          STARTING_ARRAY[3],
        ]);
      });
    });
  });
});
