'use client';

import { useOrders } from './store';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {

  const loading = useOrders((state: any) => state.loading);

  return (
    <Backdrop open={loading} style={{ zIndex: 99, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
