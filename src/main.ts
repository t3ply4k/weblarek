import './scss/styles.scss';
import { ProductsModel } from './components/models/ProductsModel';
import { BasketModel } from './components/models/BasketModel';
import { OrderModel } from './components/models/OrderModel';
import { LarekApi } from './components/api/LarekApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { IOrder, TPayment } from './types'
import { apiProducts } from './utils/data';

const productsModel = new ProductsModel();
const basketModel = new BasketModel();
const orderModel = new OrderModel();
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

productsModel.setItems(apiProducts.items);
console.log('Каталог товаров:', productsModel.getItems());

const firstId = productsModel.getItems()[0].id;
const firstProduct = productsModel.getItemById(firstId);
console.log('Первый товар:', firstProduct);

console.log('Несуществующий товар:', productsModel.getItemById('123123'));

if (firstProduct) {
  productsModel.setSelected(firstProduct);
  console.log('Выбранный товар:', productsModel.getSelected());

  basketModel.add(firstProduct);
  console.log('Товары в корзине:', basketModel.getItems());
  console.log('Сумма:', basketModel.getTotal());
  console.log('Количество товаров в корзине:', basketModel.getCount());
  console.log('Корзина содержит первый товар:', basketModel.has(firstId));
}

orderModel.setPayment('online');
orderModel.setEmail('user@example.com');
orderModel.setPhone('+1234567890');
orderModel.setAddress('123 Main St, City, Country');

const buyerData = orderModel.getData();
console.log('Данные покупателя:', buyerData);

const validationErrors = orderModel.validate();
if (Object.keys(validationErrors).length > 0) {
    console.log('Ошибки валидации заказа:', validationErrors);
} else {
    console.log('Заказ валиден.');
    const order: IOrder = {
        ...buyerData,
        payment: buyerData.payment as TPayment,
        total: basketModel.getTotal(),
        items: basketModel.getItems().map((item) => item.id),
    };
    console.log('Данные заказа для сервера:', order);
}

basketModel.clear();
console.log('Товары в корзине после очистки:', basketModel.getItems());

orderModel.clear();
console.log('Данные покупателя после очистки:', orderModel.getData());

larekApi.getProductList()
  .then((response) => {
    console.log('Список товаров с сервера:', response);
    productsModel.setItems(response.items);
    console.log('Каталог товаров после получения с сервера:', productsModel.getItems());
  })
  .catch((error) => {
    console.error('Ошибка при получении списка товаров с сервера:', error);
  });