import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    // временно, пока для проверки
    // this._types = [
    //   { id: 1, name: "Первые блюда" },
    //   { id: 2, name: "Вторые блюда" },
    //   { id: 3, name: "Салаты" },
    //   { id: 4, name: "Закуски" },
    //   { id: 5, name: "Безалкогольные напитки" },
    //   { id: 6, name: "Алкогольные напитки" }
    // ];
    this._types = [];
    this._products = [
      { id: 1, name: "Борщ", price: 120.50, rating: 5, img: 'test.jpg', vegan: 0, available: 1, productTypeId: 1 },
      { id: 2, name: "Лапша куриная", price: 80, rating: 5, img: 'test.jpg', vegan: 0, available: 1, productTypeId: 1 },
      { id: 4, name: "Овощной суп", price: 60.80, rating: 3, img: 'test.jpg', vegan: 1, available: 1, productTypeId: 1 },
      { id: 5, name: "Шашлык из свинины", price: 270.00, rating: 5, img: 'test.jpg', vegan: 0, available: 1, productTypeId: 2 },
      { id: 6, name: "Овощной шашлык", price: 125.00, rating: 2, img: 'test.jpg', vegan: 1, available: 0, productTypeId: 2 },
      { id: 7, name: "Бутерброд с сыром", price: 50.00, rating: 4, img: 'test.jpg', vegan: 1, available: 1, productTypeId: 4 },
      { id: 8, name: "Салат с помидорами и огурцами", price: 150.00, rating: 3, img: 'test.jpg', vegan: 1, available: 0, productTypeId: 3 },
      { id: 9, name: "Кагор", price: 288.00, rating: 5, img: 'test.jpg', vegan: 0, available: 1, productTypeId: 6 },
      { id: 10, name: "Компот ягодный", price: 90.00, rating: 5, img: 'test.jpg', vegan: 1, available: 1, productTypeId: 5 },
    ];
    this._selectedType = {};
    this._vegan = 0;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setProducts(products) {
    this._products = products
  }

  setSelectedType(type) {
    this._selectedType = type;
  }
  setVegan(v) {
    this._vegan = v;
  }

  get types() {
    return this._types;
  }

  get products() {
    return this._products;
  }

  get selectedType() {
    return this._selectedType;
  }

  get vegan() {
    return this._vegan;
  }

}