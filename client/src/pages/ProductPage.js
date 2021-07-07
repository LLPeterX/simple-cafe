/* 
Информация о конкретном продукте и возможность добавиь в корзину
*/
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Col, Row, Image, Card, Button } from 'react-bootstrap'
//import star from '../assets/star--v1.png'
import s from './productPage.module.css'
import { fetchOneProduct } from '../http/productAPI'

const ProductPage = () => {
  const [product, setProduct] = useState({ info: "" });
  const { id } = useParams();
  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data))
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <h2>{product.name}</h2>
      </Row>
      <Row>
        <Col md={4}>
          <Image src={`${process.env.REACT_APP_API_URL}/${product.img}`} width={300} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            {/* <h2>{product.name}</h2> */}

            {/* <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${star}) no-repeat center center`, width: 200, height: 200,
                backgroundSize: 'cover',
                color: 'red',
                fontSize: 60
              }}
            >
              {product.rating}
            </div> */}

          </Row>

        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column justify-content-around p-4"
            style={{ width: 300, fontSize: 32, border: `3px solid lightgray` }}
          >
            <h2>Цена: {product.price}</h2>
            <Button variant="info">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row>
        {!!product.vegan && <div className={s.vegan}>Вегетарианское блюдо</div>}
        {/* <h2>Состав</h2> */}
        {product.info}
      </Row>
    </Container>
  );
};

export default ProductPage;
