import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    this._types = [];
    this._products = [];
    this._selectedType = {}; // объект выбранного типа. Из него берем id => productTypeId
    this._vegan = 0; // текущий фильтр "только вегетарианские блюда"
    this._page = 1; // текущая страница
    this._totalCount = 0; // число товаров, доступных по данному запросу
    this._limit = 3; // количество продуктов, отображаемых на странице
    makeAutoObservable(this);
  }

  setTypes(types) {
    if (!types.find(t => t.id === 0)) {
      //types.unshift({ id: 0, name: "Все" });
      this._types = [{ id: 0, name: "Все" }, ...types];
    } else {
      this._types = types;
    }
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

  setPage(n) {
    this._page = n;
  }

  setTotalCount(n) {
    this._totalCount = n;
  }

  setLimit(n) {
    this._limit = n;
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

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }

}