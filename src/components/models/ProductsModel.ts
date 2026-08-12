import { IProduct } from '../../types';

export class ProductsModel {
  items: IProduct[] = [];
  selected: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  setSelected(item: IProduct): void {
    this.selected = item;
  }

  getSelected(): IProduct | null {
    return this.selected;
  }

  getById(id: string): IProduct | null {
    const item = this.items.find((item) => item.id === id);
    return item || null;
  }
}