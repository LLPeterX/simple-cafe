import React, { useContext, useState, useEffect } from 'react'
//import { observer } from 'mobx-react-lite'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import EditType from '../components/modals/EditType'
import EditProduct from '../components/modals/EditProduct'
//import TypeBar from '../components/TypeBar';
import { Context } from "../index"
import { fetchTypes, fetchProducts } from '../http/productAPI'

const Admin = () => {
  const { product } = useContext(Context);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);

  useEffect(() => {
    fetchTypes().then(data => {
      product.setTypes(data);
      product.setSelectedType({});
    }
    );
    // fetchProducts(page = 1, limit = 3, productTypeId, vegan, available)
    fetchProducts(1, 999, 0, null, null).then((data) => product.setProducts(data.rows));
  }, [product.products, product.types]);
  // Косяк: при вызове обновления страницы product очищается - WTF?
  // const hideTypeModal = () => {
  //   setTypeModalVisible(false);
  //   window.location.reload(); // тут все данные исчезают
  // }

  // const hideProductModal = () => setProductModalVisible(false);
  console.log('Admin prod', product.products.length, 'sel=', product.selectedType);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <h3>Типы продуктов</h3>
          <ul>
            {
              product.types.map(item => <li key={item.id}>{item.id}: {item.name}</li>)
            }
          </ul>
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
                <th>test</th>
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
                      <td>{p.price}</td>
                      <td>{p.vegan}</td>
                      <td>{p.available}</td>
                      <td>{p.rating}</td>
                    </tr>);
                })
              }
            </tbody>
          </Table>
          <Button className="mt-2 align-self-end" onClick={() => setProductModalVisible(true)}>Добавить новый продукт</Button>
        </Col>
      </Row>
      <EditType show={typeModalVisible} onHide={() => setTypeModalVisible(false)} />
      <EditProduct show={productModalVisible} onHide={() => setProductModalVisible(false)} />
    </Container>
  );
};

export default Admin;
