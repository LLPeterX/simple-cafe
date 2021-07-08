import React, { useContext, useState } from 'react'
import { Modal, Button, Form, InputGroup, Dropdown } from 'react-bootstrap'
import { Context } from "../../index"

const EditProduct = ({ show, onHide, currentProduct }) => {
  const { product } = useContext(Context);
  // local store for editing
  const [isVegan, setVegan] = useState(0);
  const [isAvailable, setAvailable] = useState(1);
  const [typeName, setTypeName] = useState("Выберите тип блюда");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.00);
  const [name, setName] = useState("");

  // handler for select type
  const handleSelectType = (key, e) => {
    setTypeName(e.target.textContent);
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
            value={name} onChange={(e) => setName(e.target.value)} />
          {/* <DropdownButton
            title={typeName}
            id="title"
            className="mt-2 mb-2"
            onSelect={handleSelectType}
          >
            {
              product.types.map(p => <Dropdown.Item key={p.id} eventKey={p.id} value={p.id}>{p.name}</Dropdown.Item>)
            }

          </DropdownButton> */}
          <Dropdown className="mt-2">
            <Dropdown.Toggle>{typeName.length ? typeName : "Выберите тип блюда"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {
                product.types.map(p =>
                  <Dropdown.Item
                    key={p.id}
                    eventKey={p.id}
                    value={p.id}
                    onChange={handleSelectType}
                  >{p.name}</Dropdown.Item>)
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
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>

          <Form.Group className="mt-2" controlId="checkVegan">
            <Form.Check type="checkbox" label="Вегетарианское"
              checked={isVegan}
              onChange={() => setVegan(isVegan ? 0 : 1)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="checkAvailable">
            <Form.Check type="checkbox" label="Есть в наличии"
              checked={isAvailable}
              onChange={() => setAvailable(isAvailable ? 0 : 1)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="img">
            <Form.File id="img" label="Изображение:  " />
          </Form.Group>
          {/* <InputGroup className="mt-2">
            <InputGroup.Text id="rating">Рейтинг</InputGroup.Text>
            <Form.Control
              placeholder="5"
              aria-label="Рейтинг"
              aria-describedby="rating"
            />
          </InputGroup> */}
          <Form.Control className="mt-2" type="textarea" placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Закрыть</Button>
        <Button variant="success" onClick={onHide}>{currentProduct ? "Сохранить изменения" : "Добавить"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;