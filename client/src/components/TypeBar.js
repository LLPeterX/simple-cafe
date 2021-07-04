import React from "react"
import { ListGroup } from 'react-bootstrap'
import { Context } from "../index"
//import { SHOP_ROUTE } from "../utils/constants"
import { observer } from 'mobx-react-lite'
//import s from './typeBar.module.css'

// чтобы MobX следил за изменением стейта user, оборачиваем JSX в observer()
const TypeBar = observer(() => {
  const { product } = React.useContext(Context);
  return (
    <ListGroup>
      {
        product.types.map(t => <ListGroup.Item
          key={t.id}
          active={t.id === product.selectedType.id}
          onClick={() => product.setSelectedType(t)}
          style={{ cursor: "pointer" }}
        >{t.name}</ListGroup.Item>)
      }
    </ListGroup>
  );
});

export default TypeBar;