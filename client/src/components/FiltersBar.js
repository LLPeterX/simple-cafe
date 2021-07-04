import React from "react"
import { Form, Row } from 'react-bootstrap'
import { Context } from "../index"
import { observer } from 'mobx-react-lite'

const FiltersBar = observer(() => {
  const { product } = React.useContext(Context);
  console.log(product.vegan);
  return (
    <Row>
      <Form>
        <Form.Check type="checkbox" label="Только вегетарианские блюда"
          checked={product.vegan}
          onChange={() => product.setVegan(product.vegan === 0 ? 1 : 0)}
        />
      </Form>
    </Row>
  );
});

export default FiltersBar;