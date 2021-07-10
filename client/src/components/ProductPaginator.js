/* 
Пагинация на основе Pagination https://react-bootstrap.github.io/components/pagination/
*/
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..';

const ProductPaginator = observer(() => {
  const { product } = useContext(Context);
  const totalPages = Math.ceil(product.totalCount / product.limit);
  const pages = new Array(totalPages).fill().map((_, i) => i + 1);

  return (
    <Pagination>
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={product.page === page}
          activeLabel=""
          onClick={() => product.setPage(page)}
        >{page}</Pagination.Item>
      )}
    </Pagination>
  );
});

export default ProductPaginator;