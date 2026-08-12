import { IBuyer, TPayment, TFormErrors } from '../../types';

export class OrderModel {
  private payment: TPayment | null = null;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

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

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validate(): TFormErrors {
    const errors: TFormErrors= {};

    if (!this.payment) {
      errors.payment = 'Выберите способ оплаты.';
    }

    if (!this.email.trim()) {
      errors.email = 'Укажите адрес электронной почты.';
    }

    if (!this.phone.trim()) {
      errors.phone = 'Укажите номер телефона.';
    }

    if (!this.address.trim()) {
      errors.address = 'Укажите адрес.';
    }

    return errors;
  }

}