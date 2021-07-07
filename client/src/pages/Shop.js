import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import { Container, Row, Col } from 'react-bootstrap'
import ProductList from '../components/ProductList';
import TypeBar from '../components/TypeBar';
import FiltersBar from '../components/FiltersBar';
import { Context } from '../index'
import { fetchTypes, fetchProducts } from '../http/productAPI';

const Shop = observer(() => {
  const { product } = useContext(Context);
  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchProducts().then((data) => product.setProducts(data.rows)); // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <FiltersBar />
          <ProductList />
        </Col>
      </Row>

    </Container>
  );
});

export default Shop;
