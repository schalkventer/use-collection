/**
 * @name insertIntoArray
 *
 * Inserts a single item or an array of items into an array at a specific index
 * position. Also shift all existing items to the right of it accordingly.
 */
export const insertIntoArray = <T extends unknown>(props: {
  array: T[];
  index: number | 'start' | 'end';
  value: T | T[];

  /**
   * @default false
   */
  strict?: boolean;
}): T[] => {
  const { array, index, value, strict } = props;
  const valueAsArray: T[] = Array.isArray(value) ? value : [value];

  if (strict && array.length < index) {
    throw new Error('Attempted to add to an index that is greater than the size of the array.');
  }

  if (index === 'end') {
    return [...array, ...valueAsArray];
  }

  if (index === 0 || index === 'start') {
    return [...valueAsArray, ...array];
  }

  return [...array.slice(0, index), ...valueAsArray, ...array.slice(index)];
};

/**
 * @name removeFromArray
 *
 * Removes either a single or multiple items from an array based on a single
 * index position (as number) or multiple index positions (as an array of
 * numbers).
 */
export const removeFromArray = <T extends unknown>(props: {
  array: T[];
  index: number | number[];

  /**
   * @default false
   */
  strict?: boolean;
}): T[] => {
  const { array, index, strict } = props;
  const indexAsArray = Array.isArray(index) ? index : [index];

  const clonedArray: (T | symbol)[] = Array.from(array);
  const toDelete = Symbol('toDelete');

  indexAsArray.forEach((innerIndex) => {
    if (strict && array.length <= innerIndex) {
      throw new Error(
        'Attempted to add to remove an index that is greater than the size of the array.',
      );
    }

    clonedArray[innerIndex] = toDelete;
  });

  return clonedArray.filter((value) => value !== toDelete) as T[];
};

/**
 * @name replaceInArray
 *
 * @description Replaces a value at a specific index in the array with a new value in a
 * functional manner (i.e without mutating the original array).
 */
export const replaceInArray = <T extends unknown>(props: {
  array: T[];
  index: number;
  value: T;

  /**
   * @default false
   */
  strict?: boolean;
}): T[] => {
  const { array, index, value, strict } = props;

  if (strict && array.length <= index) {
    throw new Error(
      'Attempted to add to update at an index that is greater than the size of the array.',
    );
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

export const generalHelpers = {
  insertIntoArray,
  removeFromArray,
  replaceInArray,
};

export default generalHelpers;
