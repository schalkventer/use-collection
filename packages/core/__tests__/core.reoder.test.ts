import { reorder } from '../helpers';

const STARTING_ARRAY = [
  { id: 'b', value: 2 },
  { id: 'a', value: 1 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const ASCENDING_ID_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const DESCENDING_ID_ARRAY = [
  { id: 'd', value: 2 },
  { id: 'c', value: 3 },
  { id: 'b', value: 2 },
  { id: 'a', value: 1 },
];

const ASCENDING_VALUE_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'd', value: 2 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
];

const DESCENDING_VALUE_ARRAY = [
  { id: 'c', value: 3 },
  { id: 'b', value: 2 },
  { id: 'd', value: 2 },
  { id: 'a', value: 1 },
];

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('reorder', () => {
        test('Organise ascending by "id"', () => {
          expect(
            reorder<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              key: 'id',
              direction: 'ascending',
            }),
          ).toEqual(ASCENDING_ID_ARRAY);
        });

        test('Organise descending by "id"', () => {
          expect(
            reorder<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              key: 'id',
              direction: 'descending',
            }),
          ).toEqual(DESCENDING_ID_ARRAY);
        });

        test('Organise ascending by "value"', () => {
          expect(
            reorder<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              key: 'value',
              direction: 'ascending',
            }),
          ).toEqual(ASCENDING_VALUE_ARRAY);
        });

        test('Organise descending by "value"', () => {
          expect(
            reorder<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              key: 'value',
              direction: 'descending',
            }),
          ).toEqual(DESCENDING_VALUE_ARRAY);
        });
      });
    });
  });
});
