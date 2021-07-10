import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import { Container, Row, Col } from 'react-bootstrap'
import ProductList from '../components/ProductList';
import TypeBar from '../components/TypeBar';
import FiltersBar from '../components/FiltersBar';
import { Context } from '../index'
import { fetchTypes, fetchProducts } from '../http/productAPI';
import ProductPaginator from '../components/ProductPaginator';

const Shop = observer(() => {
  const { product } = useContext(Context);
  // только один раз при первой загрузке магазина
  // useEffect(() => {
  //   fetchTypes().then(data => product.setTypes(data));
  //   fetchProducts(product.page, product.limit, null, null, null).then((data) => { // fetchProducts(page, limit, typeId, vegan, available)
  //     product.setProducts(data.rows);
  //     product.setTotalCount(data.count);
  //   }
  //   );
  // }, []);


  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchProducts(product.page, product.limit, product.selectedType.id, product.vegan, product.available)
      .then((data) => { // fetchProducts(page, limit, vegan, available)
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      });
  }, [product.page, product.selectedType, product.vegan, product.available]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <FiltersBar />
          <ProductList />
          <ProductPaginator />
        </Col>
      </Row>

    </Container>
  );
});

export default Shop;
