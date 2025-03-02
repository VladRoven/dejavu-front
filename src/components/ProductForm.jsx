import AdminStore from '../stores/admin.store';
import CatalogStore from '../stores/catalog.store';
import { Genders as Gender, ProductFormModes } from '../utils/constants';
import FormWrapper from './FormWrapper';
import InputCheckBox from './InputCheckBox';
import InputImage from './InputImage';
import InputTextField from './InputTextField';
import SelectWrapper from './SelectWrapper';
import { Box, Button, MenuItem, Modal } from '@mui/material';
import { isNull, isString, lowerCase, map, mapKeys, reduce, some, upperFirst } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = observer(() => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      id: 0,
      title: '',
      description: '',
      gender: '',
      price: '',
      categoryId: '',
      isFeatured: false,
      images: [],
    },
  });

  const handleSubmit = (data) => {
    switch (AdminStore.productFormMode) {
      case ProductFormModes.Create: {
        const product = data;

        AdminStore.createProduct({
          ...product,
          price: Number(product.price) * 100,
        });

        break;
      }

      case ProductFormModes.Edit: {
        const product = data;

        map(AdminStore.product?.images, (image) => {
          if (!some(product.images, image)) {
            AdminStore.removeImage(image.id);
          }
        });

        AdminStore.updateProduct({
          ...product,
          price: Number(product.price) * 100,
          images: reduce(
            product.images,
            (acc, image) => {
              if (isString(image)) {
                acc.push({ image });
              }

              return acc;
            },
            []
          ),
        });

        break;
      }
    }
  };

  useEffect(() => {
    if (!AdminStore.product) return;

    mapKeys(methods.getValues(), (_, field) => {
      switch (field) {
        case 'price':
          methods.setValue('price', AdminStore.product?.price / 100);
          break;
        default:
          methods.setValue(field, (AdminStore.product && AdminStore.product[field]) ?? '');
          break;
      }
    });
  }, [AdminStore.product]);

  useEffect(() => {
    if (isNull(AdminStore.productFormMode)) {
      methods.reset();
    }
  }, [AdminStore.productFormMode]);

  return (
    <Modal
      open={!isNull(AdminStore.productFormMode)}
      onClose={() => {
        AdminStore.setProductFormMode(null);
      }}
    >
      <Box sx={style} className="flex flex-col md:w-144 w-full max-h-dvh overflow-y-auto">
        <FormWrapper
          methods={methods}
          className="flex flex-col items-center justify-center gap-4"
          formProps={{ onSubmit: methods.handleSubmit(handleSubmit) }}
        >
          <Box className="flex justify-between gap-4 w-full">
            <InputTextField required name="title" label="Title" type="text" className="!w-full" />
            <InputTextField required name="price" label="Price" type="text" className="!w-full" />
          </Box>
          <Box className="flex justify-between gap-4 w-full">
            <SelectWrapper
              required
              name="categoryId"
              label="Category"
              autoWidth
              multiple={false}
              native={false}
            >
              {map(CatalogStore.categories, (category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </SelectWrapper>
            <SelectWrapper
              required
              name="gender"
              label="Gender"
              autoWidth
              multiple={false}
              native={false}
            >
              <MenuItem value={Gender.Male}>{upperFirst(lowerCase(Gender.Male))}</MenuItem>
              <MenuItem value={Gender.Female}>{upperFirst(lowerCase(Gender.Female))}</MenuItem>
            </SelectWrapper>
          </Box>
          <InputTextField
            required
            multiline
            name="description"
            label="Description"
            type="text"
            className="!w-full"
            inputProps={{ className: '!h-40 !overflow-y-auto' }}
          />
          <InputImage required name="images" inputId="product-image" />
          <InputCheckBox name="isFeatured" label="This product is featured" />
          <Box className="flex justify-center gap-6">
            <Button variant="contained" color="secondary" type="submit" onClick={() => {}}>
              {AdminStore.productFormMode === ProductFormModes.Create ? 'Create' : 'Apply'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                AdminStore.setProductFormMode(null);
              }}
            >
              Close
            </Button>
          </Box>
        </FormWrapper>
      </Box>
    </Modal>
  );
});

export default ProductForm;
