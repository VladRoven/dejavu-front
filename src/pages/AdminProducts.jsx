import NoData from '../components/NoData';
import Product from '../components/Product';
import CatalogStore from '../stores/catalog.store';
import { Box } from '@mui/material';
import { isEmpty, map } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

const AdminProductsPage = observer(() => {
  useEffect(() => {
    CatalogStore.getProducts();
  }, []);

  return (
    <Box className="grid grid-rows-1 min-h-svh">
      <Box className="grid content-center">
        <Box className="grid md:grid-cols-catalog grid-cols-catalog-mob gap-4 justify-center my-10 px-2 lg:px-12">
          {isEmpty(CatalogStore.products) ? (
            <NoData isLoading={CatalogStore.isLoading.product} text="Products not found" />
          ) : (
            map(CatalogStore.products, (product) => (
              <Product key={product.id} isAdmin {...product} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default AdminProductsPage;
