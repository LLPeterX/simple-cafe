import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, InputGroup, Dropdown } from 'react-bootstrap'
import { Context } from "../../index"
import { fetchTypes, createProduct } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';


const EditProduct = observer(({ show, onHide, currentProduct }) => {
  const { product } = useContext(Context);
  // local store for editing
  const [isVegan, setVegan] = useState(false);
  const [isAvailable, setAvailable] = useState(true);
  const [type, setType] = useState({ id: 0, name: "Выберите тип блюда" });
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    //    fetchProducts(1,999,).then((data) => product.setProducts(data.rows)); // не нужно
  }, [product]);

  // При выборе типа продукта из меню меняем заголовок этого меню.
  const handleSelectType = (key, e) => {
    let id = +key;
    let type = { id, name: e.target.textContent };
    setType(type);
    product.setSelectedType(type);
  }

  // обработчик выбора файла. Т.к. это массив, берем первый элемент
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }

  // обработчик ввода цены. Разрешены символы [0-9.]
  const handlePrice = (e) => {
    let priceValue = e.target.value;
    priceValue = priceValue.replace(/[^0-9./]/g, '');
    setPrice(priceValue);
    // 
  }

  const addProduct = () => {
    // проверки введенных данных
    if (type.id === 0) {
      alert("Не выбран тип продукта");
      return;
    }
    if (!file || file.length < 3) {
      alert("Не выбрано или неверное имя файла изображения");
      return;
    }
    if (!description || description.trim().length < 10) {
      alert("Не заполнено описание");
      return;
    }
    console.log(`ADD PRODUCT: ${name} ty=${type.id} pr=${price} veg=${isVegan} a=${isAvailable} file=${file} descr=${description}`);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('productTypeId', Number(type.id)); // или product.selectedType.id
    formData.append('price', +price);
    formData.append('rating', 5);
    formData.append('img', file);
    formData.append('vegan', Number(isVegan));
    formData.append('available', Number(isAvailable));
    // description в отдельной таблице
    createProduct(formData).then(data => {
      //console.log('prduct added', data);
      onHide();
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentProduct ? `Редактирование "${currentProduct.name}"` : "Добавление нового блюда"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="mt-2" placeholder="Наименование продукта"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Dropdown className="mt-2" onSelect={handleSelectType}>
            <Dropdown.Toggle>{type.name}</Dropdown.Toggle>
            <Dropdown.Menu>
              {
                product.types.map(t =>
                  <Dropdown.Item
                    key={t.id}
                    eventKey={t.id}
                    value={t.id}
                  >{t.name}</Dropdown.Item>)
              }
            </Dropdown.Menu>
          </Dropdown>

          <InputGroup className="mt-2">
            <InputGroup.Text id="price">Цена</InputGroup.Text>
            <Form.Control
              placeholder="0.00"
              aria-label="price"
              aria-describedby="price"
              value={price}
              onChange={handlePrice}
            />
          </InputGroup>

          <Form.Group className="mt-2">
            <Form.Check type="checkbox" label="Вегетарианское"
              checked={isVegan}
              onChange={(e) => setVegan(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="checkAvailable">
            <Form.Check type="checkbox" label="Есть в наличии"
              checked={isAvailable}
              onChange={() => setAvailable(isAvailable)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="img">
            <Form.File
              id="img"
              label="Файл изображения:  "
              onChange={selectFile} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Закрыть</Button>
        <Button variant="success" onClick={addProduct}>{currentProduct ? "Сохранить изменения" : "Добавить"}</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditProduct;