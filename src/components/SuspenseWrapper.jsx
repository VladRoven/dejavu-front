import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense fallback={<LinearProgress className="fixed top-0 z-max right-0 left-0 w-full" />}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
