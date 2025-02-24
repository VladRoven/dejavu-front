import { Box, CircularProgress, Typography } from '@mui/material';

const NoData = (props) => {
  const { isLoading, text } = props;

  return (
    <Box className="flex justify-center items-center w-full h-full">
      {isLoading ? <CircularProgress /> : <Typography>{text}</Typography>}
    </Box>
  );
};

export default NoData;
