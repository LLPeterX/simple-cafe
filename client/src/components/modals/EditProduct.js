import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


const EditProduct = ({ show, onHide, product }) => {
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
          {product ? `Редактирование "${product.name}"` : "Добавление нового блюда"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder="Введите название типа" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Закрть</Button>
        <Button variant="success" onClick={onHide}>{product ? "Сохранить изменения" : "Добавить"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;