import { IProduct } from "../../types";

export class BasketModel {
  items: IProduct[] = [];

  add(item: IProduct): void {
    this.items.push(item);
  }

  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) =>
      total + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  has(itemId: string): boolean {
    return this.items.some((item) => item.id === itemId);
  }

  clear(): void {
    this.items = [];
  }
}