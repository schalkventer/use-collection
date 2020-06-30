/**
 * @name BaseItem
 *
 * A base-level interface that can overridden with a more specific item structure.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseItem = Record<string | number | symbol, any>;

/**
 * @name startingItems
 *
 * The values that the collection starts with when initialised.
 *
 * @example [{ id: '18321265-b772-4752-82f4-5fa6151d0a26;, value: 1 },  { id: 'd37caca2-9604-4a60-9d18-c9e525b84042', value: 2 }]
 * @default []
 */
export type startingItems<T extends BaseItem> = T[];
