import { get } from './helpers';
import { types } from '.';
import { reducer } from './core.reducer';

export class Collection<T extends types.general.BaseItem> {
  collection: T[];

  config: types.api.Config<T> = {
    strict: false,
  };

  onChange: null | ((collection: T[]) => void | null);

  constructor(items?: T[], config?: types.api.Config<T>, onChange?: (collection: T[]) => void) {
    this.collection = items || [];
    this.config = config || { strict: false };
    this.onChange = onChange || null;
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

    if (this.onChange) {
      this.onChange(result);
    }
  }

  remove(props: Omit<types.remove.RemoveProps<T>, 'strict'>): void {
    const { query, amount } = props;

    const result = reducer<T>(this.collection, {
      type: 'remove',
      payload: { query, amount, strict: this.config.strict },
    });

    this.collection = result;

    if (this.onChange) {
      this.onChange(result);
    }
  }

  update(props: Omit<types.update.UpdateProps<T>, 'strict'>): void {
    const { query, amount, values } = props;

    const result = reducer<T>(this.collection, {
      type: 'update',
      payload: { query, amount, values, strict: this.config.strict },
    });

    this.collection = result;

    if (this.onChange) {
      this.onChange(result);
    }
  }

  move(props: types.move.MoveProps<T>): void {
    const { from, to } = props;

    const result = reducer<T>(this.collection, {
      type: 'move',
      payload: { from, to },
    });

    this.collection = result;

    if (this.onChange) {
      this.onChange(result);
    }
  }

  reorder(props: types.reorder.ReorderProps<T>): void {
    const { key, direction = 'ascending' } = props;

    const result = reducer<T>(this.collection, {
      type: 'reorder',
      payload: { key, direction },
    });

    this.collection = result;

    if (this.onChange) {
      this.onChange(result);
    }
  }

  reset(props: types.reset.ResetProps<T>): void {
    const { values = [] } = props;

    const result = reducer<T>(this.collection, {
      type: 'reset',
      payload: { values },
    });

    this.collection = result;

    if (this.onChange) {
      this.onChange(result);
    }
  }
}
