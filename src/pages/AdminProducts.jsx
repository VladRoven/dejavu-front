import Filters from '../components/Filters';
import NoData from '../components/NoData';
import Product from '../components/Product';
import ProductForm from '../components/ProductForm';
import AdminStore from '../stores/admin.store';
import CatalogStore from '../stores/catalog.store';
import PageStore from '../stores/page.store';
import {
  ProductSortBy,
  FilterType,
  ProductFormModes,
  Sort,
  Genders as Gender,
  PopupTypes,
} from '../utils/constants';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { Box, Button } from '@mui/material';
import { isEmpty, map } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';

const AdminProductsPage = observer(() => {
  const filters = useMemo(
    () => ({
      filters: [
        {
          title: 'Sort',
          name: 'sort',
          type: FilterType.Radio,
          defaultValue: Sort.DESC,
          fields: [
            {
              label: 'Descending',
              value: Sort.DESC,
            },
            {
              label: 'Ascending',
              value: Sort.ASC,
            },
          ],
        },
        {
          title: 'Sort by',
          name: 'sortBy',
          type: FilterType.Radio,
          defaultValue: ProductSortBy.Date,
          fields: [
            {
              label: 'Newest',
              value: ProductSortBy.Date,
            },
            {
              label: ProductSortBy.Title,
              value: ProductSortBy.Title,
            },
            {
              label: ProductSortBy.Featured,
              value: ProductSortBy.Featured,
            },
            {
              label: ProductSortBy.Price,
              value: ProductSortBy.Price,
            },
          ],
        },
        {
          title: 'Genders',
          name: 'genders',
          type: FilterType.Checkbox,
          defaultValue: [Gender.Male, Gender.Female],
          fields: [
            {
              name: Gender.Male,
              label: Gender.Male,
            },
            {
              name: Gender.Female,
              label: Gender.Female,
            },
          ],
        },
        {
          title: 'Price',
          type: FilterType.Input,
          fields: [
            {
              name: 'priceFrom',
              label: 'Price from',
              type: 'number',
            },
            {
              name: 'priceTo',
              label: 'Price to',
              type: 'number',
            },
          ],
        },
      ],
      resetHandler: () => {
        CatalogStore.getProducts();
      },
      submitHandler: (data) => {
        if (data.priceFrom && data.priceTo && Number(data.priceFrom) > Number(data.priceTo)) {
          PageStore.setPopupMessage({
            type: PopupTypes.Warning,
            message: 'The “to” price should be greater than the “from” price',
          });

          return;
        }

        CatalogStore.getProducts({
          ...data,
          priceFrom: Number(data.priceFrom) * 100 || undefined,
          priceTo: Number(data.priceTo) * 100 || undefined,
        });
      },
    }),
    []
  );

  useEffect(() => {
    CatalogStore.getProducts();

    return () => {
      CatalogStore.clearProducts();
    };
  }, []);

  return (
    <Box className="grid grid-rows-1 min-h-svh">
      <Box className="flex right-10 top-10 gap-5 fixed">
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddToPhotosOutlinedIcon color="secondary" />}
          onClick={() => {
            AdminStore.setProductFormMode(ProductFormModes.Create);
          }}
        >
          Add item
        </Button>
        <Filters
          filters={filters.filters}
          submitHandler={filters.submitHandler}
          resetHandler={filters.resetHandler}
        />
      </Box>
      <ProductForm />
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
