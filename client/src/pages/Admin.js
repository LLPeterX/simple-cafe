import React, { useContext, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import EditType from '../components/modals/EditType';
import EditProduct from '../components/modals/EditProduct';
import TypeBar from '../components/TypeBar';
import { Context } from "../index"

const Admin = () => {
  const { product } = useContext(Context);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const hideTypeModal = () => setTypeModalVisible(false);
  const hideProductModal = () => setProductModalVisible(false);
  return (
    <Container>
      <Row className="mt-2"></Row>
        <Col md={3}>
          <TypeBar />
          <Button className="mt-2" onClick={() => setTypeModalVisible(true)}>Добавить тип продукта</Button>
        </Col>
        <Col md={9}>
          {/* Тут список товаров без картинок */}
          <h3>Список продуктов</h3>
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Наименование</th>
                <th>Тип</th>
                <th>Цена</th>
                <th>Веган</th>
                <th>В наличии</th>
                <th>Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {
                product.products.map(p => {
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.productTypeId}</td>
                      <td>{p.price.toFixed(2)}</td>
                      <td>{p.vegan}</td>
                      <td>{p.available}</td>
                      <td>{p.rating}</td>
                    </tr>);
                })
              }
            </tbody>
          </Table>
          <Button className="mt-2 align-self-end" onClick={() => setProductModalVisible(true)}>Сохранить</Button>
        </Col>
      </Row>
      <EditType show={typeModalVisible} onHide={hideTypeModal} />
      <EditProduct show={productModalVisible} onHide={hideProductModal} />
    </Container >
  );
};

export default Admin;
