import './scss/styles.scss';
import { ProductsModel } from './components/models/ProductsModel';
import { BasketModel } from './components/models/BasketModel';
import { OrderModel } from './components/models/OrderModel';
import { LarekApi } from './components/api/LarekApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productsModel = new ProductsModel();
productsModel.setItems(apiProducts.items);
console.log('Каталог товаров:', productsModel.getItems());

const firstId = productsModel.getItems()[0].id;
const firstProduct = productsModel.getItemById(firstId);
console.log('Первый товар:', firstProduct);

console.log('Несуществующий товар:', productsModel.getItemById('123123'));

if (firstProduct) {
  productsModel.setSelected(firstProduct);
  console.log('Выбранный товар:', productsModel.getSelected());

  const basketModel = new BasketModel();
  basketModel.add(firstProduct);
  console.log('Товары в корзине:', basketModel.getItems());
  console.log('Сумма:', basketModel.getTotal());
  console.log('Количество товаров в корзине:', basketModel.getCount());
  console.log('Корзина содержит первый товар:', basketModel.has(firstId));
  basketModel.remove(firstId);
  console.log('Товары в корзине после удаления:', basketModel.getItems());
  basketModel.clear();
  console.log('Товары в корзине после очистки:', basketModel.getItems());
}

const orderModel = new OrderModel();
orderModel.setPayment('online');
orderModel.setEmail('user@example.com');
orderModel.setPhone('+1234567890');
orderModel.setAddress('123 Main St, City, Country');

const orderData = orderModel.getOrderData(100, ['item1', 'item2']);
console.log('Данные заказа:', orderData);

const validationErrors = orderModel.isValid();
if (Object.keys(validationErrors).length > 0) {
  console.log('Ошибки валидации заказа:', validationErrors);
} else {
  console.log('Заказ валиден.');
}

orderModel.clear();
console.log('Данные заказа после очистки:', orderModel.getOrderData(0, []));

const api = new Api(API_URL);
const larekApi = new LarekApi(api);
larekApi.getProductList()
  .then((response) => {
    console.log('Список товаров с сервера:', response);
    productsModel.setItems(response.items);
    console.log('Каталог товаров после получения с сервера:', productsModel.getItems());
  })
  .catch((error) => {
    console.error('Ошибка при получении списка товаров с сервера:', error);
  });