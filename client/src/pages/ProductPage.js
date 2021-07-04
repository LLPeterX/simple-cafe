/* 
Информация о конкретном продукте и возможность добавиь в корзину
*/
import React from 'react'
import { Container, Col, Row, Image, Card, Button } from 'react-bootstrap'
import star from '../assets/star--v1.png'
import s from './productPage.module.css'

const ProductPage = () => {
  const product = { id: 1, name: "Борщ", price: 120.50, rating: 5, img: 'https://eda.ru/img/eda/c620x415i/s2.eda.ru/StaticContent/Photos/131031145327/131109220641/p_O.jpg', vegan: 1, available: 1, productTypeId: 1 };
  const description = { title: "Состав", description: "Говядина, картофель, морковь, лук" };
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image src={product.img} width={300} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${star}) no-repeat center center`, width: 200, height: 200,
                backgroundSize: 'cover',
                color: 'red',
                fontSize: 60
              }}
            >
              {product.rating}
            </div>
          </Row>

        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column justify-content-around p-4"
            style={{ width: 300, fontSize: 32, border: `3px solid lightgray` }}
          >
            <h2>Цена: {product.price.toFixed(2)}</h2>
            <Button variant="info">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row>
        {!!product.vegan && <div className={s.vegan}>Вегетарианское блюдо</div>}
        <h2>Состав</h2>
        {description.description}
      </Row>
    </Container>
  );
};

export default ProductPage;
