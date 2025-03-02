import NoData from '../components/NoData';
import ProductForm from '../components/ProductForm';
import AdminStore from '../stores/admin.store';
import CatalogStore from '../stores/catalog.store';
import PageStore from '../stores/page.store';
import { Genders, ProductFormModes } from '../utils/constants';
import getEndpoint from '../utils/getEndpoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { lowerCase, map, split, upperFirst } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

export const ProductPage = observer(() => {
  const { id } = useParams();
  const isAdmin = true;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className:
      'slick-product !flex md:w-128 w-[23rem] md:flex-row-reverse items-center md:items-start flex-col md:gap-0 gap-2 h-fit',
    dotsClass: 'slick-dots !w-fit !static !flex items-center gap-2 md:flex-col',
    arrows: false,
    customPaging: (index) =>
      CatalogStore.product?.images[index] ? (
        <Box
          className="w-16"
          component="img"
          src={getEndpoint(`product/image/${CatalogStore.product?.images[index].id}`)}
        />
      ) : (
        <></>
      ),
  };

  useEffect(() => {
    CatalogStore.getProduct(id);

    return () => {
      CatalogStore.clearProduct();
    };
  }, [id]);

  return (
    <Box className="grid grid-rows-1 min-h-svh">
      <ProductForm />
      {!CatalogStore.product ? (
        <NoData isLoading={CatalogStore.isLoading.product} text="Product not found" />
      ) : (
        <Box className="flex md:justify-evenly justify-center items-center md:flex-row md:flex-wrap md:gap-0 flex-col gap-10 py-10">
          <Slider {...sliderSettings} infinite={CatalogStore.product.images.length > 1}>
            {map(CatalogStore.product.images, (image) => (
              <Box className="!flex justify-center px-0.5" key={image.id}>
                <img className="w-full" src={getEndpoint(`product/image/${image.id}`)} alt="" />
              </Box>
            ))}
          </Slider>
          <Box className="flex flex-col max-w-128 w-full px-5">
            <Box className="flex justify-between">
              <Typography variant="caption" className="!text-sm">
                Déjà Vu
              </Typography>
              {isAdmin && (
                <IconButton
                  color="secondary"
                  onClick={() => {
                    PageStore.setConfirmModalParams({
                      text: 'Are you sure you want to remove this product?',
                      confirmHandler: () => {
                        AdminStore.removeProduct(id);
                      },
                    });
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
            <Typography className="!text-xl">{CatalogStore.product.title}</Typography>
            <Box className="flex mt-2">
              {CatalogStore.product.gender &&
                (CatalogStore.product.gender === Genders.Female ? (
                  <FemaleIcon color="primary" />
                ) : (
                  <MaleIcon color="primary" />
                ))}
              <Typography>{upperFirst(lowerCase(CatalogStore.product.gender))}</Typography>
            </Box>
            <Typography className="!mt-10">{CatalogStore.product.description}</Typography>
            <Box className="flex justify-between items-center mt-10">
              <Box className="flex items-end">
                <Typography className="!text-lg !font-semibold !mr-1">£</Typography>
                <Typography className="!text-2xl !font-semibold" variant="body2">
                  {split((CatalogStore.product.price / 100).toFixed(2), '.')[0]}.
                </Typography>
                <Typography className="!text-sm !font-semibold !mb-0.5" variant="body2">
                  {split((CatalogStore.product.price / 100).toFixed(2), '.')[1]}
                </Typography>
              </Box>
              {isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    AdminStore.getProduct(id);
                    AdminStore.setProductFormMode(ProductFormModes.Edit);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
});

export default ProductPage;
