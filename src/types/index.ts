export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export type TPayment = 'online' | 'cash';

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export interface IOrder extends Omit<IBuyer, 'payment'> {
    payment: TPayment;
    total: number;
    items: string[];
}

export interface IProductListResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type TFormErrors = Partial<Record<keyof IBuyer, string>>;