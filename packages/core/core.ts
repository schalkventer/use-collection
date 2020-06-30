import { get } from './helpers';
import { types } from '.';
import { reducer } from './core.reducer';

export class Collection<T extends types.general.BaseItem> {
  collection: T[];

  config: types.api.Config<T>;

  onChange: (collection: T[]) => void;

  constructor(items: T[], config: types.api.Config<T>, onChange: (collection: T[]) => void) {
    this.collection = items;
    this.config = config;
    this.onChange = onChange;
  }

  get(props: Omit<types.get.GetProps<T>, 'strict'>): { index: number; item: T }[] {
    const { query, amount } = props;
    return get({ collection: this.collection, query, amount, strict: this.config.strict });
  }

  add(props: Omit<types.add.AddProps<T>, 'strict'>): void {
    const { values, destination } = props;

    const result = reducer<T>(this.collection, {
      type: 'add',
      payload: { values, destination, strict: this.config.strict },
    });

    this.collection = result;
  }

  remove(props: Omit<types.remove.RemoveProps<T>, 'strict'>): void {
    const { query, amount } = props;

    const result = reducer<T>(this.collection, {
      type: 'remove',
      payload: { query, amount, strict: this.config.strict },
    });

    this.collection = result;
  }

  update(props: Omit<types.update.UpdateProps<T>, 'strict'>): void {
    const { query, amount, values } = props;

    const result = reducer<T>(this.collection, {
      type: 'update',
      payload: { query, amount, values, strict: this.config.strict },
    });

    this.collection = result;
  }

  move(props: types.move.MoveProps<T>): void {
    const { from, to } = props;

    const result = reducer<T>(this.collection, {
      type: 'move',
      payload: { from, to },
    });

    this.collection = result;
  }

  reorder(props: types.reorder.ReorderProps<T>): void {
    const { key, direction = 'ascending' } = props;

    const result = reducer<T>(this.collection, {
      type: 'reorder',
      payload: { key, direction },
    });

    this.collection = result;
  }

  reset(props: types.reset.ResetProps<T>): void {
    const { values = [] } = props;

    const result = reducer<T>(this.collection, {
      type: 'reset',
      payload: { values },
    });

    this.collection = result;
  }
}
