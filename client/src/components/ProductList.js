import React from "react"
import { Row } from 'react-bootstrap'
import { Context } from "../index"
import { observer } from 'mobx-react-lite'
import ProductItem from "./ProductItem";


const ProductList = observer(() => {
  const { product } = React.useContext(Context);
  console.log(`PodList count=${product.products.length} TotCount=${product.totalCount} limit=${product.limit}`);
  return (
    <Row className="d-flex">
      {
        product.products.map(product => <ProductItem key={product.id} product={product} />)
      }
    </Row>
  );
});

export default ProductList;