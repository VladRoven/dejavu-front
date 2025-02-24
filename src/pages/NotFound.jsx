import { Routes } from '../utils/constants';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box className="flex flex-col justify-center items-center h-svh px-10">
      <Typography variant="body2" className="!text-9xl !font-bold">
        404
      </Typography>
      <Typography className="!mt-4 !text-xl text-center max-w-144">
        Sorry, we couldn't find this page. But don't worry, you can find plenty of other things on
        our main page.
      </Typography>
      <Button className="!mt-12" component={RouteLink} to={Routes.Main} variant="contained">
        To main page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
