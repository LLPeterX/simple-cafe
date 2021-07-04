import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductList from '../components/ProductList';
import TypeBar from '../components/TypeBar';
import FiltersBar from '../components/FiltersBar';

const Shop = () => {
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
};

export default Shop;
