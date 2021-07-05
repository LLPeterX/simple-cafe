import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const EditType = ({ show, onHide, productType }) => {

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
          <Form.Control placeholder="Введите название типа" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Закрть</Button>
        <Button variant="success" onClick={onHide}>{productType ? "Сохранить изменения" : "Добавить"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditType;