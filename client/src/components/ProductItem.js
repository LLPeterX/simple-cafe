import React from 'react'
import { Col, Card, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/constants';
import s from './item.module.css'

const ProductItem = ({ product }) => {
  const history = useHistory();
  return (
    <Col md={3} className={s.row} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
      <Card className={s.card} border="light">
        <Image src={product.img} width={150} />
        <div>{product.name}</div>
        <div>
          <div>{product.rating}</div>
        </div>
      </Card>
    </Col>
  )
};

export default ProductItem;