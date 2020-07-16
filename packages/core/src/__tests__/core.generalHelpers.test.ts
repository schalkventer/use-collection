import { generalHelpers } from '../helpers';

const STARTING_ARRAY = [1, 2, 3];

describe('utilities', () => {
  describe('hooks', () => {
    describe('useCollection', () => {
      describe('generalHelpers', () => {
        describe('insertIntoArray', () => {
          test('Index of 0', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 0,
                value: 'A',
              }),
            ).toEqual(['A', 1, 2, 3]);
          });

          test('Index of 1', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 1,
                value: 'A',
              }),
            ).toEqual([1, 'A', 2, 3]);
          });

          test('Index of 3', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 3,
                value: 'A',
              }),
            ).toEqual([1, 2, 3, 'A']);
          });

          test('Index of 4', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 4,
                value: 'A',
              }),
            ).toEqual([1, 2, 3, 'A']);
          });

          test('Index of 4 with strict-mode', () => {
            expect(() =>
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 4,
                value: 'A',
                strict: true,
              }),
            ).toThrow(Error);
          });

          test('Index of "start"', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 'start',
                value: 'A',
              }),
            ).toEqual(['A', 1, 2, 3]);
          });

          test('Index of "end"', () => {
            expect(
              generalHelpers.insertIntoArray<string | number>({
                array: STARTING_ARRAY,
                index: 'end',
                value: 'A',
              }),
            ).toEqual([...STARTING_ARRAY, 'A']);
          });
        });

        describe('removeFromArray', () => {
          test('Index of 0', () => {
            expect(
              generalHelpers.removeFromArray<string | number>({
                array: STARTING_ARRAY,
                index: 0,
              }),
            ).toEqual([2, 3]);
          });

          test('Index of 2', () => {
            expect(
              generalHelpers.removeFromArray<string | number>({
                array: STARTING_ARRAY,
                index: 2,
              }),
            ).toEqual([1, 2]);
          });

          test('Index of 3', () => {
            expect(
              generalHelpers.removeFromArray<string | number>({
                array: STARTING_ARRAY,
                index: 3,
              }),
            ).toEqual([1, 2, 3]);
          });

          test('Index of 3 with strict-mode', () => {
            expect(() =>
              generalHelpers.removeFromArray<string | number>({
                array: STARTING_ARRAY,
                index: 3,
                strict: true,
              }),
            ).toThrow(Error);
          });
        });
      });
    });
  });
});
