import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createType } from '../../http/productAPI';

const EditType = ({ show, onHide, productType }) => {
  // локальный стейт для редактирования
  const [value, setValue] = React.useState("");

  const addType = () => {
    if (value.length > 2) {
      createType({ name: value }).then(data => setValue(""));
      onHide();
    }
  };

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
          {productType ? "Редактирование типа продукта" : "Добавление нового типа"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder="Введите название типа"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Закрть</Button>
        <Button variant="success" onClick={addType}>{productType ? "Сохранить изменения" : "Добавить"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditType;