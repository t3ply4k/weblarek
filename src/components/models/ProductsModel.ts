import { IProduct } from '../../types';

export class ProductsModel {
  private items: IProduct[] = [];
  private selected: IProduct | null = null;

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

  getItemById(id: string): IProduct | null {
    const item = this.items.find((item) => item.id === id);
    return item || null;
  }
}