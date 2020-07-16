import { get } from '../helpers';
import { types } from '..';

const STARTING_ARRAY = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 2 },
];

const RESULTS_ARRAY = [
  [{ index: 0, item: { id: 'a', value: 1 } }],
  [{ index: 1, item: { id: 'b', value: 2 } }],
  [{ index: 2, item: { id: 'c', value: 3 } }],
  [{ index: 3, item: { id: 'd', value: 2 } }],
];

const flatten = <T extends types.general.BaseItem>(array: T[][]) =>
  array.reduce((result: T[], value: T[]) => [...result, ...value], [] as T[]);

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('query', () => {
        test('Query of 0', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: 0,
            }),
          ).toEqual(RESULTS_ARRAY[0]);
        });

        test('Query of 2', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: 2,
            }),
          ).toEqual(RESULTS_ARRAY[2]);
        });

        test('Query of 4', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: 5,
            }),
          ).toEqual([]);
        });

        test('Query of 4 with strict-mode', () => {
          expect(() =>
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: 4,
              strict: true,
            }),
          ).toThrow(Error);
        });

        test('Query id of "a"', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'a' },
            }),
          ).toEqual(RESULTS_ARRAY[0]);
        });

        test('Query id of "c"', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'c' },
            }),
          ).toEqual(RESULTS_ARRAY[2]);
        });

        test('Query id of "e"', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'e' },
            }),
          ).toEqual([]);
        });

        test('Query id of "e" with strict-mode', () => {
          expect(() =>
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'e' },
              strict: true,
            }),
          ).toThrow(Error);
        });

        test('Query value of 2', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { value: 2 },
              strict: true,
            }),
          ).toEqual(RESULTS_ARRAY[1]);
        });

        test('Query value of 2 with  count of 2', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { value: 2 },
              amount: 2,
            }),
          ).toEqual(flatten([RESULTS_ARRAY[1], RESULTS_ARRAY[3]]));
        });

        test('Query value of 2 with count of 0', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { value: 2 },
              amount: 0,
            }),
          ).toEqual(flatten([RESULTS_ARRAY[1], RESULTS_ARRAY[3]]));
        });

        test('Query id of "b" and value of 2', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'b', value: 2 },
            }),
          ).toEqual(RESULTS_ARRAY[1]);
        });

        test('Query id of "b" and value of 2 with count of 2', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              amount: 2,
              query: { id: 'b', value: 2 },
            }),
          ).toEqual(RESULTS_ARRAY[1]);
        });

        test('Query id of "b" and value of 3', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'b', value: 3 },
            }),
          ).toEqual([]);
        });

        test('Query id of "b" and value of 3 with strict mode', () => {
          expect(() =>
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: { id: 'b', value: 3 },
              strict: true,
            }),
          ).toThrow(Error);
        });

        test('Query callback exact match for index 1', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: (item) => item.id === 'b' && item.value === 2,
            }),
          ).toEqual(RESULTS_ARRAY[1]);
        });

        test('Query callback always returns true', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: () => true,
            }),
          ).toEqual(RESULTS_ARRAY[0]);
        });

        test('Query callback always returns true with amount of 3', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              amount: 3,
              query: () => true,
            }),
          ).toEqual(flatten(RESULTS_ARRAY.slice(0, 3)));
        });

        test('Query callback always returns true with amount of 0', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              amount: 0,
              query: () => true,
            }),
          ).toEqual(flatten(RESULTS_ARRAY));
        });

        test('Query callback always returns false', () => {
          expect(
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: () => false,
            }),
          ).toEqual([]);
        });

        test('Query callback always returns false with strict-mode', () => {
          expect(() =>
            get<{ id: string; value: number }>({
              collection: STARTING_ARRAY,
              query: () => false,
              strict: true,
            }),
          ).toThrow(Error);
        });
      });
    });
  });
});
