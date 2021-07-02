import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    // временно, пока для проверки
    this._types = [
      { id: 1, name: "Первые блюда" },
      { id: 2, name: "Вторые блюда" },
      { id: 3, name: "Салаты" },
      { id: 4, name: "Закуски" },
      { id: 5, name: "Безалкогольные напитки" },
      { id: 6, name: "Алкогольные напитки" }
    ];
    this._products = [
      { id: 1, name: "Борщ", price: 120.50, rating: 5, img: '2283cf6c-8d78-4060-a261-ff36169a236b.jpg', vegan: 0, available: 1, productTypeId: 1 },
      { id: 2, name: "Лапша куриная", price: 80, rating: 5, img: '5e0f0188-44e5-497f-8538-467e8f06d9a0.jpg', vegan: 0, available: 1, productTypeId: 1 },
      { id: 4, name: "Овощной суп", price: 60.80, rating: 3, img: '3bd6ad36-419c-4668-8004-3ad68fb19625.jpg', vegan: 1, available: 1, productTypeId: 1 },
      { id: 5, name: "Шашлык из свинины", price: 270.00, rating: 5, img: '3fba7b9f-af7c-4a96-8b42-09d4e6d04a91.jpg', vegan: 0, available: 1, productTypeId: 2 },
      { id: 6, name: "Овощной шашлык", price: 125.00, rating: 2, img: '30496c6a-0f92-4cbc-93b0-11a071914a69.jpg', vegan: 1, available: 0, productTypeId: 2 },
      { id: 7, name: "Бутерброд с сыром", price: 50.00, rating: 4, img: '30496c6a-0f92-4cbc-93b0-11a071914a69.jpg', vegan: 1, available: 1, productTypeId: 4 },
    ];
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setProducts(products) {
    this._products = products
  }

  get types() {
    return this._types;
  }

  get products() {
    return this._products;
  }

}