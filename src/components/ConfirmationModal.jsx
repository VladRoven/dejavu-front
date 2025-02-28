import PageStore from '../stores/page.store';
import { Box, Button, Modal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

const ConfirmationModal = observer(() => {
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

  return (
    <Modal
      open={!!PageStore.confirmModalParams.text}
      onClose={() => {
        PageStore.clearConfirmModalParams();
      }}
    >
      <Box sx={style} className="flex flex-col md:w-144 w-80 gap-6">
        <Typography className="text-center" variant="h6">
          {PageStore.confirmModalParams?.text}
        </Typography>
        <Box className="flex justify-around">
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              PageStore.confirmModalParams?.confirmHandler(e);
              PageStore.clearConfirmModalParams();
            }}
          >
            {PageStore.confirmModalParams?.confirmText}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => {
              if (PageStore.confirmModalParams?.cancelHandler) {
                PageStore.confirmModalParams.cancelHandler(e);
              }

              PageStore.clearConfirmModalParams();
            }}
          >
            {PageStore.confirmModalParams?.cancelText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default ConfirmationModal;
