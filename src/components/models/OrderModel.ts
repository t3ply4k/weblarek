import { TPayment } from '../../types';
import { IOrder } from '../../types';

export class OrderModel {
  payment: TPayment | null = null;
  email: string = '';
  phone: string = '';
  address: string = '';

  setPayment(method: TPayment): void {
    this.payment = method;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getOrderData(total: number, items: string[]): IOrder {
    return {
      payment: this.payment as TPayment,
      email: this.email,
      phone: this.phone,
      address: this.address,
      total,
      items
    };
  }

  clear(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  isValid(): { payment?: string, email?: string, phone?: string, address?: string } {
    const errors: { payment?: string, email?: string, phone?: string, address?: string } = {};

    if (!this.payment) {
      errors.payment = 'Выберите способ оплаты.';
    }

    if (!this.email) {
      errors.email = 'Укажите адрес электронной почты.';
    }

    if (!this.phone) {
      errors.phone = 'Укажите номер телефона.';
    }

    if (!this.address) {
      errors.address = 'Укажите адрес.';
    }

    return errors;
  }

}