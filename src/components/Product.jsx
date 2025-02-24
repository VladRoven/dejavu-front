import { Routes } from '../utils/constants';
import getEndpoint from '../utils/getEndpoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { split } from 'lodash';
import { Link as RouteLink } from 'react-router-dom';

const Product = (props) => {
  const { id, title, price, mainImageId, isAdmin } = props;
  const parsePrice = split((price / 100).toFixed(2), '.');

  return (
    <Box className="!w-fit !h-fit from-soft-beige via-transparent from-0% to-transparent bg-gradient-to-t via-50% p-px rounded">
      <Box className="bg-white md:w-72 w-40 flex flex-col items-center md:px-10 md:py-8 md:!pt-5 px-4 py-4 relative rounded">
        {isAdmin && (
          <Box className="!absolute right-2 top-0 left-2 flex justify-between">
            <IconButton component={RouteLink} to={Routes.Product + '/' + id}>
              <ZoomInIcon color="secondary" />
            </IconButton>
            <IconButton
              color="secondary"
              // onClick={() => {
              //   PagesStore.setConfirmModal({
              //     text: 'Are you sure you want to remove this product?',
              //     confirmHandler: () => {
              //       AdminStore.removeProduct(id);
              //     },
              //   });
              // }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
        <Box
          style={{
            backgroundImage: `url(${getEndpoint(`product/image/${mainImageId}`)})`,
          }}
          className="md:h-80 h-40 w-full bg-top bg-cover bg-no-repeat"
        />
        <Typography className="md:!text-sm !text-xs font-normal !mt-5" variant="caption">
          Déjà Vu
        </Typography>
        <Typography className="md:!text-base !text-sm">{title}</Typography>
        <Box className="w-full flex md:flex-row flex-col items-center justify-between md:mt-6 mt-3 gap-2">
          <Box className="flex">
            <Typography
              className="md:!text-lg !text-sm !font-semibold md:!mr-1 !mr-0.5 md:!mt-[0.188rem] !mt-[0.313rem]"
              variant="body2"
            >
              £
            </Typography>
            <Typography className="md:!text-2xl !text-lg !font-semibold" variant="body2">
              {parsePrice[0]}.
            </Typography>
            <Typography
              className="md:!text-sm !text-xs !font-semibold md:!mt-2.5 !mt-2"
              variant="body2"
            >
              {parsePrice[1]}
            </Typography>
          </Box>
          {isAdmin ? (
            <Button
              variant="outlined"
              color="secondary"
              // onClick={() => {
              //   AdminStore.getProduct(id);
              //   AdminStore.setProductFormMode(ProductFormModes.Edit);
              // }}
              className="md:!text-base !text-xs w-full md:w-fit"
            >
              Edit
            </Button>
          ) : (
            <Button
              component={RouteLink}
              to={Routes.Product + '/' + id}
              variant="outlined"
              color="primary"
              className="md:!text-base !text-xs w-full md:w-fit"
            >
              view
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
